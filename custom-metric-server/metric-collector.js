const informer = require('./k8s-informer');
const axios = require('axios');

let METRICS = new Map();

const getAppPodIps = async() => {
  const pods = informer
    .list()
    .filter(pod => pod.status?.phase === 'Running' && pod.status.podIP);
  return pods.map(pod => pod.status.podIP);
}

const getMetric = (podIP) => {
    return axios(
      `http://${podIP}:8080/`,
      {
        timeout: 2000,
      }
    )
      .then(response => {
        return response.data;
      })
      .catch(e => {
        console.log(e);
        return undefined;
      });
  };
  

const getMetricsFromApps = async() => {
  console.log('Fetching metrics from apps');
  const appPodIps = await getAppPodIps();
  console.log(appPodIps);
  const proxyAnswers = await Promise.all(
    appPodIps.map(appPodIp => getMetric(appPodIp))
  );
  console.log(proxyAnswers);
  const metricSumValue = proxyAnswers.map(proxyAnswer => proxyAnswer.myMetric).reduce((partialSum, currentMetricValue) => partialSum + currentMetricValue, 0);
  console.log('Setting metric value', metricSumValue);
  return metricSumValue;
}

let collecting = false;
setInterval(async () => {
  if (collecting) {
    return;
  }
  collecting = true;
  try {
    console.log('Starting/Restarting Metric Collection');
    const value = await getMetricsFromApps();
    if(value !== undefined & value !== null) {
      METRICS.set('custom-metric', value);
    } else {
      console.log('Skipped Setting metric as metric is null.');
    }
  } finally {
    collecting = false;
  }
}, 5000);

module.exports = METRICS;