variable "repos" {
  description = "Liste des repos ECR à créer."
  type        = list(string)
}

variable "image_tag_mutability" {
  description = "MUTABLE ou IMMUTABLE (bonne pratique: IMMUTABLE)."
  type        = string
  default     = "IMMUTABLE"
}

variable "scan_on_push" {
  description = "Active le scan de vulnérabilités à chaque push."
  type        = bool
  default     = true
}

variable "encryption_type" {
  description = "AES256 (par défaut) ou KMS."
  type        = string
  default     = "AES256"
}

variable "expire_untagged_days" {
  description = "Supprime les images non taggées après N jours."
  type        = number
  default     = 7
}
