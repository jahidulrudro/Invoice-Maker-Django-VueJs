from django.db import models


class Item(models.Model):
    serial_number = models.CharField(max_length=32, unique=True)
    name = models.CharField(max_length=256)
    model = models.CharField(max_length=256)
    stock = models.IntegerField(null=True, default=None, blank=True)
    price = models.DecimalField(decimal_places=2, max_digits=15)
    description = models.TextField()

    def __str__(self):
        return self.name
