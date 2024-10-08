resource "aws_key_pair" "default" {
  public_key = var.public_ec2_key
  key_name   = "${var.name_space}_KeyPair_${var.environment}"
}


## Policy document to allow ECS service assume roles
data "aws_iam_policy_document" "ec2_instance_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"
    principals {
      identifiers = [
        "ec2.amazonaws.com",
        "ecs.amazonaws.com"
      ]
      type = "Service"
    }
  }
}

## Role for EC2 instances
resource "aws_iam_role" "ec2_instance_role" {
  assume_role_policy = data.aws_iam_policy_document.ec2_instance_role_policy.json
  name               = "${var.name_space}_EC2InstanceRole_${var.environment}"
}

## Attach AWS Managed policy with necessary permissions for Container EC2 Service to EC2 instance role
resource "aws_iam_role_policy_attachment" "ec2_instance_managed_ecs_policy" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
  role       = aws_iam_role.ec2_instance_role.name
}

resource "aws_iam_instance_profile" "ec2_instance_profile" {
  name = "${var.name_space}_IAMInstanceProfile_${var.environment}"
  role = aws_iam_role.ec2_instance_role.name
}

resource "aws_security_group" "ec2" {
  name   = "${var.name_space}_EC2_SecurityGroup_${var.environment}"
  vpc_id = aws_vpc.main.id

  ingress {
    description = "Allow all icmp traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description     = "Allow incoming traffic from ALB and VPC on HTTP on ephemeral ports"
    from_port       = 1024
    to_port         = 65535
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
    cidr_blocks = concat([
      aws_vpc.main.cidr_block
      ],
    aws_subnet.private.*.cidr_block)
  }

  ingress {
    description     = "Allow incoming traffic from ALB on HTTP"
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
    cidr_blocks = concat([
      aws_vpc.main.cidr_block
      ],
    aws_subnet.private.*.cidr_block)
  }

  ingress {
    description     = "Allow incoming HTTPS"
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
    cidr_blocks = concat([
      aws_vpc.main.cidr_block
      ],
    aws_subnet.private.*.cidr_block)
  }

  ingress {
    description = "Allow incoming HTTPS alt"
    from_port   = 8443
    to_port     = 8443
    protocol    = "tcp"
    cidr_blocks = concat([
      aws_vpc.main.cidr_block
      ],
    aws_subnet.private.*.cidr_block)
  }

  ingress {
    description = "Allow backend receieve HTTP"
    from_port   = 9370
    to_port     = 9370
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # ingress {
  #   description     = "Allow incoming traffic from Postgres RDS database"
  #   from_port       = 5432
  #   to_port         = 5432
  #   protocol        = "tcp"
  #   security_groups = [aws_security_group.db_main.id]
  # }

  #  ingress {
  #    description     = "Allow SSH from bastion host"
  #    from_port       = 22
  #    to_port         = 22
  #    protocol        = "tcp"
  #    security_groups = [aws_security_group.bastion.id]
  #  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

data "aws_ssm_parameter" "ecs_node_ami" {
  name = "/aws/service/ecs/optimized-ami/amazon-linux-2023/recommended/image_id"
}

resource "aws_launch_template" "main" {
  name          = "${var.name_space}_LaunchTemplate_${var.environment}"
  image_id      = data.aws_ssm_parameter.ecs_node_ami.value
  instance_type = var.ec2_instance_type
  key_name      = aws_key_pair.default.key_name
  #  vpc_security_group_ids = [aws_security_group.ec2.id]
  user_data = base64encode(<<-EOF
#!/bin/bash
echo ECS_CLUSTER=${aws_ecs_cluster.main.name} >> /etc/ecs/ecs.config
echo V11
EOF
  )

  monitoring {
    enabled = true
  }

  network_interfaces {
    associate_public_ip_address = true
    security_groups             = [aws_security_group.ec2.id]
  }

  iam_instance_profile {
    arn = aws_iam_instance_profile.ec2_instance_profile.arn
  }
}
