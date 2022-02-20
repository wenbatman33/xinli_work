<template lang="pug">
  textarea(:name="ckeditorName")
</template>

<script>
import { API_HOST } from '@/config/server';

export default {
  data() {
    return {
      instanceReady: false,
      init: false
    }
  },
  computed: {
    ckeditorName() {
      return `editor-${this._uid}`;
    }
  },
  props: ['value'],
  mounted() {
    const self = this;

    CKEDITOR.replace(self.ckeditorName, {
      extraPlugins: 'uploadimage',
      uploadUrl: API_HOST + 'ImagesUpload',
      filebrowserUploadUrl: API_HOST + 'ImagesUpload',
      on: {
        fileUploadRequest: function(evt) {
          let fileLoader = evt.data.fileLoader;
          let xhr = fileLoader.xhr;
          xhr.setRequestHeader(
            'Authorization',
            `Bearer ${window.localStorage.JWT_TOKEN}`
          );
          let formData = new FormData();
          formData.append('path', 'news');
          formData.append('images', fileLoader.file);
          xhr.send(formData);
          evt.stop();
        },
        change: function(evt) {
          self.$emit('input', evt.editor.getData());
        },
        instanceReady: function() {
          self.initComplete();
        }
      }
    });

    CKEDITOR.on('dialogDefinition', function(evt) {
      if (evt.data.name === 'table') {
        evt.data.definition.getContents('info').get('txtWidth')['default'] = '100%';
      }
    });
  },
  watch: {
    value(val) {
      if (! val) {
        CKEDITOR.instances[this.ckeditorName].setData('');
      }

      if (this.instanceReady && ! this.init) {
        if (this.value) {
          CKEDITOR.instances[this.ckeditorName].setData(this.value);
        }
        this.init = true;
      }
    }
  },
  methods: {
    initComplete() {
      this.instanceReady = true;
      if (this.value) {
        CKEDITOR.instances[this.ckeditorName].setData(this.value);
        this.init = true;
      }
    }
  }
}
</script>
