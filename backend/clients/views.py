from django.views.generic import ListView
from django_weasyprint import WeasyTemplateResponseMixin

from .models import Client
from ..company.models import Company


class ClientListView(ListView):
    queryset = Client.objects.all()
    template_name = 'clients_list_pdf.html'

    def get_context_data(self, *args, **kwargs):
        context_data = super().get_context_data(*args, **kwargs)
        context_data['company'] = Company.objects.first()
        return context_data


class ClientListPDFView(WeasyTemplateResponseMixin, ClientListView):
    pdf_filename = 'clients_list.pdf'
    pdf_attachment = False
