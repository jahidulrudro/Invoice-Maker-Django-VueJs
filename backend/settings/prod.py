""" Production Settings """

import os

from .dev import *

############
# DATABASE #
############
DATABASES = {
    'default': {
        'NAME': 'invoisu$invoisu',
        'HOST': 'invoisu.mysql.pythonanywhere-services.com',
        'ENGINE': 'django.db.backends.mysql',
        'USER': 'invoisu',
        'PASSWORD': 'roommatebd',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
        }
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }

############
# SECURITY #
############

DEBUG = bool(os.getenv('DJANGO_DEBUG', ''))

# Set to your Domain here (eg. 'django-vue-template-demo.herokuapp.com')
ALLOWED_HOSTS = ['*']

##################
# REST Framework #
##################
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES':
    ('rest_framework.permissions.IsAuthenticated', ),
    'DEFAULT_AUTHENTICATION_CLASSES':
    ('rest_framework.authentication.TokenAuthentication', ),
    'DEFAULT_RENDERER_CLASSES': ('rest_framework.renderers.JSONRenderer', ),
}
