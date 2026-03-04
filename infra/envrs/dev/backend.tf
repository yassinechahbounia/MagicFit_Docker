terraform {
  backend "s3" {
    bucket       = "magicfit-s3"
    key          = "dev/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
    //dynamodb_table = "magicfit-tflock"
    //encrypt        = true
  }
}
