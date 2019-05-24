from django.urls import path

from .apiviews import ClientListApiView, ClientRetrieveUpdateDestroyApiView
from .views import ClientListPDFView

app_name = 'clients'
urlpatterns = [
    path(
        '',
        ClientListApiView.as_view(),
        name='clients_list',
    ),
    path('pdf/', ClientListPDFView.as_view(), name='clients_list_pdf'),
    path(
        '<pk>/',
        ClientRetrieveUpdateDestroyApiView.as_view(),
        name='clients_retrieve_update_destroy',
    ),
]
