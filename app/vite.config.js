import { defineConfig } from 'vite';
import { resolve } from 'path';
import multer from 'multer';
import { sendInquiryEmail } from './api/inquiryHandler.js';

const upload = multer({ storage: multer.memoryStorage() });

// Custom Vite plugin to handle POST /api/send-inquiry
function inquiryApiPlugin() {
  return {
    name: 'inquiry-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/send-inquiry', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 450;
          res.end(JSON.stringify({ success: false, message: 'Method not allowed' }));
          return;
        }

        // Handle multipart form data parsing
        upload.single('artwork')(req, res, async (err) => {
          if (err) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'File upload error: ' + err.message }));
            return;
          }

          try {
            const result = await sendInquiryEmail(req.body, req.file);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
          } catch (e) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: e.message }));
          }
        });
      });
    }
  };
}

export default defineConfig({
  root: './',
  base: './',
  plugins: [inquiryApiPlugin()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        solutions: resolve(__dirname, 'solutions.html'),
        infrastructure: resolve(__dirname, 'infrastructure.html'),
        industries: resolve(__dirname, 'industries.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
});
