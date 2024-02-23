const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();

kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const NAMESPACE = 'custom-metrics-ns';
const APP_LABEL_SELECTOR = `app=custom-metric-app`;

const listFn = () => k8sApi.listNamespacedPod(
  NAMESPACE,
  undefined,
  undefined,
  undefined,
  undefined,
  APP_LABEL_SELECTOR,
);

const informer = k8s.makeInformer(
  kc,
  `/api/v1/namespaces/${NAMESPACE}/pods`,
  listFn,
  APP_LABEL_SELECTOR,
);

informer.start();

module.exports = informer;