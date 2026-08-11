export const KOSMOS = {
  stars
};
export default KOSMOS;

function stars() {
  let canvasApp = null;

  function startCanvas() {
    if (document.querySelector('#zehnLogin')) return;
    if (canvasApp) return;
    const CANVAS = document.createElement('canvas');
    CANVAS.id = 'zehnLogin';
    CANVAS.style.position = 'absolute';
    CANVAS.style.inset = '0';
    CANVAS.style.width = '100%';
    CANVAS.style.height = '100%';
    CANVAS.width = innerWidth;
    CANVAS.height = innerHeight;

    const PARENT = document.querySelector('.VZ6x_grhNkIYJG__jEEyp');
    if (!PARENT) return;
    PARENT.prepend(CANVAS);

    canvasApp = createApp(CANVAS);
    window.addEventListener('resize', resize);
    function resize() {
      CANVAS.width = innerWidth;
      CANVAS.height = innerHeight;
    }
  };

  startCanvas();
};

function createApp(canvas) {
  const CTX = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;

  const STAR_COUNT = Math.floor((w * h) / 10000);
  const LAYERS = 3;
  const SHOOT_PROB = 0.001;

  addEventListener('resize', () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    initStars();
  });

  const MOUSE = { x: w / 2, y: h / 2 };
  addEventListener('mousemove', (e) => { MOUSE.x = e.clientX; MOUSE.y = e.clientY; });

  let stars = [];
  let shootingStars = [];

  function rand(a, b) { return a + Math.random() * (b - a); }
  function choice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function initStars() {
    stars = [];
    for (let layer = 0; layer < LAYERS; layer++) {
      const LAYER_COUNT = Math.max(5, Math.floor(STAR_COUNT * (1 - layer * 0.25)));
      for (let i = 0; i < LAYER_COUNT; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: layer,
          size: rand(0.3, 1.6) * (1 - layer * 0.2),
          baseAlpha: rand(0.2, 0.9) * (1 - layer * 0.25),
          twinkleSpeed: rand(0.002, 0.009),
          twinklePhase: Math.random() * Math.PI * 2,
          vx: rand(-0.02, 0.02) * (1 + layer * 0.5),
          vy: rand(-0.02, 0.02) * (1 + layer * 0.5)
        });
      }
    }
  }

  function spawnShootingStar() {
    const FROM_EDGE = Math.random() < 0.5 ? 'top' : 'left';
    const X = FROM_EDGE === 'top' ? rand(0, w) : -50;
    const Y = FROM_EDGE === 'top' ? -50 : rand(0, h);
    const ANGLE = Math.atan2(rand(h * 0.2, h), rand(w * 0.2, w));
    const SPEED = rand(6, 14);
    shootingStars.push({
      x: X, y: Y,
      vx: Math.cos(ANGLE) * SPEED,
      vy: Math.sin(ANGLE) * SPEED,
      length: rand(80, 260),
      life: 0,
      maxLife: rand(40, 90),
      alpha: 0.9
    });
  };

  function drawStar(s) {
    const PX = s.x + (MOUSE.x - w / 2) * (s.z * 0.002);
    const PY = s.y + (MOUSE.y - h / 2) * (s.z * 0.002);
    const TWINKLE = Math.sin(s.twinklePhase) * 0.5 + 0.5;
    const ALPHA = Math.max(0, Math.min(1, s.baseAlpha * (0.6 + TWINKLE * 0.8)));
    CTX.globalAlpha = ALPHA;
    CTX.fillStyle = '#fff';
    const RADIUS = Math.max(0.2, s.size * (0.6 + TWINKLE * 0.8));
    CTX.beginPath();
    CTX.arc(PX, PY, RADIUS, 0, Math.PI * 2);
    CTX.fill();
    CTX.globalAlpha = 1;
  }

  function drawShooting(st) {
    CTX.save();
    CTX.globalAlpha = st.alpha * Math.max(0, 1 - st.life / st.maxLife);
    CTX.strokeStyle = 'rgba(255,255,255,0.9)';
    CTX.lineWidth = 2;
    CTX.beginPath();
    CTX.moveTo(st.x, st.y);
    CTX.lineTo(st.x - st.vx * st.length / (st.vx * st.vx + st.vy * st.vy) ** 0.5, st.y - st.vy * st.length / (st.vx * st.vx + st.vy * st.vy) ** 0.5);
    CTX.stroke();

    CTX.fillStyle = 'rgba(255,255,255,1)';
    CTX.beginPath();
    CTX.arc(st.x, st.y, 2.5, 0, Math.PI * 2);
    CTX.fill();
    CTX.restore();
  };

  let last = 0;

  function frame(ts) {
    const DT = Math.min(40, ts - last); last = ts;
    CTX.clearRect(0, 0, w, h);

    createSkyGradient(CTX, w, h);

    for (const STAR of stars) {
      STAR.x += STAR.vx * (DT / 16);
      STAR.y += STAR.vy * (DT / 16);

      if (STAR.x < -10) STAR.x = w + 10;
      if (STAR.x > w + 10) STAR.x = -10;
      if (STAR.y < -10) STAR.y = h + 10;
      if (STAR.y > h + 10) STAR.y = -10;

      STAR.twinklePhase += STAR.twinkleSpeed * (DT / 16);
      drawStar(STAR);
    }

    if (Math.random() < SHOOT_PROB) spawnShootingStar();

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const SHOOTING_STAR = shootingStars[i];
      SHOOTING_STAR.x += SHOOTING_STAR.vx * (DT / 16);
      SHOOTING_STAR.y += SHOOTING_STAR.vy * (DT / 16);
      SHOOTING_STAR.life += (DT / 16);
      drawShooting(SHOOTING_STAR);
      if (SHOOTING_STAR.life > SHOOTING_STAR.maxLife || SHOOTING_STAR.x > w + 200 || SHOOTING_STAR.y > h + 200) shootingStars.splice(i, 1);
    }

    requestAnimationFrame(frame);
  };

  function createSkyGradient(ctx, width, height) {
    const SCHEME = getSkyScheme();

    const GRADIENT = ctx.createLinearGradient(0, 0, 0, height);
    SCHEME.stops.forEach(([pos, color]) => GRADIENT.addColorStop(pos, color));

    ctx.fillStyle = GRADIENT;
    ctx.fillRect(0, 0, width, height);

    const GRADIENT_X = width * 0.5;
    const GRADIENT_Y = height * SCHEME.glowPos;
    const GRADIENT_RADIUS = Math.max(width, height) * 0.6;
    const GLOW = ctx.createRadialGradient(GRADIENT_X, GRADIENT_Y, 0, GRADIENT_X, GRADIENT_Y, GRADIENT_RADIUS);
    GLOW.addColorStop(0, SCHEME.glow[0]);
    GLOW.addColorStop(1, SCHEME.glow[1]);
    ctx.fillStyle = GLOW;
    ctx.fillRect(0, 0, width, height);
  }

  function getSkyScheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return {
        type: 'vertical',
        stops: [
          [0.00, '#c46a94'],
          [0.50, '#ffcdb2'],
          [1.00, '#fff8ee']
        ],
        glow: ['rgba(255,180,200,0.26)', 'rgba(255,180,200,0)'],
        glowPos: 0.78
      };
    } else {
      return {
        type: 'vertical',
        stops: [
          [0.00, '#000010'],
          [1.00, '#000000']
        ],
        glow: ['rgba(20,30,60,0.06)', 'rgba(20,30,60,0)'],
        glowPos: 0.9
      };
    }
  };

  initStars();
  requestAnimationFrame((t) => { last = t; frame(t); });

  addEventListener('click', () => {
    for (let i = 0; i < 3; i++) spawnShootingStar();
  });
};