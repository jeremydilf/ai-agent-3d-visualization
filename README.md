# AI Agent Nexus Desktop

A standalone desktop version of the 3D AI market simulation dashboard.

## Features

- 3D visualization of AI agents
- Day trading, sports betting, and crypto strategy simulation
- Realtime market snapshot and portfolio styling
- Runs as a desktop app instead of a browser tab

## Run locally

From the project folder, install dependencies:

```bash
npm install
```

Then launch the app:

```bash
npm start
```

## Package for desktop distribution

To build a distributable desktop app:

```bash
npm run dist
```

This will generate app bundles in the `dist` folder using Electron Builder.

## Notes

This is a desktop prototype for concept demo use. It is not connected to a real brokerage, sportsbook, or crypto exchange.
