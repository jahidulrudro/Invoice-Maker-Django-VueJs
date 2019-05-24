from django.db import models
import os


def generate_logo_upload_location(instance, filename):
    base_name = os.path.basename(filename)
    _, ext = os.path.splitext(base_name)
    return f'company/logo{ext}'


def generate_small_logo_upload_location(instance, filename):
    base_name = os.path.basename(filename)
    _, ext = os.path.splitext(base_name)
    return f'company/small-logo{ext}'


class Company(models.Model):
    name = models.CharField(max_length=128)
    email = models.EmailField()
    address = models.CharField(max_length=512)
    phone = models.CharField(max_length=15)
    currency = models.CharField(max_length=1)
    logo = models.ImageField(
        upload_to=generate_logo_upload_location,
        null=True,
    )
    small_logo = models.ImageField(
        upload_to=generate_small_logo_upload_location,
        null=True,
    )

    def __str__(self):
        return self.name
