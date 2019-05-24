from django.urls import path

from .apiviews import CompanyRetrieveUpdateApiView

app_name = 'company'
urlpatterns = [
    path(
        '',
        CompanyRetrieveUpdateApiView.as_view(),
        name='company_retrieve_update',
    )
]
