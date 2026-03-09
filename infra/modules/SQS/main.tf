resource "aws_sqs_queue" "dlq" {
  name                      = "${var.queue_name}-dlq"
  message_retention_seconds = 1209600 # 14 jours
  tags = {
    Name = "${var.queue_name}-dlq"
  }
}

resource "aws_sqs_queue" "main" {
  name                      = var.queue_name
  visibility_timeout_seconds = 60 # Adapte à la durée max de ton Job Laravel
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.dlq.arn
    maxReceiveCount     = 3
  })
  tags = {
    Name = var.queue_name
  }
}

# Policy IAM pour autoriser le NodeRole EKS à interagir avec la file SQS
# (Ceci est attaché au rôle IAM des nodes EKS)
resource "aws_iam_role_policy" "sqs_access" {
  name   = "${var.queue_name}-access-policy"
  role   = var.eks_node_role_name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "sqs:SendMessage",
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:GetQueueAttributes",
          "sqs:GetQueueUrl"
        ]
        Effect   = "Allow"
        Resource = [
          aws_sqs_queue.main.arn,
          aws_sqs_queue.dlq.arn
        ]
      }
    ]
  })
}
