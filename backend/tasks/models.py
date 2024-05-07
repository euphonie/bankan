from django.db import models
from users.models import Users
from status.models import Status
from django.utils import timezone


class Tasks(models.Model):
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(null=True, blank=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    owner = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='tasks_created')
    assigned_to = models.ForeignKey(Users,
                                    on_delete=models.CASCADE,
                                    related_name='tasks_assigned',
                                    blank=True,
                                    null=True)


    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super(Tasks, self).save(*args, **kwargs)