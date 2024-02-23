# k8s-custom-metric-collector-adapter

## 1_add_custom_metric_app

We create a custom metric app and setup its Dockerfile. 
The app just allows us to UPDATE and GET a variable (MY_METRIC). 
These operations are performed through the GET and PUT apis.

## 2_setup_custom_metric_deployment_service

We create a namespace by the name 'custom-metrics-ns'.
We create a deployment for our 'custom-metric-app'.
We create a service pointing towards the pods with label of our deployment.

## 3_setup_custom_metric_server

We create a new custom metric server and setup its Dockerfile.
The app runs on https as kubernetes-api-server can only access endpoints on https.
The app uses the [official client library from kubernetes][https://github.com/kubernetes-client/javascript] for javascript to use a feature known as Informer. 
Informer is used the get the IP's of pod current running under the deployment. This is required for metric collection from application pods.
The metric collector goes to the endpoints of all the application pods every 5 seconds, sums up there metric values from all the pods and exposes it through the external metric routes.
The app runs an express server that exposes the endpoints in the format expected by kubernetes-api-server for custom metrics.

