from setuptools import setup

with open('README.md') as f:
    long_description = f.read()

setup(
    name='django_ief',
    version='0.1.2',
    packages=['django_ief', 'django_ief.templatetags'],
    include_package_data=True,
    url='https://github.com/isik-kaplan/django_ief',
    description="A model field that can be edited without needing a form.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    license='APGL-3.0',
    author='isik-kaplan',
    author_email='',
    python_requires=">=3.5",
    install_requires=['django>=2.0']
)
