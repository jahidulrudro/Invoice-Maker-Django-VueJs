from rest_framework import serializers

from .models import Company


class CompanySerializer(serializers.ModelSerializer):
    clear_logo = serializers.BooleanField(default=False, required=False)
    clear_small_logo = serializers.BooleanField(default=False, required=False)

    class Meta:
        model = Company
        fields = '__all__'

    def update(self, instance, validated_data):
        company = super().update(instance, validated_data)

        clear_logo = validated_data.get('clear_logo', False)
        logo = validated_data.get('logo')
        clear_small_logo = validated_data.get('clear_small_logo', False)
        small_logo = validated_data.get('small_logo')

        if clear_logo and not logo:
            company.logo = None
        if clear_small_logo and not small_logo:
            company.small_logo = None
        company.save()
        return company
