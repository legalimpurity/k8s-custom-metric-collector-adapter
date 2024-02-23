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

## 4_setup_custom_metric_server_service_service_account_deployemt_api_service

We create a service account for the custom-metric-server.
We create a deployment and a service for the same server.
We create a APIService for the same service.

## 5_metric_server_list_watch_application_pods

We create a rbac cluster role to watch and list pods in the cluster.
We create a rbac cluster role binding that binds the service account of the metric server to the cluster role created above.
This is required for the informer to work.
