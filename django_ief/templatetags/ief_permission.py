from django import template

register = template.Library()


@register.simple_tag
def can_edit(field, request):
    return field.can_edit(request) and "true" or "false"
