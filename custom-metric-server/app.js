const express = require('express');
const externalMetrics = require('./external-metrics-routes');

const app = express();

const apiRoutes = express.Router();
apiRoutes.use(express.json());
apiRoutes.use('/external.metrics.k8s.io', externalMetrics);

app.use('/apis', apiRoutes);

app.get('/',(_req, res) => {
    res.json({
      uptime: process.uptime(),
    });
  });

  
module.exports = app;