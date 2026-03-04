aws_region = "us-east-1"
env        = "dev"

cluster_name = "magicfit-eks-dev"
vpc_cidr     = "10.0.0.0/16"

node_instance_type = "t3.micro"
node_desired_size  = 2
node_min_size      = 2
node_max_size      = 2

ecr_repos = [
  "magicfit-frontend",
  "magicfit-backend",
  "magicfit-magicmirror",
  "magicfit-magicmirror-proxy"
]
