from rest_framework import generics

from .models import Company
from .serializers import CompanySerializer


class CompanyRetrieveUpdateApiView(generics.RetrieveUpdateAPIView):
    serializer_class = CompanySerializer

    def get_object(self, *args, **kwargs):
        return Company.objects.first()
