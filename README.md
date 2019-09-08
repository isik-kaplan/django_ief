[![Build Status](https://travis-ci.org/isik-kaplan/django_ief.svg?branch=master)](https://travis-ci.org/isik-kaplan/django_ief)
[![PyPI - License](https://img.shields.io/pypi/l/django-ief.svg)](https://pypi.org/project/django-ief/)
[![PyPI - Downloads](https://img.shields.io/pypi/dm/django-ief.svg)](https://pypi.org/project/django-ief/)
 
## What is *django_ief*?

It is a field for django database models which you don't need any extra forms to edit nor save.

## How to use it?

First, install the application and add the urls.

```python 
# settings.py 

installed_apps = [
    ...,
    'django_ief',
    ...,
]

# urls.py

urlpatterns = [
    path('', include('django_ief.urls')),
    # others
]

```

Then just use it as a field.

```python 
from django.db import models
from django_ief.fields import InlineEditableField

def permission_function(request):
    return get_perm_from_request(request)

class BlogPost(models.Model):
    content = InlineEditableField(
        can_edit=permission_function,
        text_field_kwargs={**kwargs_for_text_field},
        image_field_kwargs={**kwargs_for_image_field}
    )
```

The above creates an additional model to hold its images which looks like this:

```python 
class BlogPost_Images(models.Model):
    owner = models.ForeignKey(BlogPost, on_delete=models.CASCADE)
    image = models.ImageField(**kwargs_for_image_field)
```
which you can access with
```python 
BlogPost.image_model
```

and creates a text field in the original model which looks like: 

```python 
class BlogPost(models.Model):
    content = InlineEditableField(...)
    content_text = models.TextField(**kwargs_for_text_field)
```

If you want you may interact with those underlying fields and models but you don't need to,
all you need to do is to use one attribute of the `InlineEditableField` in your templates, `rendered`. 

```html 
<!-- you need to add the actual editor static for it to work --> 
<script src="{% static 'django_ief/ckeditor.js' %}"></script> 
<!-- it is just a single file, you now can use any number of fields with the .rendered attribute on the page -->
    
{{ obj.content.rendered }}
```
And that's it, everything else is automatically taken care of.
