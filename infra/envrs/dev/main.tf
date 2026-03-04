module "vpc" {
  source   = "../../modules/vpc"
  name     = "magicfit-dev"
  vpc_cidr = var.vpc_cidr
  az_count = 2
}

module "eks" {
  source       = "../../modules/eks"
  cluster_name = var.cluster_name
  vpc_id       = module.vpc.vpc_id
  subnet_ids   = module.vpc.private_subnet_ids

  node_instance_type = var.node_instance_type
  node_desired_size  = var.node_desired_size
  node_min_size      = var.node_min_size
  node_max_size      = var.node_max_size
}

module "ecr" {
  source = "../../modules/ecr"
  repos  = var.ecr_repos
}

