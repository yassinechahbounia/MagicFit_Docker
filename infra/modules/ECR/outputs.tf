output "repo_urls" {
  description = "URLs ECR par repo"
  value       = { for name, r in aws_ecr_repository.this : name => r.repository_url }
}

output "repo_arns" {
  description = "ARNs ECR par repo"
  value       = { for name, r in aws_ecr_repository.this : name => r.arn }
}
