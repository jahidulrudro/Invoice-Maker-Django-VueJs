from django.urls import path

from .apiviews import (
    InvoiceListCreateApiView,
    InvoiceRetrieveUpdateDestroyApiView,
)
from .views import InvoicePDFView, InvoiceListPDFView

app_name = 'invoices'
urlpatterns = [
    path(
        '',
        InvoiceListCreateApiView.as_view(),
        name='invoice_list_create',
    ),
    path(
        'pdf/',
        InvoiceListPDFView.as_view(),
        name='invoices_list_pdf',
    ),
    path(
        '<pk>/',
        InvoiceRetrieveUpdateDestroyApiView.as_view(),
        name='invoice_retrieve_update_destroy',
    ),
    path(
        '<pk>/pdf',
        InvoicePDFView.as_view(),
        name='invoice_pdf_view',
    ),
]
