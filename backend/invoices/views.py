from django.views.generic import DetailView, ListView
from django_weasyprint import WeasyTemplateResponseMixin

from .models import Invoice
from ..company.models import Company


class InvoiceDetailView(DetailView):
    model = Invoice
    template_name = 'invoice_pdf.html'

    def get_context_data(self, *args, **kwargs):
        context_data = super().get_context_data(*args, **kwargs)
        invoice = self.object
        context_data['company'] = Company.objects.first()
        context_data['items'] = invoice.invoice_items.all()
        context_data['client'] = invoice.client
        return context_data


class InvoicePDFView(WeasyTemplateResponseMixin, InvoiceDetailView):
    # show pdf in-line (default: True, show download dialog)
    pdf_attachment = False

    # Generate PDF filename from invoice Ids
    def get_pdf_filename(self):
        invoice_id = self.kwargs.get('pk')
        return f'invoice-{invoice_id}.pdf'


class InvoiceListView(ListView):
    queryset = Invoice.objects.all()
    template_name = 'invoices_list_pdf.html'

    def get_context_data(self, *args, **kwargs):
        context_data = super().get_context_data(*args, **kwargs)
        context_data['company'] = Company.objects.first()
        return context_data


class InvoiceListPDFView(WeasyTemplateResponseMixin, InvoiceListView):
    pdf_filename = 'invoices_list.pdf'
    pdf_attachment = False
