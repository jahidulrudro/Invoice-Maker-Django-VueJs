from django.urls import path

from .apiviews import HomePageAPIView

app_name = 'api'
urlpatterns = [
    path(
        '',
        HomePageAPIView.as_view(),
        name='home_page',
    ),
]
