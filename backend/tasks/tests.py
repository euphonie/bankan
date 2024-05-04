from rest_framework.test import APITestCase
from django.urls import reverse
from django.utils import timezone
from users.models import Users
from status.models import Status
from rest_framework import status as rest_status

class TasksAPITests(APITestCase):
    fixtures = ['tasks/fixtures/initial_data.json']

    def setUp(self):
        self.user = Users.objects.filter(email='on@bankan.com').first()
        
    def test_create_and_read_task(self):
        self.on_hold_status = Status.objects.get(description='On Hold')
        new_task = {
            'title': 'Task 1',
            'status': self.on_hold_status.id,
            'created_at': timezone.now(),
            'assigned_to': self.user.id,
            'owner': self.user.id
        }
        created_response = self.client.post(reverse('tasks-list'), new_task, format='json')
        self.assertEqual(created_response.status_code, rest_status.HTTP_201_CREATED)
        response = self.client.get(reverse('tasks-list'), format='json')
        json_response = response.json()[0]
        self.assertEqual(json_response['title'], new_task['title'])
        self.assertEqual(json_response['status'], self.on_hold_status.id)
        self.assertEqual(json_response['owner'], self.user.id)


