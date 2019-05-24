from django.views.generic import ListView
from django_weasyprint import WeasyTemplateResponseMixin

from .models import Item
from ..company.models import Company


class ItemListView(ListView):
    queryset = Item.objects.all()
    template_name = 'items_list_pdf.html'

    def get_context_data(self, *args, **kwargs):
        context_data = super().get_context_data(*args, **kwargs)
        context_data['company'] = Company.objects.first()
        return context_data


class ItemListPDFView(WeasyTemplateResponseMixin, ItemListView):
    pdf_filename = 'items_list.pdf'
    pdf_attachment = False
