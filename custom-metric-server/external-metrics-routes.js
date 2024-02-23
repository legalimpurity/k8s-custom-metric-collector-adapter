const express = require('express');
const METRICS = require('./metric-collector');

const metricName = 'custom-metric';

const routes = express.Router();

routes.get('/', (_req, res) => {
  console.log('called /');
  res.json({
    kind: 'APIGroup',
    apiVersion: 'v1',
    name: 'external.metrics.k8s.io',
    versions: [
      {
        groupVersion: 'external.metrics.k8s.io/v1beta1',
        version: '/v1beta1'
      }
    ],
    preferredVersion: {
      groupVersion: 'external.metrics.k8s.io/v1beta1',
      version: '/v1beta1'
    }
  });
});

routes.get('/v1beta1', (_req, res) => {
  console.log('called /v1beta1');
  res.json({
    kind: 'APIResourceList',
    apiVersion: 'v1',
    groupVersion: 'external.metrics.k8s.io/v1beta1',
    resources: {
      name: metricName,
      kind: 'ExternalMetricValueList',
      namespaced: true,
      verbs: ['GET'],
    },
  });
});

routes.get('/v1beta1/namespaces/:namespace/:metricName', (req, res) => {
  console.log('called /v1beta1/namespaces/:namespace/:metricName');
  const { metricName } = req.params;
  console.log(metricName);
  console.log(METRICS.get(metricName));
  res.json({
    kind: 'ExternalMetricValueList',
    apiVersion: 'external.metrics.k8s.io/v1beta1',
    metadata: {
      selfLink: '/apis/external.metrics.k8s.io/v1beta1'
    },
    items: [
      {
        metricName,
        metricLabels: {},
        timestamp: new Date(),
        value: METRICS.has(metricName) ? METRICS.get(metricName).toString() : '0',
      }
    ],
  });
});

module.exports = routes;
