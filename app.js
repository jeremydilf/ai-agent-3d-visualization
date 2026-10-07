:root {
  --bg: #07131d;
  --bg-2: #0a1b2a;
  --panel: rgba(14, 25, 37, 0.72);
  --panel-strong: rgba(18, 30, 44, 0.9);
  --line: rgba(124, 161, 182, 0.18);
  --text: #eaf6ff;
  --muted: #8ea8bc;
  --cyan: #6fe7ff;
  --cyan-strong: #2ec4ff;
  --green: #4ee39b;
  --green-soft: rgba(78, 227, 155, 0.12);
  --red: #ff6b79;
  --red-soft: rgba(255, 107, 121, 0.12);
  --amber: #ffc857;
  --purple: #b08dff;
  --shadow: rgba(2, 9, 16, 0.6);
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  min-height: 100%;
  background:
    radial-gradient(circle at top, rgba(46, 196, 255, 0.18), transparent 32%),
    radial-gradient(circle at bottom right, rgba(176, 141, 255, 0.18), transparent 26%),
    var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
}

body {
  min-height: 100vh;
  padding: 20px;
}

button {
  font: inherit;
}

.app-shell {
  max-width: 1520px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.glass-panel {
  background: var(--panel);
  border: 1px solid var(--line);
  box-shadow: 0 15px 50px rgba(3, 8, 15, 0.38);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px;
  border-radius: 20px;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo-mark {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-weight: 800;
  background: linear-gradient(135deg, var(--cyan), var(--purple));
  color: #061421;
  box-shadow: 0 10px 30px rgba(46, 196, 255, 0.28);
}

.eyebrow,
.header-label,
.label {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 10px;
  color: var(--muted);
}

h1, h2, p {
  margin: 0;
}

h1 {
  font-size: 1.25rem;
  font-weight: 700;
}

.topbar-stats {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.stat-pill {
  min-width: 140px;
  background: rgba(14, 26, 37, 0.8);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-pill strong {
  font-weight: 700;
  font-size: 0.98rem;
}

.stat-pill.live {
  min-width: 110px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.dot {
  width: 9px;
  height: 9px;
  display: inline-block;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 12px rgba(78, 227, 155, 0.75);
}

.dashboard {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr) 360px;
  gap: 18px;
  min-height: 760px;
}

.left-panel,
.right-panel,
.center-panel {
  border-radius: 22px;
  padding: 18px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.badge.positive {
  background: rgba(78, 227, 155, 0.12);
  border-color: rgba(78, 227, 155, 0.3);
  color: var(--green);
}

.badge.negative {
  background: rgba(255, 107, 121, 0.12);
  border-color: rgba(255, 107, 121, 0.3);
  color: var(--red);
}

.ticker-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.ticker-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: center;
  padding: 12px 14px;
  background: rgba(11, 23, 31, 0.72);
  border: 1px solid var(--line);
  border-radius: 14px;
}

.ticker-row span,
.ticker-row strong,
.ticker-row em {
  font-size: 0.88rem;
}

.ticker-row em {
  font-style: normal;
}

.positive {
  color: var(--green);
}

.negative {
  color: var(--red);
}

.mini-graphs {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.mini-card {
  background: rgba(13, 24, 35, 0.82);
  border-radius: 16px;
  border: 1px solid var(--line);
  padding: 14px;
}

.mini-card > span {
  display: block;
  color: var(--muted);
  margin-bottom: 8px;
}

.mini-card > strong {
  display: block;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.mini-card svg {
  display: block;
  width: 100%;
  height: 44px;
}

.mini-card path {
  fill: none;
  stroke: var(--cyan);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.center-panel {
  display: flex;
  flex-direction: column;
}

.scene-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.scene-header h2 {
  font-size: clamp(1.15rem, 2vw, 1.6rem);
  margin-top: 6px;
}

.scenario-toggle {
  display: inline-flex;
  background: rgba(11, 23, 31, 0.8);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 4px;
}

.scenario-toggle button {
  background: transparent;
  color: var(--muted);
  border: none;
  border-radius: 999px;
  padding: 8px 16px;
  cursor: pointer;
}

.scenario-toggle button.active {
  background: linear-gradient(135deg, rgba(46,196,255,0.22), rgba(176,141,255,0.2));
  color: var(--text);
  box-shadow: inset 0 0 0 1px rgba(111,231,255,0.34);
}

#sceneContainer {
  position: relative;
  flex: 1;
  min-height: 540px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--line);
  background:
    radial-gradient(circle at center, rgba(23, 44, 64, 0.7), rgba(8, 17, 25, 0.94) 58%),
    #08151d;
}

#sceneContainer canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.scene-footer {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.signal-box {
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 12px 14px;
  background: rgba(9, 20, 28, 0.8);
}

.signal-box strong {
  display: block;
  margin-top: 4px;
  font-size: 1rem;
}

.right-panel {
  display: flex;
  flex-direction: column;
}

.agent-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.agent-card {
  border: 1px solid var(--line);
  background: rgba(12, 22, 32, 0.8);
  border-radius: 16px;
  padding: 14px;
}

.agent-top {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  margin-bottom: 12px;
}

.agent-name {
  display: flex;
  align-items: center;
  gap: 10px;
}

.agent-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 16px currentColor;
}

.agent-card h3 {
  margin: 0;
  font-size: 1rem;
}

.agent-type {
  font-size: 0.74rem;
  color: var(--muted);
}

.agent-metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.metric {
  border-radius: 12px;
  background: rgba(16, 30, 42, 0.8);
  border: 1px solid rgba(148, 176, 192, 0.12);
  padding: 10px 8px;
}

.metric span {
  display: block;
  color: var(--muted);
  font-size: 0.7rem;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.metric strong {
  font-size: 0.92rem;
}

@media (max-width: 1100px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .right-panel,
  .left-panel {
    order: 2;
  }

  .center-panel {
    order: 1;
  }
}

@media (max-width: 640px) {
  body {
    padding: 14px;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .topbar-stats {
    width: 100%;
    justify-content: space-between;
  }

  .scene-footer {
    grid-template-columns: 1fr;
  }
}
