### Building Cloud-Native CI/CD Pipeline and Deploying workload to Google Kubernetes Engine (GKE):

<img width="938" alt="Screenshot 2023-12-08 at 1 15 40 PM" src="https://github.com/MayankPatel85/CountK8/assets/72483518/78455811-77a3-454b-9216-4ff74072f6ab">

Here I have created two microservices that communicate with each other. We use terraform script to create clusters, nodes and pods using decalarative language on GKE. These pods host containers in it.

Also, CI/CD has been set up that triggers builds and hosting constainers on every code pushed to the configured repositories. This all is taken care of using build, deploy and service yaml files.

The process begins by establishing a GKE Cluster through Terraform and storing microservice codebases in Cloud Source Repositories. Whenever there's a code change, Cloud Build is activated to construct and upload the image to the Artifact Registry. After this, the updated image is employed to deploy containers within a pod in GKE.

Additionally, a persistent volume is attached to ensure consistent storage, thus optimizing the continuous integration and deployment workflow.

## To run the project:

* Change the variables in `terraform.tfvars` file and image_url in `cloudbuild.yml` file.
