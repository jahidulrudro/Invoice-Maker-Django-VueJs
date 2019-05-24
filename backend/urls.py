"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token

from .api.views import index_view

urlpatterns = [
    # http://localhost:8000/
    path('', index_view, name='index'),

    # Token based authentication
    path('api/auth/', obtain_auth_token),

    # http://localhost:8000/api/<route>
    path('api/company/', include('backend.company.urls')),
    path('api/clients/', include('backend.clients.urls')),
    path('api/home/', include('backend.api.urls')),
    path('api/invoices/', include('backend.invoices.urls')),
    path('api/items/', include('backend.items.urls')),
    path('api/users/', include('backend.authentication.urls')),

    # http://localhost:8000/api/admin/
    path('api/admin/', admin.site.urls),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
