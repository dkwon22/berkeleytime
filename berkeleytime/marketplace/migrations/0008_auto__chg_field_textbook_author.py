# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):

        # Changing field 'Textbook.author'
        db.alter_column(u'marketplace_textbook', 'author', self.gf('django.db.models.fields.CharField')(max_length=300, null=True))

    def backwards(self, orm):

        # Changing field 'Textbook.author'
        db.alter_column(u'marketplace_textbook', 'author', self.gf('django.db.models.fields.CharField')(max_length=80, null=True))

    models = {
        u'marketplace.textbook': {
            'Meta': {'object_name': 'Textbook'},
            'amazon_affiliate_url': ('django.db.models.fields.URLField', [], {'max_length': '2000', 'null': 'True'}),
            'amazon_image_height': ('django.db.models.fields.IntegerField', [], {'null': 'True'}),
            'amazon_image_url': ('django.db.models.fields.URLField', [], {'max_length': '2000', 'null': 'True'}),
            'amazon_image_width': ('django.db.models.fields.IntegerField', [], {'null': 'True'}),
            'amazon_price': ('django.db.models.fields.DecimalField', [], {'null': 'True', 'max_digits': '7', 'decimal_places': '2'}),
            'author': ('django.db.models.fields.CharField', [], {'max_length': '300', 'null': 'True'}),
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'edition': ('django.db.models.fields.CharField', [], {'max_length': '100', 'null': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_required': ('django.db.models.fields.BooleanField', [], {}),
            'isbn': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30', 'db_index': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '500'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        }
    }

    complete_apps = ['marketplace']