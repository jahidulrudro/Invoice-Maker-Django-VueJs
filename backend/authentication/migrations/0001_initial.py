# Generated by Django 2.1.5 on 2019-02-02 09:38

from django.db import migrations
from django.contrib.auth import get_user_model


def create_default_user(apps, schema_editor):
    User = get_user_model()
    if User.objects.filter(username='admin').exists() is False:
        user = User.objects.create(
            username='admin',
            first_name='Admin',
            last_name='User',
            email='admin@admin.com',
            is_active=True,
            is_staff=True,
            is_superuser=True)
        user.set_password('admin')
        user.save()


class Migration(migrations.Migration):

    dependencies = [('authtoken', '0002_auto_20160226_1747')]

    operations = [
        migrations.RunPython(create_default_user),
    ]
