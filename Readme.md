# Welcome to Cloud Computing Project

The goal of the project is to application hosting the shopping cart business-logic deployed on a Kubernetes implemented a shopping cart scenario for a web-based application. The server-side cluster using Node.js as runtime.

We used react as a frontend and express node js as a backend.

### Deploy in Kubernetes
To setup in kubernetes project we need to go in [k8s](k8s) folder

### Deploy Locally

1. `npm install` on both `frontend` and `backend` folders
2. `npm start`

! Important before `npm start` in backend be sure postgres already deployed on docker or locally. Provide the env file.


### Run with Docker
1. Each backend and frontend folder has a Dockerfile and `build.sh` you can simply run `build.sh`.
2. When you write `docker ps` command you will see like below images both frontend and backend works fine.
3. Dont forget to check if these image exist in minikube images. To check images first `minikube ssh` then `docker images`



### Run with Kubernetes
1. Open K8S folder.
2. First write `minikube start` command in terminal and be sure attach local docker deamon images to minikube `eval $(minikube -p minikube docker-env)` then apply each yaml following order otherwise you gonna get crash back `kubectl apply -f postgres-deployment.yaml` and `kubectl apply -f  backend-simply-deployment.yaml` and `kubectl apply -f frontend-simply-deployment.yaml`
3. Access pod from browser using port forward command `kubectl port-forward cloud-backend-deployment-6797c7c7cc-nfp58 3005:3005`
4. Access the frontend `kubectl port-forward cloud-frontend-deployment-78f9bd748d-4chxh 80:80` or `kubectl get svc` and `minikube service cloud-frontend-service`

![Kubernetes-Pods](images/k8s.png)

! Important dont forget to change env config *DATABASE_URL* value in **backend-simply-deployment.yaml**
To receive ip address of `kubectl get service` then see cluster ip address like this example
![clusterIpAddress](images/clusterIp.png)

```yaml
env:
    - name: DATABASE_URL
      value: "postgresql://admin:admin@10.106.119.51:5432/postgres?schema=public"
```


### General View of Ecommerce Website

![Ecommerce](images/ecom1.png)

### Add to Cart
![Ecommerce1](images/ecom2.png)

### Click the Purchase Button
![Ecommerce2](images/ecom3.png)

### Admin Dashboard
![Admin](images/admin.png)

### Filtered Product
![Admin](images/admin1.png)

