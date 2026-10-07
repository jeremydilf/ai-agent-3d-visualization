import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const marketState = {
  portfolio: 18.42,
  winRate: 72.8,
  nasdaq: 18424.32,
  btc: 64280,
  eth: 3420,
  nflLine: 3.5,
  trend: 'Bullish',
  signal: 'Momentum breakout',
  risk: 'Moderate',
  exposure: 61.4,
};

const agents = [
  {
    id: 'alpha-trade',
    name: 'Alpha Trade',
    type: 'Day Trading',
    color: '#6fe7ff',
    pnl: 2.38,
    confidence: 0.87,
    exposure: 31,
    strategy: 'Momentum / catalysts',
    position: 'Long TSLA / NVDA',
    value: 4.12,
    bias: 1,
    x: -2.5,
    y: 1.1,
    z: 0.2,
  },
  {
    id: 'bet-oracle',
    name: 'Bet Oracle',
    type: 'Sports Betting',
    color: '#4ee39b',
    pnl: 1.76,
    confidence: 0.79,
    exposure: 24,
    strategy: 'Model line movement',
    position: 'Lions +3.5 / over 47.5',
    value: 2.91,
    bias: 0.7,
    x: 2.3,
    y: 0.6,
    z: -1.4,
  },
  {
    id: 'crypto-synth',
    name: 'Crypto Synth',
    type: 'Crypto Strategy',
    color: '#b08dff',
    pnl: 3.42,
    confidence: 0.91,
    exposure: 36,
    strategy: 'Trend / macro rotation',
    position: 'BTC long, ETH hedge',
    value: 6.28,
    bias: 1.2,
    x: 0.1,
    y: -1.1,
    z: 1.8,
  },
  {
    id: 'risk-ops',
    name: 'Risk Ops',
    type: 'Portfolio Control',
    color: '#ffc857',
    pnl: 0.94,
    confidence: 0.72,
    exposure: 18,
    strategy: 'Risk gating',
    position: 'Liquidity buffer',
    value: 1.55,
    bias: -0.4,
    x: -4.3,
    y: -1.8,
    z: -0.8,
  },
];

const eventLog = [
  'TSLA breakout confirmed after earnings catalyst spread.',
  'Sports model identifies sharp line movement on total points.',
  'BTC funding rates remain neutral while volatility expands.',
  'ETH hedges reduce downside exposure during rotation.',
  'Macro volatility remains elevated but risk appetite improves.',
  'Momentum traders stack into semiconductor names before open.',
];

const ui = {
  portfolioValue: document.getElementById('portfolioValue'),
  winRate: document.getElementById('winRate'),
  marketPulse: document.getElementById('marketPulse'),
  nasdaqIndex: document.getElementById('nasdaqIndex'),
  nasdaqDelta: document.getElementById('nasdaqDelta'),
  btcPrice: document.getElementById('btcPrice'),
  btcDelta: document.getElementById('btcDelta'),
  ethPrice: document.getElementById('ethPrice'),
  ethDelta: document.getElementById('ethDelta'),
  nflLine: document.getElementById('nflLine'),
  nflDelta: document.getElementById('nflDelta'),
  marketTrend: document.getElementById('marketTrend'),
  signalText: document.getElementById('signalText'),
  riskText: document.getElementById('riskText'),
  exposureText: document.getElementById('exposureText'),
  agentList: document.getElementById('agentList'),
};

const container = document.getElementById('sceneContainer');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07131d);
scene.fog = new THREE.Fog(0x07131d, 8, 28);

const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 100);
camera.position.set(0, 3.2, 9.4);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = true;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

const ambientLight = new THREE.AmbientLight(0xcfe9ff, 1.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x4cc9ff, 2.4, 25, 2);
pointLight.position.set(1.5, 4, 5);
scene.add(pointLight);

const secondaryLight = new THREE.PointLight(0xb08dff, 1.4, 25, 2);
secondaryLight.position.set(-4, -2, 4);
scene.add(secondaryLight);

const grid = new THREE.GridHelper(18, 22, 0x1ea9ff, 0x1a2f3d);
grid.material.opacity = 0.32;
grid.material.transparent = true;
scene.add(grid);

const centerCore = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.9, 1),
  new THREE.MeshStandardMaterial({
    color: 0x7ad6ff,
    emissive: 0x1ea9ff,
    emissiveIntensity: 0.7,
    transparent: true,
    opacity: 0.9,
  })
);
scene.add(centerCore);

const orbitGroup = new THREE.Group();
scene.add(orbitGroup);

const ringMaterial = new THREE.MeshBasicMaterial({
  color: 0x5fd2ff,
  transparent: true,
  opacity: 0.12,
  side: THREE.DoubleSide,
});

const rings = [
  new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.02, 16, 120), ringMaterial.clone()),
  new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.016, 16, 120), ringMaterial.clone()),
  new THREE.Mesh(new THREE.TorusGeometry(5.3, 0.012, 16, 120), ringMaterial.clone()),
];

rings[0].rotation.x = Math.PI / 2;
rings[1].rotation.y = Math.PI / 2;
rings[2].rotation.x = Math.PI / 1.8;
for (const ring of rings) orbitGroup.add(ring);

const nodes = [];
const links = [];

const createNode = (agent) => {
  const geometry = new THREE.SphereGeometry(0.34, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(agent.color),
    emissive: new THREE.Color(agent.color).multiplyScalar(1.2),
    emissiveIntensity: 0.66,
    metalness: 0.3,
    roughness: 0.18,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(agent.x, agent.y, agent.z);
  mesh.userData = { agent };
  scene.add(mesh);
  nodes.push(mesh);

  const label = document.createElement('div');
  label.className = 'agent-label';
  label.textContent = agent.name;
  label.style.position = 'absolute';
  label.style.pointerEvents = 'none';
  label.style.transform = 'translate(-50%, -50%)';
  label.style.fontSize = '12px';
  label.style.color = '#dfefff';
  label.style.textShadow = '0 0 10px rgba(111,231,255,0.4)';
  label.style.opacity = '0.8';
  container.appendChild(label);
  mesh.userData.label = label;
};

agents.forEach(createNode);

for (let i = 0; i < nodes.length; i += 1) {
  for (let j = i + 1; j < nodes.length; j += 1) {
    const material = new THREE.LineBasicMaterial({
      color: 0x5bbaf5,
      transparent: true,
      opacity: 0.18,
    });

    const geometry = new THREE.BufferGeometry().setFromPoints([
      nodes[i].position.clone(),
      nodes[j].position.clone(),
    ]);

    const line = new THREE.Line(geometry, material);
    scene.add(line);
    links.push(line);
  }
}

function updateUI() {
  ui.portfolioValue.textContent = `$${marketState.portfolio.toFixed(2)}M`;
  ui.winRate.textContent = `${marketState.winRate.toFixed(1)}%`;
  ui.nasdaqIndex.textContent = marketState.nasdaq.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  ui.btcPrice.textContent = `$${marketState.btc.toLocaleString()}`;
  ui.ethPrice.textContent = `$${marketState.eth.toLocaleString()}`;
  ui.nflLine.textContent = `Lions +${marketState.nflLine}`;
  ui.marketTrend.textContent = marketState.trend;
  ui.signalText.textContent = marketState.signal;
  ui.riskText.textContent = marketState.risk;
  ui.exposureText.textContent = `${marketState.exposure.toFixed(1)}%`;

  const nasdaqDelta = ((Math.random() * 2.1) + 0.5).toFixed(2);
  const btcDelta = ((Math.random() * 3.4) + 1.2).toFixed(2);
  const ethDelta = (-(Math.random() * 2.1 + 0.2)).toFixed(2);

  ui.nasdaqDelta.textContent = `${nasdaqDelta > 0 ? '+' : ''}${nasdaqDelta}%`;
  ui.nasdaqDelta.className = Number(nasdaqDelta) >= 0 ? 'positive' : 'negative';

  ui.btcDelta.textContent = `+${btcDelta}%`;
  ui.btcDelta.className = 'positive';

  ui.ethDelta.textContent = `${ethDelta}%`;
  ui.ethDelta.className = Number(ethDelta) >= 0 ? 'positive' : 'negative';

  ui.nflDelta.textContent = Math.random() > 0.5 ? 'Sharp' : 'Stable';
  ui.nflDelta.className = Math.random() > 0.5 ? 'positive' : 'negative';
}

function renderAgentCards() {
  ui.agentList.innerHTML = agents
    .map(
      (agent) => `
        <div class="agent-card">
          <div class="agent-top">
            <div class="agent-name">
              <span class="agent-dot" style="color:${agent.color}; background:${agent.color};"></span>
              <div>
                <h3>${agent.name}</h3>
                <div class="agent-type">${agent.type}</div>
              </div>
            </div>
            <span class="badge ${agent.pnl >= 2 ? 'positive' : 'negative'}">${agent.pnl >= 2 ? 'Profit' : 'Watch'}</span>
          </div>

          <div class="agent-metrics">
            <div class="metric">
              <span>PNL</span>
              <strong>${agent.pnl.toFixed(2)}%</strong>
            </div>
            <div class="metric">
              <span>Conf.</span>
              <strong>${agent.confidence.toFixed(2)}</strong>
            </div>
            <div class="metric">
              <span>Value</span>
              <strong>$${agent.value.toFixed(2)}M</strong>
            </div>
            <div class="metric">
              <span>Exposure</span>
              <strong>${agent.exposure}%</strong>
            </div>
          </div>
        </div>
      `
    )
    .join('');
}

function updateMarket() {
  const volatility = (Math.random() - 0.5) * 0.4;
  marketState.nasdaq += marketState.nasdaq * (volatility * 0.0025);
  marketState.btc += marketState.btc * (Math.random() * 0.008 + 0.002);
  marketState.eth += marketState.eth * ((Math.random() - 0.45) * 0.012);
  marketState.nflLine += (Math.random() - 0.5) * 0.4;

  if (marketState.nasdaq > 18800) {
    marketState.trend = 'Bullish';
  } else if (marketState.nasdaq < 18080) {
    marketState.trend = 'Cautious';
  }

  const profileRoll = Math.random();
  if (profileRoll > 0.7) {
    marketState.signal = 'Breakout momentum';
    marketState.risk = 'Moderate';
    marketState.exposure = 66.1;
  } else if (profileRoll > 0.35) {
    marketState.signal = 'Mean reversion';
    marketState.risk = 'Tight';
    marketState.exposure = 51.7;
  } else {
    marketState.signal = 'Macro rotation';
    marketState.risk = 'Balanced';
    marketState.exposure = 61.4;
  }

  agents.forEach((agent) => {
    agent.pnl += (Math.random() - 0.4) * 0.28;
    agent.confidence = Math.min(0.97, Math.max(0.62, agent.confidence + (Math.random() - 0.5) * 0.07));
    agent.exposure = Math.min(48, Math.max(14, agent.exposure + (Math.random() - 0.5) * 6));
  });

  const randomEvent = eventLog[Math.floor(Math.random() * eventLog.length)];
  console.log(randomEvent);
  updateUI();
  renderAgentCards();
}

function animate() {
  requestAnimationFrame(animate);

  const time = performance.now() * 0.001;

  nodes.forEach((node, index) => {
    const agent = node.userData.agent;
    const slow = time * (0.5 + index * 0.08);
    node.position.x = agent.x + Math.sin(slow + index) * 0.35;
    node.position.y = agent.y + Math.cos(slow * 1.7 + index) * 0.4;
    node.position.z = agent.z + Math.sin(slow * 1.2) * 0.28;

    const pulse = 1 + Math.sin(time * 3 + index) * 0.12;
    node.scale.setScalar(pulse);

    const { label } = node.userData;
    const vector = node.position.clone();
    vector.project(camera);
    const x = (vector.x * 0.5 + 0.5) * container.clientWidth;
    const y = (-vector.y * 0.5 + 0.5) * container.clientHeight;
    label.style.left = `${x}px`;
    label.style.top = `${y - 30}px`;
  });

  links.forEach((line, index) => {
    const a = nodes[index % nodes.length];
    const b = nodes[(index + 1) % nodes.length];
    line.geometry.setFromPoints([a.position.clone(), b.position.clone()]);
  });

  centerCore.rotation.x += 0.005;
  centerCore.rotation.y += 0.01;
  orbitGroup.rotation.y += 0.004;
  orbitGroup.rotation.x += 0.003;

  controls.update();
  renderer.render(scene, camera);
}

function onResize() {
  const { clientWidth, clientHeight } = container;
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(clientWidth, clientHeight);
}

window.addEventListener('resize', onResize);

updateUI();
renderAgentCards();
setInterval(updateMarket, 1800);
animate();
