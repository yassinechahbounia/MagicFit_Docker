# ============================================================
# Bootstrap Terraform — Créer le bucket S3 + table DynamoDB
# pour stocker le state Terraform à distance.
#
# Usage (une seule fois) :
#   cd infra/backend-bootstrap
#   terraform init
#   terraform apply
# ============================================================

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
  required_version = ">= 1.0"
}

provider "aws" {
  region = "us-east-1"
}

# ---- S3 Bucket pour le state ----
resource "aws_s3_bucket" "terraform_state" {
  bucket = "magicfit-terraform-state"

  # Empêcher la suppression accidentelle
  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Name        = "magicfit-terraform-state"
    Project     = "MagicFit"
    Environment = "shared"
    ManagedBy   = "terraform"
  }
}

resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ---- DynamoDB pour le state locking ----
resource "aws_dynamodb_table" "terraform_lock" {
  name         = "magicfit-terraform-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name        = "magicfit-terraform-lock"
    Project     = "MagicFit"
    Environment = "shared"
    ManagedBy   = "terraform"
  }
}
