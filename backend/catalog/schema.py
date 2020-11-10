from functools import reduce

import django_filters
import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from catalog.models import Course, Section


class CourseType(DjangoObjectType):
    class Meta:
        model = Course
        filter_fields = '__all__'
        interfaces = (graphene.Node, )


class CourseFilter(django_filters.FilterSet):
    class PlaylistFilter(django_filters.UUIDFilter, django_filters.BaseInFilter):
        pass

    has_grades = django_filters.BooleanFilter(method='filter_has_grades')
    # overrides Course.has_enrollment. TODO: Remove Course.has_enrollment soon
    has_enrollment = django_filters.BooleanFilter(method='filter_has_enrollment')

    in_playlists = PlaylistFilter(method='filter_in_playlists')
    
    def filter_has_grades(self, queryset, name, value):
        return queryset.exclude(grade__isnull=value)

    def filter_has_enrollment(self, queryset, name, value):
        return queryset.exclude(section__isnull=value)
    
    def filter_in_playlists(self, queryset, name, value):
        categories = Playlist.objects.filter(id__in=value).distinct('category').values_list('category', flat=True)
        all_reduce = [queryset]
        for category in categories: 
            playlists = Playlist.objects.filter(id__in=filter_ids, category=category)
            intersected = [category.courses.all() for playlist in playlists]
            if category in ('university', 'ls', 'engineering', 'haas'):
                all_reduce.append(reduce(lambda x, y: x & y, intersected))
            else:
                all_reduce.append(reduce(lambda x, y: x | y, intersected))
        return reduce(lambda  x, y: x & y, all_reduce).distinct()

    class Meta:
        model = Course
        fields = '__all__'


class SectionType(DjangoObjectType):
    class Meta:
        model = Section
        filter_fields = '__all__'
        interfaces = (graphene.Node, )

    @property
    def qs(self):
        return super().qs.filter(disabled=False)


class SectionFilter(django_filters.FilterSet):
    class Meta:
        model = Section
        fields = '__all__'


class Query(graphene.ObjectType):
    course = graphene.Node.Field(CourseType)
    all_courses = DjangoFilterConnectionField(CourseType, filterset_class=CourseFilter)

    section = graphene.Node.Field(SectionType)
    all_sections = DjangoFilterConnectionField(SectionType, filterset_class=SectionFilter)
