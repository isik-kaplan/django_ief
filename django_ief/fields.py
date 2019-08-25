from django.db import models
from django.template.loader import render_to_string


class InlineEditableField:

    def __init__(self, can_edit, image_field_kwargs=None, text_field_kwargs=None):
        self.image_field_kwargs = image_field_kwargs or {}
        self.text_field_kwargs = text_field_kwargs or {}

        if not callable(can_edit):
            raise TypeError(
                'The can_edit parameter needs to be a function that takes one parameter, the current request.'
            )

        self.can_edit = can_edit

    def __get__(self, instance, owner):
        if instance:
            self.obj_pk = instance.pk
            self.obj = instance
        return self

    def contribute_to_class(self, cls, name):
        self.model = cls.__name__
        self.app = cls._meta.app_label
        self.name = name

        if not getattr(cls, '_has_image_model', False):
            model = type(
                "{}_Images".format(cls.__name__),
                (models.Model,),
                {
                    "__module__": cls.__module__,
                    "owner": models.ForeignKey(cls, on_delete=models.CASCADE),
                    "image": models.ImageField(**self.image_field_kwargs),

                }
            )
            cls.image_model = model
            cls._has_image_model = True
        else:
            model = cls.image_model

        setattr(cls, '{}_images'.format(name), model.objects.values_list("image", flat=True))
        setattr(cls, name, self)

        text_field = models.TextField(**self.text_field_kwargs)
        text_field.set_attributes_from_name('{}_text'.format(name))
        text_field.model = cls
        cls._meta.add_field(text_field)

        return model

    @property
    def rendered(self):
        context = {
            'field': self,
            'editor_selector': "{}-{}-{}".format(self.app, self.model, self.name),
            'field_content': getattr(self.obj, '{}_text'.format(self.name))
        }
        return render_to_string('editor.html', context=context)
