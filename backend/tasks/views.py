from rest_framework import viewsets
from rest_framework.response import Response
from .models import Tasks
from .serializers import TasksSerializer


class TasksViewSet(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer

    def list(self, request):
        queryset = Tasks.objects.filter(deleted_at__isnull=True)
        serializer = TasksSerializer(queryset, many=True)
        return Response(serializer.data)