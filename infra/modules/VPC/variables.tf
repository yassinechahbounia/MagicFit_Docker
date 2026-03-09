variable "name"     { type = string }
variable "vpc_cidr" { type = string }
variable "az_count" { type = number }

variable "vpc_id" {
  description = "The ID of the VPC to associate with security groups."
  type        = string
}
