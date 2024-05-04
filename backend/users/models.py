from django.db import models
from roles.models import Roles


class Users(models.Model):
    email = models.CharField(max_length=100)
    role = models.ForeignKey(Roles, on_delete=models.CASCADE)
