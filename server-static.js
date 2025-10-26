const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

const app = express();

// Serve static files from the out directory
const outDir = path.join(__dirname, 'out');
if (fs.existsSync(outDir)) {
  app.use(express.static(outDir));
  
  // Handle client-side routing
  app.get('*', (req, res) => {
    const indexPath = path.join(outDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('Static files not found. Build may not have completed.');
    }
  });
} else {
  // Fallback for build detection
  app.get('*', (req, res) => {
    res.status(500).send('Build directory not found');
  });
}

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`> Server running on http://0.0.0.0:${PORT}`);
  console.log(`> Environment: ${process.env.NODE_ENV || 'development'}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});

