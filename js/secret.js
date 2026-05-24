export const Secret = {
  setup
};
export default Secret;

function setup() {
  const code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let kpos = 0;
  let canvasApp = null;

  function keyDownHandler(e) {
    if (!canvasApp) {
      if (e.keyCode === code[kpos]) {
        kpos++;
        if (kpos === code.length) {
          kpos = 0;
          startCanvas();
        }
      } else {
        kpos = e.keyCode === code[0] ? 1 : 0;
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
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = 999999;
    canvas.style.background = 'black';
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    document.body.appendChild(canvas);

    canvasApp = createApp(canvas);
    canvasApp.start();
    window.addEventListener('resize', resize);
    function resize() {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      canvasApp.onResize && canvasApp.onResize();
    }
  };

  function stopCanvas() {
    if (!canvasApp) return;
    canvasApp.stop();
    const el = canvasApp.canvas;
    if (el && el.parentNode) el.parentNode.removeChild(el);
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
  const ctx = canvas.getContext('2d');
  const W = () => canvas.width;
  const H = () => canvas.height;

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
    return { x: W() / 2, y: H() / 2, angle: -Math.PI / 2, vx: 0, vy: 0, thrust: 0, radius: 10, invuln: 0 };
  };

  function createAsteroid(x, y, radius, speed) {
    radius = radius || rand(12, 48);

    if (x === undefined || y === undefined) {
      const margin = 40;
      x = rand(-margin, W() + margin);
      y = rand(-margin, H() + margin);
    }

    const baseSpeed = speed || rand(0.6, 2.2);
    const biasTowardCenter = Math.random() < 0.5;
    let vx, vy;
    if (biasTowardCenter) {
      const cx = W() / 2, cy = H() / 2;
      const toCenterAng = Math.atan2(cy - y, cx - x);
      const finalAng = toCenterAng + rand(-Math.PI / 4, Math.PI / 4);
      vx = Math.cos(finalAng) * baseSpeed;
      vy = Math.sin(finalAng) * baseSpeed;
    } else {
      const ang = rand(0, Math.PI * 2);
      vx = Math.cos(ang) * baseSpeed;
      vy = Math.sin(ang) * baseSpeed;
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
    const verts = a.verts.length;
    const step = Math.PI * 2 / verts;
    for (let i = 0; i < verts; i++) {
      const r = a.r * a.verts[i];
      const ang = i * step;
      a.shape.push({ x: Math.cos(ang) * r, y: Math.sin(ang) * r });
    }
  };

  function desiredAsteroids() {
    const area = Math.max(1, W() * H());
    let n = Math.round(area * DENSITY);
    n = Math.max(MIN_AST, Math.min(MAX_AST, n));
    return n;
  };

  function adjustAsteroidCount() {
    const target = desiredAsteroids();
    const diff = target - asteroids.length;
    if (diff > 0) {
      spawnAsteroids(diff);
    } else if (diff < 0) {
      asteroids.sort((a, b) => {
        const da = Math.hypot(a.x - ship.x, a.y - ship.y);
        const db = Math.hypot(b.x - ship.x, b.y - ship.y);
        return db - da;
      });
      asteroids.splice(target);
    }
  };

  function startAsteroidExplosion(a) {
    const ex = { time: 0, pieces: [] };
    const count = Math.max(8, Math.floor(a.r / 2) + randInt(4, 10));
    for (let i = 0; i < count; i++) {
      const ang = rand(0, Math.PI * 2);
      const spd = rand(40, 220) * (1 + a.r / 48);
      ex.pieces.push({
        x: a.x + Math.cos(ang) * rand(0, a.r * 0.5),
        y: a.y + Math.sin(ang) * rand(0, a.r * 0.5),
        vx: Math.cos(ang) * spd + (a.vx || 0) * 0.5,
        vy: Math.sin(ang) * spd + (a.vy || 0) * 0.5,
        ax: 0, ay: 20,
        angle: ang,
        spin: rand(-6, 6),
        life: rand(0.6, 1.6),
        size: rand(Math.max(2, a.r * 0.06), Math.max(4, a.r * 0.2)),
        type: 'shard'
      });
    }
    asteroidExplosions.push(ex);
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
    const base = [
      { x: 14, y: 0 },
      { x: -10, y: 9 },
      { x: -6, y: 0 },
      { x: -10, y: -9 }
    ];
    for (let v of base) {
      const cos = Math.cos(ship.angle), sin = Math.sin(ship.angle);
      const wx = ship.x + v.x * cos - v.y * sin;
      const wy = ship.y + v.x * sin + v.y * cos;
      const speed = rand(80, 260);
      const ang = rand(0, Math.PI * 2);
      explosion.pieces.push({
        x: wx, y: wy,
        vx: Math.cos(ang) * speed + ship.vx * 0.6,
        vy: Math.sin(ang) * speed + ship.vy * 0.6,
        ax: 0, ay: 60,
        angle: ship.angle + rand(-2, 2),
        spin: rand(-10, 10),
        life: rand(0.6, 1.2),
        size: rand(6, 12),
        type: 'shard'
      });
    }
    for (let i = 0; i < 14; i++) {
      const ang = rand(0, Math.PI * 2);
      const spd = rand(60, 380);
      explosion.pieces.push({
        x: ship.x + Math.cos(ang) * 4,
        y: ship.y + Math.sin(ang) * 4,
        vx: Math.cos(ang) * spd + ship.vx * 0.4,
        vy: Math.sin(ang) * spd + ship.vy * 0.4,
        ax: 0, ay: 40,
        angle: ang,
        spin: 0,
        life: rand(0.4, 1.0),
        size: rand(2, 5),
        type: 'spark'
      });
    }
  };

  function update(dt) {
    for (let exI = asteroidExplosions.length - 1; exI >= 0; exI--) {
      const ex = asteroidExplosions[exI];
      ex.time += dt;
      for (let p of ex.pieces) {
        p.vx += p.ax * dt; p.vy += p.ay * dt;
        p.x += p.vx * dt; p.y += p.vy * dt;
        p.angle += p.spin * dt;
        p.life -= dt;
      }
      ex.pieces = ex.pieces.filter(p => p.life > 0);
      if (ex.pieces.length === 0) asteroidExplosions.splice(exI, 1);
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
        ship.x = W() / 2; ship.y = H() / 2; ship.vx = ship.vy = 0; ship.invuln = 1.2;
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
    ship.x = wrap(ship.x + ship.vx * dt, W());
    ship.y = wrap(ship.y + ship.vy * dt, H());
    if (ship.invuln > 0) ship.invuln -= dt;

    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.x = wrap(b.x + b.vx * dt, W());
      b.y = wrap(b.y + b.vy * dt, H());
      b.life -= dt;
      if (b.life <= 0) bullets.splice(i, 1);
    }

    for (let a of asteroids) {
      a.wobbleTimer = (a.wobbleTimer || rand(0, 2 * Math.PI)) + dt * rand(1.0, 1.6);
      a.ax = Math.cos(a.wobbleTimer + a.r) * 0.18;
      a.ay = Math.sin(a.wobbleTimer - a.r) * 0.18;
      a.vx += a.ax * dt; a.vy += a.ay * dt;
      const speed = Math.hypot(a.vx, a.vy);
      const maxSpeed = 140 / Math.max(5, a.r || 5);
      if (speed > maxSpeed) { const scale = maxSpeed / speed; a.vx *= scale; a.vy *= scale; }
      a.x = wrap(a.x + a.vx * dt, W());
      a.y = wrap(a.y + a.vy * dt, H());
      a.ang += (a.rotSpeed || 0) * dt;
    }

    for (let i = asteroids.length - 1; i >= 0; i--) {
      const a = asteroids[i];
      for (let j = bullets.length - 1; j >= 0; j--) {
        const b = bullets[j];
        if (dist(a, b) < a.r + 2) {
          bullets.splice(j, 1);
          startAsteroidExplosion(a);
          if (a.r > 22) {
            for (let k = 0; k < 2; k++) {
              const child = createAsteroid(a.x + rand(-6, 6), a.y + rand(-6, 6), a.r * rand(0.45, 0.6), Math.min(2.8, Math.hypot(a.vx, a.vy) + rand(0.4, 1.2)));
              genShape(child);
              asteroids.push(child);
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
      const a = createAsteroid();
      genShape(a);
      asteroids.push(a);
      spawnTimer = 0;
    }

    if (repop.active) {
      repop.progress += dt * repop.rate;
      while (repop.progress >= 1 && asteroids.length < repop.target) {
        const a = createAsteroid();
        genShape(a);
        asteroids.push(a);
        repop.progress -= 1;
      }
      if (asteroids.length >= repop.target) {
        repop.active = false;
        repop.progress = 0;
      }
    }
  };

  function render() {
    const width = W(), height = H();
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'black'; ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.lineCap = 'round';

    for (let a of asteroids) {
      ctx.save();
      ctx.translate(a.x, a.y);
      ctx.rotate(a.ang);
      ctx.beginPath();
      if (a.shape && a.shape.length) {
        ctx.moveTo(a.shape[0].x, a.shape[0].y);
        for (let i = 1; i < a.shape.length; i++) ctx.lineTo(a.shape[i].x, a.shape[i].y);
      } else {
        const verts = a.verts.length || 8;
        const step = Math.PI * 2 / verts;
        for (let i = 0; i < verts; i++) {
          const ang = i * step;
          const r = a.r * (a.verts ? (a.verts[i] || 1) : 1);
          const x = Math.cos(ang) * r, y = Math.sin(ang) * r;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
      }
      ctx.closePath(); ctx.stroke();
      ctx.restore();
    }

    for (let ex of asteroidExplosions) {
      for (let p of ex.pieces) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 1.6));
        ctx.beginPath();
        ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.stroke();
        ctx.restore();
      }
    }

    ctx.strokeStyle = 'white'; ctx.lineWidth = 2;
    for (let b of bullets) {
      ctx.beginPath();
      ctx.moveTo(b.x - b.vx * 0.006, b.y - b.vy * 0.006);
      ctx.lineTo(b.x + b.vx * 0.006, b.y + b.vy * 0.006);
      ctx.stroke();
    }

    if (explosion) {
      for (let p of explosion.pieces) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 1.2));
        if (p.type === 'shard') {
          ctx.beginPath();
          ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.max(1, p.size * 2), 0);
          ctx.stroke();
        }
        ctx.restore();
      }
      ctx.restore();
      return;
    }

    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);
    ctx.beginPath();
    ctx.moveTo(14, 0);
    ctx.lineTo(-10, 9);
    ctx.lineTo(-6, 0);
    ctx.lineTo(-10, -9);
    ctx.closePath();
    ctx.stroke();

    if (ship.thrust > 10) {
      ctx.beginPath();
      ctx.moveTo(-10, -5);
      ctx.lineTo(-18 - Math.random() * 6, 0);
      ctx.lineTo(-10, 5);
      ctx.stroke();
    }
    ctx.restore();
    ctx.restore();
  };

  function loop(now) {
    const dt = Math.min(0.030, (now - lastTime) / 1000);
    lastTime = now;
    update(dt);
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