from django.db import models
from django.core.validators import MinValueValidator

from ..clients.models import Client
from ..items.models import Item


class Invoice(models.Model):
    date = models.DateField()
    subtotal = models.DecimalField(decimal_places=2, max_digits=15)
    vat_percentage = models.DecimalField(decimal_places=2, max_digits=4)
    total = models.DecimalField(decimal_places=2, max_digits=15, default=0)
    total_paid = models.DecimalField(decimal_places=2, max_digits=15)
    total_due = models.DecimalField(decimal_places=2, max_digits=15)
    payment_term = models.CharField(max_length=128)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)

    def __str__(self):
        return f'Invoice# {self.pk}'


class InvoiceItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    invoice = models.ForeignKey(
        Invoice,
        on_delete=models.CASCADE,
        related_name='invoice_items',
    )

    def __str__(self):
        return self.item.name
