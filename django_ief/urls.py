from django.urls import path

from .views import IEFTextHandler, IEFImageHandler

urlpatterns = [
    path('text/<str:app>/<str:model>/<str:field>/<int:pk>/', IEFTextHandler.as_view(), name="inline_editable_field_text"),
    path('image/<str:app>/<str:model>/<str:field>/<int:pk>/', IEFImageHandler.as_view(), name="inline_editable_field_image"),
]
