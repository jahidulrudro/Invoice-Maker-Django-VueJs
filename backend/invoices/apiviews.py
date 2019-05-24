from rest_framework import generics

from .models import Invoice
from .serializers import InvoiceSerializer


class InvoiceListCreateApiView(generics.ListCreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer


class InvoiceRetrieveUpdateDestroyApiView(
        generics.RetrieveUpdateDestroyAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
