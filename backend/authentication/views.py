from django.views.generic import ListView
from django_weasyprint import WeasyTemplateResponseMixin
from django.contrib.auth import get_user_model

from ..company.models import Company


class UserListView(ListView):
    queryset = get_user_model().objects.all()
    template_name = 'users_list_pdf.html'

    def get_context_data(self, *args, **kwargs):
        context_data = super().get_context_data(*args, **kwargs)
        context_data['company'] = Company.objects.first()
        return context_data


class UserListPDFView(WeasyTemplateResponseMixin, UserListView):
    pdf_filename = 'users_list.pdf'
    pdf_attachment = False
