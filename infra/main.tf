terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0"
    }
  }
  required_version = ">= 1.0"

  backend "s3" {
    bucket         = "magicfit-terraform-state"
    key            = "infra/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "magicfit-terraform-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = {
      Environment = "dev"
      Project     = "MagicFit"
      ManagedBy   = "terraform"
    }
  }
}

provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_ca_certificate)
  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    args        = ["eks", "get-token", "--cluster-name", "magicfit-eks-dev"]
    command     = "aws"
  }
}

module "vpc" {
  source   = "./modules/VPC"
  name     = "magicfit"
  vpc_cidr = "10.0.0.0/16"
  az_count = 2
  vpc_id   = ""
}

module "eks" {
  source             = "./modules/EKS"
  cluster_name       = "magicfit-eks-dev"
  vpc_id             = module.vpc.vpc_id
  subnet_ids         = module.vpc.private_subnet_ids
  #node_instance_type = "t3.micro"
  node_instance_type = "t3.small"
  node_desired_size  = 2
  node_min_size      = 1
  node_max_size      = 3
}

module "sqs" {
  source             = "./modules/SQS"
  queue_name         = "magicfit-queue"
  eks_node_role_name = module.eks.node_role_name
}

module "cloudwatch" {
  source             = "./modules/CloudWatch"
  cluster_name       = module.eks.cluster_name
  eks_node_role_name = module.eks.node_role_name
}

module "ecr" {
  source               = "./modules/ECR"
  repos                = ["magicfit-backend", "magicfit-frontend", "magicfit-magicmirror", "magicfit-magicmirror-proxy"]
  image_tag_mutability = "MUTABLE"
  expire_untagged_days = 3
}

module "gha" {
  source = "./modules/GHA"
}

output "gha_role_arn" {
  value = module.gha.role_arn
}
