variable "queue_name" {
  description = "Name of the SQS queue"
  type        = string
}

variable "eks_node_role_name" {
  description = "Name of the EKS node IAM role to attach SQS permissions"
  type        = string
}
