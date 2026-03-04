resource "aws_ecr_repository" "this" {
  for_each = toset(var.repos)

  name                 = each.value
  image_tag_mutability = var.image_tag_mutability

  image_scanning_configuration {
    scan_on_push = var.scan_on_push
  }

  encryption_configuration {
    encryption_type = var.encryption_type
  }
}

# Nettoyage auto: supprime les images "untagged" après N jours
# (limite le coût et l'encombrement du registry)
resource "aws_ecr_lifecycle_policy" "untagged_cleanup" {
  for_each   = aws_ecr_repository.this
  repository = each.value.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Expire untagged images after ${var.expire_untagged_days} days"
        selection = {
          tagStatus   = "untagged"
          countType   = "sinceImagePushed"
          countUnit   = "days"
          countNumber = var.expire_untagged_days
        }
        action = { type = "expire" }
      }
    ]
  })
}
