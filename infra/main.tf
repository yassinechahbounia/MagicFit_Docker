terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
  required_version = ">= 1.0"

  # Backend distant S3 + DynamoDB pour le state locking
  # Pré-requis : exécuter infra/backend-bootstrap/ d'abord
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

module "vpc" {
  source   = "./modules/VPC"
  name     = "magicfit"
  vpc_cidr = "10.0.0.0/16"
  az_count = 2
  vpc_id   = "" # Pass an empty string, will be ignored in main.tf, but required by variables.tf
}

module "eks" {
  source             = "./modules/EKS"
  cluster_name       = "magicfit-eks-dev"
  vpc_id             = module.vpc.vpc_id
  subnet_ids         = module.vpc.private_subnet_ids
  node_instance_type = "t3.medium"
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
