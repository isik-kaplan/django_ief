import os.path
import uuid

from django.apps import apps
from django.core.files.base import ContentFile
from django.http import HttpResponse
from django.http import HttpResponseNotAllowed
from django.views.generic import View


class IEFTextHandler(View):

    def post(self, request, app, model, field, pk):
        model = apps.get_model(app, model)
        if getattr(model, field).can_edit(request):
            obj = model.objects.get(pk=pk)
            setattr(obj, '{}_text'.format(field), request.read().decode())
            obj.save()
            return HttpResponse()
        else:
            raise HttpResponseNotAllowed


class IEFImageHandler(View):

    def post(self, request, app, model, field, pk):
        model = apps.get_model(app, model)
        if getattr(model, field).can_edit(request):
            img = ContentFile(request.body)
            image_obj = model.image_model(owner_id=pk)
            field_upload_to = getattr(model, field).image_field_kwargs.get('upload_to', '')
            image_upload_path = os.path.join(field_upload_to, "file:{}.jpg".format(uuid.uuid4()))

            image_obj.image.save(image_upload_path, img)
            image_obj.save()
            return HttpResponse(image_obj.image.url)
        else:
            raise HttpResponseNotAllowed
