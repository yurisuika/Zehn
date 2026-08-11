export const SECRET = {
  discover
};
export default SECRET;

function discover() {
  const CODE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let kpos = 0;
  let canvasApp = null;

  function keyDownHandler(e) {
    if (!canvasApp) {
      if (e.keyCode === CODE[kpos]) {
        kpos++;
        if (kpos === CODE.length) {
          kpos = 0;
          startCanvas();
        }
      } else {
        kpos = e.keyCode === CODE[0] ? 1 : 0;
      }
    } else {
      canvasApp.onKeyDown && canvasApp.onKeyDown(e);
      if (e.key === "Escape") stopCanvas();
    }
  };

  function keyUpHandler(e) { canvasApp && canvasApp.onKeyUp && canvasApp.onKeyUp(e); };

  window.addEventListener('keydown', keyDownHandler);
  window.addEventListener('keyup', keyUpHandler);

  function startCanvas() {
    if (canvasApp) return;
    const CANVAS = document.createElement('canvas');
    CANVAS.style.position = 'fixed';
    CANVAS.style.left = '0';
    CANVAS.style.top = '0';
    CANVAS.style.width = '100%';
    CANVAS.style.height = '100%';
    CANVAS.style.zIndex = 999999;
    CANVAS.style.background = 'black';
    CANVAS.width = innerWidth;
    CANVAS.height = innerHeight;
    document.querySelector('._27qasW5wLU4h4nUgawpo1q').appendChild(CANVAS);

    canvasApp = createApp(CANVAS);
    canvasApp.start();
    window.addEventListener('resize', resize);
    function resize() {
      CANVAS.width = innerWidth;
      CANVAS.height = innerHeight;
      canvasApp.onResize && canvasApp.onResize();
    }
  };

  function stopCanvas() {
    if (!canvasApp) return;
    canvasApp.stop();
    const ELEMENT = canvasApp.canvas;
    if (ELEMENT && ELEMENT.parentNode) ELEMENT.parentNode.removeChild(ELEMENT);
    canvasApp = null;
  };

  return {
    stopListening: () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
      stopCanvas();
    }
  };
};

function createApp(canvas) {
  const CTX = canvas.getContext('2d');
  const w = () => canvas.width;
  const h = () => canvas.height;

  const rand = (min, max) => Math.random() * (max - min) + min;
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const wrap = (v, max) => (v + max) % max;
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

  let raf = null;
  let running = false;

  let ship, bullets, asteroids;
  let keys = {};
  let lastShot = 0;
  let explosion = null;
  let asteroidExplosions = [];
  let level = 1;
  let spawnTimer = 0;
  let lastTime = performance.now();

  let repop = {
    active: false,
    target: 0,
    rate: 18,
    progress: 0
  };

  const DENSITY = 0.00009;
  const MIN_AST = 8;
  const MAX_AST = 120;

  function createShip() {
    return { x: w() / 2, y: h() / 2, angle: -Math.PI / 2, vx: 0, vy: 0, thrust: 0, radius: 10, invuln: 0 };
  };

  function createAsteroid(x, y, radius, speed) {
    radius = radius || rand(12, 48);

    if (x === undefined || y === undefined) {
      const MARGIN = 40;
      x = rand(-MARGIN, w() + MARGIN);
      y = rand(-MARGIN, h() + MARGIN);
    }

    const BASE_SPEED = speed || rand(0.6, 2.2);
    const BIAS_TOWARDS_CENTER = Math.random() < 0.5;
    let vx, vy;
    if (BIAS_TOWARDS_CENTER) {
      const CX = w() / 2, cy = h() / 2;
      const TO_CENTER_ANGLE = Math.atan2(cy - y, CX - x);
      const FINAL_ANGLE = TO_CENTER_ANGLE + rand(-Math.PI / 4, Math.PI / 4);
      vx = Math.cos(FINAL_ANGLE) * BASE_SPEED;
      vy = Math.sin(FINAL_ANGLE) * BASE_SPEED;
    } else {
      const ANGLE = rand(0, Math.PI * 2);
      vx = Math.cos(ANGLE) * BASE_SPEED;
      vy = Math.sin(ANGLE) * BASE_SPEED;
    }

    return {
      x,
      y,
      vx,
      vy,
      ax: 0, ay: 0,
      r: radius,
      verts: Array.from({ length: Math.floor(rand(7, 12)) }, () => rand(0.6, 1.4)),
      ang: rand(0, Math.PI * 2),
      rotSpeed: rand(-2.0, 2.0),
      wobbleTimer: rand(0, 2 * Math.PI),
      shape: null
    };
  };

  function spawnAsteroids(n = 24) {
    for (let i = 0; i < n; i++) {
      let a;
      let attempts = 0;
      do {
        a = createAsteroid();
        attempts++;
      } while (dist(a, { x: ship.x, y: ship.y }) < 120 && attempts < 10);
      genShape(a);
      asteroids.push(a);
    }
  };

  function genShape(a) {
    a.shape = [];
    const VERTS = a.verts.length;
    const STEP = Math.PI * 2 / VERTS;
    for (let i = 0; i < VERTS; i++) {
      const RADIUS = a.r * a.verts[i];
      const ANGLE = i * STEP;
      a.shape.push({ x: Math.cos(ANGLE) * RADIUS, y: Math.sin(ANGLE) * RADIUS });
    }
  };

  function desiredAsteroids() {
    const AREA = Math.max(1, w() * h());
    let n = Math.round(AREA * DENSITY);
    n = Math.max(MIN_AST, Math.min(MAX_AST, n));
    return n;
  };

  function adjustAsteroidCount() {
    const TARGET = desiredAsteroids();
    const DIFF = TARGET - asteroids.length;
    if (DIFF > 0) {
      spawnAsteroids(DIFF);
    } else if (DIFF < 0) {
      asteroids.sort((a, b) => {
        const DA = Math.hypot(a.x - ship.x, a.y - ship.y);
        const DB = Math.hypot(b.x - ship.x, b.y - ship.y);
        return DB - DA;
      });
      asteroids.splice(TARGET);
    }
  };

  function startAsteroidExplosion(a) {
    const EXPLOSION = { time: 0, pieces: [] };
    const COUNT = Math.max(8, Math.floor(a.r / 2) + randInt(4, 10));
    for (let i = 0; i < COUNT; i++) {
      const ANGLE = rand(0, Math.PI * 2);
      const SPEED = rand(40, 220) * (1 + a.r / 48);
      EXPLOSION.pieces.push({
        x: a.x + Math.cos(ANGLE) * rand(0, a.r * 0.5),
        y: a.y + Math.sin(ANGLE) * rand(0, a.r * 0.5),
        vx: Math.cos(ANGLE) * SPEED + (a.vx || 0) * 0.5,
        vy: Math.sin(ANGLE) * SPEED + (a.vy || 0) * 0.5,
        ax: 0, ay: 20,
        angle: ANGLE,
        spin: rand(-6, 6),
        life: rand(0.6, 1.6),
        size: rand(Math.max(2, a.r * 0.06), Math.max(4, a.r * 0.2)),
        type: 'shard'
      });
    }
    asteroidExplosions.push(EXPLOSION);
  };

  function init() {
    ship = createShip();
    bullets = [];
    asteroids = [];
    level = 1;
    keys = {};
    lastShot = 0;
    spawnTimer = 0;
    explosion = null;
    repop.active = false;
    repop.progress = 0;
    repop.rate = 18;
    spawnAsteroids(desiredAsteroids());
    lastTime = performance.now();
  };

  function onKeyDown(e) {
    keys[e.code] = true;
    if (e.code === 'Space') e.preventDefault && e.preventDefault();
    if (e.code === 'ArrowUp') ship.thrust = 120;
  };

  function onKeyUp(e) {
    keys[e.code] = false;
    if (e.code === 'ArrowUp') ship.thrust = 0;
  };

  function startExplosion() {
    explosion = { time: 0, pieces: [] };
    const BASE = [
      { x: 14, y: 0 },
      { x: -10, y: 9 },
      { x: -6, y: 0 },
      { x: -10, y: -9 }
    ];
    for (let v of BASE) {
      const COSINE = Math.cos(ship.angle), sin = Math.sin(ship.angle);
      const WX = ship.x + v.x * COSINE - v.y * sin;
      const WY = ship.y + v.x * sin + v.y * COSINE;
      const SPEED = rand(80, 260);
      const ANGLE = rand(0, Math.PI * 2);
      explosion.pieces.push({
        x: WX, y: WY,
        vx: Math.cos(ANGLE) * SPEED + ship.vx * 0.6,
        vy: Math.sin(ANGLE) * SPEED + ship.vy * 0.6,
        ax: 0, ay: 60,
        angle: ship.angle + rand(-2, 2),
        spin: rand(-10, 10),
        life: rand(0.6, 1.2),
        size: rand(6, 12),
        type: 'shard'
      });
    }
    for (let i = 0; i < 14; i++) {
      const ANGLE = rand(0, Math.PI * 2);
      const SPEED = rand(60, 380);
      explosion.pieces.push({
        x: ship.x + Math.cos(ANGLE) * 4,
        y: ship.y + Math.sin(ANGLE) * 4,
        vx: Math.cos(ANGLE) * SPEED + ship.vx * 0.4,
        vy: Math.sin(ANGLE) * SPEED + ship.vy * 0.4,
        ax: 0, ay: 40,
        angle: ANGLE,
        spin: 0,
        life: rand(0.4, 1.0),
        size: rand(2, 5),
        type: 'spark'
      });
    }
  };

  function update(dt) {
    for (let exI = asteroidExplosions.length - 1; exI >= 0; exI--) {
      const EXPLOSION = asteroidExplosions[exI];
      EXPLOSION.time += dt;
      for (let p of EXPLOSION.pieces) {
        p.vx += p.ax * dt; p.vy += p.ay * dt;
        p.x += p.vx * dt; p.y += p.vy * dt;
        p.angle += p.spin * dt;
        p.life -= dt;
      }
      EXPLOSION.pieces = EXPLOSION.pieces.filter(p => p.life > 0);
      if (EXPLOSION.pieces.length === 0) asteroidExplosions.splice(exI, 1);
    }

    if (explosion) {
      explosion.time += dt;
      for (let p of explosion.pieces) {
        p.vx += p.ax * dt; p.vy += p.ay * dt;
        p.x += p.vx * dt; p.y += p.vy * dt;
        p.angle += p.spin * dt;
        p.life -= dt;
      }
      explosion.pieces = explosion.pieces.filter(p => p.life > 0);
      if (explosion.time > 1.2 || explosion.pieces.length === 0) {
        ship.x = w() / 2; ship.y = h() / 2; ship.vx = ship.vy = 0; ship.invuln = 1.2;
        explosion = null;
      }
      return;
    }

    if (keys['ArrowLeft'] || keys['KeyA']) ship.angle -= 5 * dt;
    if (keys['ArrowRight'] || keys['KeyD']) ship.angle += 5 * dt;
    ship.thrust = (keys['ArrowUp'] || keys['KeyW']) ? 120 : 0;

    if ((keys['Space'] || keys['KeyK']) && performance.now() - lastShot > 150) {
      bullets.push({
        x: ship.x + Math.cos(ship.angle) * ship.radius,
        y: ship.y + Math.sin(ship.angle) * ship.radius,
        vx: ship.vx + Math.cos(ship.angle) * 300,
        vy: ship.vy + Math.sin(ship.angle) * 300,
        life: 1.0
      });
      lastShot = performance.now();
    }

    ship.vx += Math.cos(ship.angle) * ship.thrust * dt;
    ship.vy += Math.sin(ship.angle) * ship.thrust * dt;
    ship.vx *= 0.999; ship.vy *= 0.999;
    ship.x = wrap(ship.x + ship.vx * dt, w());
    ship.y = wrap(ship.y + ship.vy * dt, h());
    if (ship.invuln > 0) ship.invuln -= dt;

    for (let i = bullets.length - 1; i >= 0; i--) {
      const BULLET = bullets[i];
      BULLET.x = wrap(BULLET.x + BULLET.vx * dt, w());
      BULLET.y = wrap(BULLET.y + BULLET.vy * dt, h());
      BULLET.life -= dt;
      if (BULLET.life <= 0) bullets.splice(i, 1);
    }

    for (let a of asteroids) {
      a.wobbleTimer = (a.wobbleTimer || rand(0, 2 * Math.PI)) + dt * rand(1.0, 1.6);
      a.ax = Math.cos(a.wobbleTimer + a.r) * 0.18;
      a.ay = Math.sin(a.wobbleTimer - a.r) * 0.18;
      a.vx += a.ax * dt; a.vy += a.ay * dt;
      const SPEED = Math.hypot(a.vx, a.vy);
      const MAX_SPEED = 140 / Math.max(5, a.r || 5);
      if (SPEED > MAX_SPEED) { const SCALE = MAX_SPEED / SPEED; a.vx *= SCALE; a.vy *= SCALE; }
      a.x = wrap(a.x + a.vx * dt, w());
      a.y = wrap(a.y + a.vy * dt, h());
      a.ang += (a.rotSpeed || 0) * dt;
    }

    for (let i = asteroids.length - 1; i >= 0; i--) {
      const ASTEROID = asteroids[i];
      for (let j = bullets.length - 1; j >= 0; j--) {
        const BULLET = bullets[j];
        if (dist(ASTEROID, BULLET) < ASTEROID.r + 2) {
          bullets.splice(j, 1);
          startAsteroidExplosion(ASTEROID);
          if (ASTEROID.r > 22) {
            for (let k = 0; k < 2; k++) {
              const CHILD = createAsteroid(ASTEROID.x + rand(-6, 6), ASTEROID.y + rand(-6, 6), ASTEROID.r * rand(0.45, 0.6), Math.min(2.8, Math.hypot(ASTEROID.vx, ASTEROID.vy) + rand(0.4, 1.2)));
              genShape(CHILD);
              asteroids.push(CHILD);
            }
          }
          asteroids.splice(i, 1);
          break;
        }
      }
    }

    if (ship.invuln <= 0) {
      for (let i = asteroids.length - 1; i >= 0; i--) {
        if (Math.hypot(ship.x - asteroids[i].x, ship.y - asteroids[i].y) < ship.radius + asteroids[i].r - 4) {
          startExplosion();
          break;
        }
      }
    }

    if (asteroids.length === 0 && !repop.active) {
      level += 1;
      repop.active = true;
      repop.target = desiredAsteroids();
      repop.progress = 0;
      repop.rate = Math.min(60, 12 + level * 2);
    }

    spawnTimer += dt;
    if (spawnTimer > 5 && asteroids.length < Math.max(16, level + 8)) {
      const ASTEROID = createAsteroid();
      genShape(ASTEROID);
      asteroids.push(ASTEROID);
      spawnTimer = 0;
    }

    if (repop.active) {
      repop.progress += dt * repop.rate;
      while (repop.progress >= 1 && asteroids.length < repop.target) {
        const ASTEROID = createAsteroid();
        genShape(ASTEROID);
        asteroids.push(ASTEROID);
        repop.progress -= 1;
      }
      if (asteroids.length >= repop.target) {
        repop.active = false;
        repop.progress = 0;
      }
    }
  };

  function render() {
    const WIDTH = w(), height = h();
    CTX.clearRect(0, 0, WIDTH, height);
    CTX.fillStyle = 'black'; CTX.fillRect(0, 0, WIDTH, height);

    CTX.save();
    CTX.strokeStyle = '#fff'; CTX.lineWidth = 2; CTX.lineJoin = 'round'; CTX.lineCap = 'round';

    for (let a of asteroids) {
      CTX.save();
      CTX.translate(a.x, a.y);
      CTX.rotate(a.ang);
      CTX.beginPath();
      if (a.shape && a.shape.length) {
        CTX.moveTo(a.shape[0].x, a.shape[0].y);
        for (let i = 1; i < a.shape.length; i++) CTX.lineTo(a.shape[i].x, a.shape[i].y);
      } else {
        const VERTS = a.verts.length || 8;
        const STEP = Math.PI * 2 / VERTS;
        for (let i = 0; i < VERTS; i++) {
          const ANGLE = i * STEP;
          const RADIUS = a.r * (a.verts ? (a.verts[i] || 1) : 1);
          const X = Math.cos(ANGLE) * RADIUS, y = Math.sin(ANGLE) * RADIUS;
          if (i === 0) CTX.moveTo(X, y); else CTX.lineTo(X, y);
        }
      }
      CTX.closePath(); CTX.stroke();
      CTX.restore();
    }

    for (let ex of asteroidExplosions) {
      for (let p of ex.pieces) {
        CTX.save();
        CTX.translate(p.x, p.y);
        CTX.rotate(p.angle);
        CTX.globalAlpha = Math.max(0, Math.min(1, p.life / 1.6));
        CTX.beginPath();
        CTX.rect(-p.size / 2, -p.size / 2, p.size, p.size);
        CTX.stroke();
        CTX.restore();
      }
    }

    CTX.strokeStyle = 'white'; CTX.lineWidth = 2;
    for (let b of bullets) {
      CTX.beginPath();
      CTX.moveTo(b.x - b.vx * 0.006, b.y - b.vy * 0.006);
      CTX.lineTo(b.x + b.vx * 0.006, b.y + b.vy * 0.006);
      CTX.stroke();
    }

    if (explosion) {
      for (let p of explosion.pieces) {
        CTX.save();
        CTX.translate(p.x, p.y);
        CTX.rotate(p.angle);
        CTX.globalAlpha = Math.max(0, Math.min(1, p.life / 1.2));
        if (p.type === 'shard') {
          CTX.beginPath();
          CTX.rect(-p.size / 2, -p.size / 2, p.size, p.size);
          CTX.stroke();
        } else {
          CTX.beginPath();
          CTX.moveTo(0, 0);
          CTX.lineTo(Math.max(1, p.size * 2), 0);
          CTX.stroke();
        }
        CTX.restore();
      }
      CTX.restore();
      return;
    }

    CTX.save();
    CTX.translate(ship.x, ship.y);
    CTX.rotate(ship.angle);
    CTX.beginPath();
    CTX.moveTo(14, 0);
    CTX.lineTo(-10, 9);
    CTX.lineTo(-6, 0);
    CTX.lineTo(-10, -9);
    CTX.closePath();
    CTX.stroke();

    if (ship.thrust > 10) {
      CTX.beginPath();
      CTX.moveTo(-10, -5);
      CTX.lineTo(-18 - Math.random() * 6, 0);
      CTX.lineTo(-10, 5);
      CTX.stroke();
    }
    CTX.restore();
    CTX.restore();
  };

  function loop(now) {
    const DT = Math.min(0.030, (now - lastTime) / 1000);
    lastTime = now;
    update(DT);
    render();
    raf = requestAnimationFrame(loop);
  };

  function start() {
    if (!running) {
      running = true;
      lastTime = performance.now();
      raf = requestAnimationFrame(loop);
    }
  };

  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
  };

  init();

  return {
    canvas,
    start,
    stop,
    onKeyDown,
    onKeyUp,
    onResize: adjustAsteroidCount
  };
};