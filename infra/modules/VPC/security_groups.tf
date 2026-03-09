resource "aws_security_group" "backend" {
  name        = "magicfit-backend-sg"
  description = "Security group for MagicFit backend pods"
  vpc_id      = aws_vpc.this.id

  ingress {
    description      = "Allow HTTP from VPC"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = [aws_vpc.this.cidr_block]
  }

  ingress {
    description      = "Allow HTTPS from VPC"
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = [aws_vpc.this.cidr_block]
  }

  egress {
    description      = "Allow all outbound traffic"
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  tags = {
    Name = "magicfit-backend-sg"
  }
}

resource "aws_security_group" "db" {
  name        = "magicfit-db-sg"
  description = "Security group for MagicFit MySQL DB"
  vpc_id      = aws_vpc.this.id

  ingress {
    description      = "Allow MySQL from backend SG only"
    from_port        = 3306
    to_port          = 3306
    protocol         = "tcp"
    security_groups  = [aws_security_group.backend.id]
  }

  egress {
    description      = "Allow all outbound traffic"
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  tags = {
    Name = "magicfit-db-sg"
  }
}
