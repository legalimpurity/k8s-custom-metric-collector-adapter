const express = require('express');

const app = express();

let MY_METRIC = 0;

app.get('/',(_req, res) => {
    res.json({
      uptime: process.uptime(),
      myMetric: MY_METRIC
    });
  });

app.put('/:metric',(_req, res) => {
  const { metric } = _req.params;
  MY_METRIC = parseInt(metric);
  res.json({
    uptime: process.uptime(),
    myMetric: MY_METRIC
  });
});
  
module.exports = app;