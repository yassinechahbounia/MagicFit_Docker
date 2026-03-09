variable "cluster_name" {
  description = "EKS Cluster Name"
  type        = string
}

variable "eks_node_role_name" {
  description = "Name of the EKS node IAM role"
  type        = string
}

variable "retention_in_days" {
  description = "Number of days to retain logs"
  type        = number
  default     = 14
}

variable "region" {
  description = "AWS Region"
  type        = string
  default     = "us-east-1"
}
