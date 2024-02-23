# k8s-custom-metric-collector-adapter

## 1_add_custom_metric_app

We create a custom metric app and setup its Dockerfile. 
The app just allows us to UPDATE and GET a variable (MY_METRIC). 
These operations are performed through the GET and PUT apis.

## 2_setup_custom_metric_deployment_service

We create a namespace by the name 'custom-metrics-ns'.
We create a deployment for our 'custom-metric-app'.
We create a service pointing towards the pods with label of our deployment.

