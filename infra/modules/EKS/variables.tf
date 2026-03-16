variable "cluster_name" { type = string }
variable "vpc_id"       { type = string }
variable "subnet_ids"   { type = list(string) }

variable "node_instance_type" {
  description = "EC2 instance type for EKS nodes"
  type        = string
  default     = "t3.micro"
}

variable "node_desired_size"  { type = number }
variable "node_min_size"      { type = number }
variable "node_max_size"      { type = number }
