variable "aws_region" { type = string }
variable "env" { type = string }

variable "cluster_name" { type = string }

variable "vpc_cidr" { type = string }

variable "node_instance_type" { type = string }
variable "node_desired_size" { type = number }
variable "node_min_size" { type = number }
variable "node_max_size" { type = number }

variable "ecr_repos" {
  description = "Liste des repos ECR à créer"
  type        = list(string)
}
