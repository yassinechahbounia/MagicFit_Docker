resource "aws_cloudwatch_log_group" "eks_logs" {
  name              = "/aws/eks/${var.cluster_name}/application"
  retention_in_days = var.retention_in_days

  tags = {
    Name        = "${var.cluster_name}-application-logs"
    Environment = "shared"
    Project     = "MagicFit"
  }
}

# IAM Role/Policy pour que EKS Node puisse écrire dans CloudWatch
resource "aws_iam_role_policy" "cloudwatch_access" {
  name   = "${var.cluster_name}-cloudwatch-policy"
  role   = var.eks_node_role_name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "logs:DescribeLogGroups",
          "logs:DescribeLogStreams"
        ]
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}

# Tableau de bord CloudWatch basique
resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = "MagicFit-Dashboard"

  dashboard_body = jsonencode({
    widgets = [
      {
        type   = "metric"
        x      = 0
        y      = 0
        width  = 12
        height = 6
        properties = {
          metrics = [
            ["AWS/EKS", "cluster_failed_node_count", "ClusterName", var.cluster_name]
          ]
          period = 300
          stat   = "Average"
          region = var.region
          title  = "EKS Failed Node Count"
        }
      }
    ]
  })
}
