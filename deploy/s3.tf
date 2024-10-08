# # -- S3 Bucket --
# resource "aws_s3_bucket" "main" {
#   bucket = "${var.name_space}bucket"

#   tags = {
#     Name = "${var.name_space}_S3Bucket_${var.environment}"
#   }
# }

# resource "aws_s3_bucket_ownership_controls" "main" {
#   bucket = aws_s3_bucket.main.id

#   rule {
#     object_ownership = "BucketOwnerPreferred"
#   }
# }

# resource "aws_s3_bucket_public_access_block" "main" {
#   bucket                  = aws_s3_bucket.main.id
#   block_public_acls       = false
#   block_public_policy     = false
#   ignore_public_acls      = false
#   restrict_public_buckets = false
# }

# data "aws_canonical_user_id" "current" {}

# resource "aws_s3_bucket_acl" "main" {
#   bucket     = aws_s3_bucket.main.id
#   depends_on = [
#     aws_s3_bucket_ownership_controls.main,
#     aws_s3_bucket_public_access_block.main
#   ]

#   #  acl = "public-read"

#   access_control_policy {
#     #    grant {
#     #      grantee {
#     #        type = "Group"
#     #        uri  = "http://acs.amazonaws.com/groups/global/AllUsers"
#     #      }
#     #      permission = "READ"
#     #    }

#     grant {
#       permission = "FULL_CONTROL"
#       grantee {
#         type = "CanonicalUser"
#         id   = "578e230fa0b7e9257c94ec7df07a092d39bbe9a57235a9fb80fc29cb27146b0f"
#       }
#     }

#     owner {
#       id = data.aws_canonical_user_id.current.id
#     }
#   }
# }

# ### Allow SDK user to access bucket
# #data "aws_iam_policy_document" "s3" {
# #  statement {
# #    actions = [
# #      "s3:GetObject",
# #      "s3:PutObject",
# #      "s3:DeleteObject",
# #      "s3:AbortMultipartUpload",
# #      "s3:ListBucketMultipartUploads",
# #      "s3:ListMultipartUploadParts",
# #      "s3:PutAccelerateConfiguration"
# #    ]
# #
# #    effect = "Allow"
# #
# #    principals {
# #      identifiers = [var.trusted_user_arn]
# #      type        = "AWS"
# #    }
# #  }
# #}

# output "s3_url" {
#   value = "s3://${aws_s3_bucket.main.bucket}"
# }
