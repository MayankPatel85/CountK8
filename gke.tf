variable "project_id" {
    description: "project id"
}

variable "region" {
    description: "region"
}

provider "google" {
    project =   var.project_id
    region  =   var.region
}

resource "google_container_cluster" "cluster" {
    name                =   "as3-k8"
    location            =   "us-central1-c"
    initial_node_count  =   3

    node_config {
        machine_type    =   "e2-medium"
        disk_size_gb    =   100
    }
}