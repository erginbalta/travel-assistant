import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { logger } from './utils/logger';

const app = express();
const port = process.env.PORT || 3000;

// Load OpenAPI specification
const swaggerDocument = YAML.load(path.join(__dirname, '../../docs/openapi.yaml'));

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Service proxies
const services = {
  auth: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
  user: process.env.USER_SERVICE_URL || 'http://localhost:3002',
  poi: process.env.POI_SERVICE_URL || 'http://localhost:3003',
  itinerary: process.env.ITINERARY_SERVICE_URL || 'http://localhost:3004'
};

// Proxy middleware configuration
const createServiceProxy = (target: string) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    },
    onError: (err, req, res) => {
      logger.error(`Proxy error: ${err.message}`);
      res.status(500).json({ error: 'Service unavailable' });
    }
  });
};

// Route proxies
app.use('/api/auth', createServiceProxy(services.auth));
app.use('/api/users', createServiceProxy(services.user));
app.use('/api/pois', createServiceProxy(services.poi));
app.use('/api/itineraries', createServiceProxy(services.itinerary));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  logger.info(`API Gateway listening on port ${port}`);
}); 