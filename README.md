# CaseGuard Pitch Dashboard

A Next.js marketing dashboard for CaseGuard growth strategy visualization.

## Getting Started

### Prerequisites

- Node.js 22.16.0 or higher
- Yarn package manager

### Installation

```bash
yarn install
```

### Development

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Building for Production

```bash
yarn build
yarn start
```

## Deployment on Render

This project is configured for automatic deployment on Render. The `render.yaml` file contains the deployment configuration.

### Setup

1. Connect your GitHub repository to Render
2. Render will automatically detect the `render.yaml` file
3. The service will build and deploy automatically

### Manual Setup

If you need to configure manually:
- Build Command: `yarn install && yarn build`
- Start Command: `yarn start`
- Environment: Node.js 22.16.0

## Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   └── globals.css        # Global styles
└── components/
    ├── case-guard-pitch-dashboard.jsx  # Main dashboard component
    └── ui/                # UI components (Card, Button, Input, Tabs)
public/
└── [images go here]       # Static assets
```

## Adding Images

Add your logo images to the `public/` directory:
- `caseguard-cglogo-trademark.png`
- `logo_Nytro_color.png`

## Technologies

- Next.js 14
- React 18
- Tailwind CSS
- Recharts
- Framer Motion
- Lucide React

