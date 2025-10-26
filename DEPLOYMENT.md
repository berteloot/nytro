# Deployment Instructions for Render

## Issue Resolved

The original error was:
```
npm error path /opt/render/project/src/package.json
npm error Could not read package.json
```

This occurred because Render was looking for `package.json` in the wrong directory.

## Setup Instructions

1. **In your Render dashboard**, go to your web service settings
2. **Check the "Root Directory"** setting:
   - It should be set to `.` (dot, meaning root of repository)
   - NOT `src` or any other subdirectory
3. **Verify build settings**:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

## Automatic Configuration

The `render.yaml` file in this repository should configure Render automatically. If it doesn't work:

1. Check that the Root Directory in Render dashboard is set to `.`
2. Verify that the build and start commands match what's in `render.yaml`

## File Structure

```
/
├── package.json          ← This should be at the root
├── next.config.js
├── tailwind.config.js
├── render.yaml           ← Render configuration
├── src/
│   ├── app/             ← Next.js app router
│   └── components/
└── public/              ← Static assets
```

## Alternative: Manual Configuration

If automatic configuration via `render.yaml` doesn't work, manually set:

- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Node Version**: 22.16.0
- **Root Directory**: `.` (leave empty or use a single dot)

## Environment Variables

No environment variables are required for this deployment.

