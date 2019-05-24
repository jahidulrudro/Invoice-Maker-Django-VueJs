from django.db import models
from django_countries.fields import CountryField
from django.core.validators import MaxValueValidator, MinValueValidator


class Client(models.Model):
    name = models.CharField(max_length=128)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    business = models.CharField(max_length=128)
    country = CountryField()
    zip_code = models.IntegerField(validators=[
        MinValueValidator(501, 'ZIP Code must be more than 500'),
        MaxValueValidator(99950, 'ZIP Code must be below 99951'),
    ])

    def __str__(self):
        return self.name
