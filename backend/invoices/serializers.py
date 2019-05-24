from rest_framework import serializers

from .models import Invoice, InvoiceItem


class InvoiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceItem
        fields = ['item', 'quantity']


class InvoiceSerializer(serializers.ModelSerializer):
    invoice_items = InvoiceItemSerializer(many=True)

    class Meta:
        model = Invoice
        fields = '__all__'

    def create(self, validated_data):
        invoice_items_data = validated_data.pop('invoice_items')
        invoice = Invoice.objects.create(**validated_data)
        for invoice_item_data in invoice_items_data:
            InvoiceItem.objects.create(invoice=invoice, **invoice_item_data)
        return invoice

    def update(self, instance: Invoice, validated_data):
        invoice_items_data = validated_data.pop('invoice_items')
        invoice = instance
        invoice.date = validated_data['date']
        invoice.subtotal = validated_data['subtotal']
        invoice.vat_percentage = validated_data['vat_percentage']
        invoice.total = validated_data['total']
        invoice.total_paid = validated_data['total_paid']
        invoice.total_due = validated_data['total_due']
        invoice.payment_term = validated_data['payment_term']
        invoice.client = validated_data['client']
        invoice.invoice_items.all().delete()
        for invoice_item_data in invoice_items_data:
            InvoiceItem.objects.create(invoice=invoice, **invoice_item_data)
        invoice.save()
        return invoice
