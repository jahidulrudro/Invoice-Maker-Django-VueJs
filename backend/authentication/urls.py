from django.urls import path

from .apiviews import UserListCreateApiView, UserRetrieveUpdateDestroyApiView
from .views import UserListPDFView

app_name = 'authentication'
urlpatterns = [
    path(
        '',
        UserListCreateApiView.as_view(),
        name='user_list_create',
    ),
    path(
        'pdf/',
        UserListPDFView.as_view(),
        name='users_list_pdf',
    ),
    path(
        '<username>/',
        UserRetrieveUpdateDestroyApiView.as_view(),
        name='user_retrieve_update_destroy',
    ),
]
