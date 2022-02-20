import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
let editorOption = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{
        'header': 1
      }, {
        'header': 2
      }],
      [{
        'list': 'ordered'
      }, {
        'list': 'bullet'
      }],
      [{
        'script': 'sub'
      }, {
        'script': 'super'
      }],
      [{
        'indent': '-1'
      }, {
        'indent': '+1'
      }],
      [{
        'direction': 'rtl'
      }],
      [{
        'size': ['small', false, 'large', 'huge']
      }],
      [{
        'color': []
      }, {
        'background': []
      }],
      [{
        'align': []
      }],
      ['clean'],
      ['link', 'image', 'video']
    ],
  }
}
Vue.use(VueQuillEditor, editorOption)