export const Canvas = {
  stars
};
export default Canvas;

function stars() {
  let canvasApp = null;

  function startCanvas() {
    if (document.querySelector('#zehnLogin')) return;
    if (canvasApp) return;
    const canvas = document.createElement('canvas');
    canvas.id = 'zehnLogin';
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    document.querySelector('.VZ6x_grhNkIYJG__jEEyp').prepend(canvas);

    canvasApp = createApp(canvas);
    window.addEventListener('resize', resize);
    function resize() {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    }
  };

  startCanvas();
};

function createApp(canvas) {
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;

  const STAR_COUNT = Math.floor((W * H) / 10000);
  const LAYERS = 3;
  const SHOOT_PROB = 0.001;

  addEventListener('resize', () => {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
    initStars();
  });

  const mouse = { x: W / 2, y: H / 2 };
  addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

  let stars = [];
  let shootingStars = [];

  function rand(a, b) { return a + Math.random() * (b - a); }
  function choice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function initStars() {
    stars = [];
    for (let layer = 0; layer < LAYERS; layer++) {
      const layerCount = Math.max(5, Math.floor(STAR_COUNT * (1 - layer * 0.25)));
      for (let i = 0; i < layerCount; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
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
    const fromEdge = Math.random() < 0.5 ? 'top' : 'left';
    const x = fromEdge === 'top' ? rand(0, W) : -50;
    const y = fromEdge === 'top' ? -50 : rand(0, H);
    const angle = Math.atan2(rand(H * 0.2, H), rand(W * 0.2, W));
    const speed = rand(6, 14);
    shootingStars.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length: rand(80, 260),
      life: 0,
      maxLife: rand(40, 90),
      alpha: 0.9
    });
  };

  function drawStar(s) {
    const px = s.x + (mouse.x - W / 2) * (s.z * 0.002);
    const py = s.y + (mouse.y - H / 2) * (s.z * 0.002);
    const tw = Math.sin(s.twinklePhase) * 0.5 + 0.5;
    const alpha = Math.max(0, Math.min(1, s.baseAlpha * (0.6 + tw * 0.8)));
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#fff';
    const r = Math.max(0.2, s.size * (0.6 + tw * 0.8));
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function drawShooting(st) {
    ctx.save();
    ctx.globalAlpha = st.alpha * Math.max(0, 1 - st.life / st.maxLife);
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(st.x, st.y);
    ctx.lineTo(st.x - st.vx * st.length / (st.vx * st.vx + st.vy * st.vy) ** 0.5, st.y - st.vy * st.length / (st.vx * st.vx + st.vy * st.vy) ** 0.5);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.beginPath();
    ctx.arc(st.x, st.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  let last = 0;

  function frame(ts) {
    const dt = Math.min(40, ts - last); last = ts;
    ctx.clearRect(0, 0, W, H);

    createSkyGradient(ctx, W, H);

    for (const s of stars) {
      s.x += s.vx * (dt / 16);
      s.y += s.vy * (dt / 16);

      if (s.x < -10) s.x = W + 10;
      if (s.x > W + 10) s.x = -10;
      if (s.y < -10) s.y = H + 10;
      if (s.y > H + 10) s.y = -10;

      s.twinklePhase += s.twinkleSpeed * (dt / 16);
      drawStar(s);
    }

    if (Math.random() < SHOOT_PROB) spawnShootingStar();

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const st = shootingStars[i];
      st.x += st.vx * (dt / 16);
      st.y += st.vy * (dt / 16);
      st.life += (dt / 16);
      drawShooting(st);
      if (st.life > st.maxLife || st.x > W + 200 || st.y > H + 200) shootingStars.splice(i, 1);
    }

    requestAnimationFrame(frame);
  };

  function createSkyGradient(ctx, width, height) {
    const scheme = getSkyScheme();

    const grad = ctx.createLinearGradient(0, 0, 0, height);
    scheme.stops.forEach(([pos, color]) => grad.addColorStop(pos, color));

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    const gx = width * 0.5;
    const gy = height * scheme.glowPos;
    const gRadius = Math.max(width, height) * 0.6;
    const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, gRadius);
    glow.addColorStop(0, scheme.glow[0]);
    glow.addColorStop(1, scheme.glow[1]);
    ctx.fillStyle = glow;
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