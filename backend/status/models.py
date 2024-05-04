from django.db import models

TYPES = (("REGULAR", "REGULAR"), ("INITIAL", "INITIAL"), ("FINAL", "FINAL"))


class Status(models.Model):
    description = models.CharField(max_length=50)
    color = models.CharField(max_length=25)
    status_type = models.CharField(max_length=10,
                                   choices=TYPES,
                                   default="REGULAR")
