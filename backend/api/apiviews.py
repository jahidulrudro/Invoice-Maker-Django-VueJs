from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response

# from ..authentication.serializers import UserSerializer
from ..clients.models import Client
from ..invoices.models import Invoice, InvoiceItem
from ..items.models import Item


class HomePageAPIView(APIView):
    def get(self, request, format=None, *args, **kwargs):
        items_count = Item.objects.all().count()
        clients_count = Client.objects.all().count()
        invoices_count = Invoice.objects.all().count()
        users_count = get_user_model().objects.all().count()
        invoice_items = InvoiceItem.objects.all()

        item_sells = {}

        for item in invoice_items:
            item_sells.setdefault(item.item.name, 0)
            item_sells[item.item.name] += item.quantity

        return Response({
            "clients_count": clients_count,
            "invoices_count": invoices_count,
            "items_count": items_count,
            "users_count": users_count,
            "item_sells": item_sells
        })
