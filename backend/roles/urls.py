from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RolesViewSet

router = DefaultRouter()
router.register(r'', RolesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
