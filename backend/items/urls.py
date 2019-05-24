from django.urls import path

from .apiviews import ItemListCreateApiView, ItemRetrieveUpdateDestroyApiView
from .views import ItemListPDFView

app_name = 'items'
urlpatterns = [
    path(
        '',
        ItemListCreateApiView.as_view(),
        name='items_list_create',
    ),
    path(
        'pdf/',
        ItemListPDFView.as_view(),
        name='items_list_pdf',
    ),
    path(
        '<pk>/',
        ItemRetrieveUpdateDestroyApiView.as_view(),
        name='items_retrieve_update_destroy',
    ),
]
