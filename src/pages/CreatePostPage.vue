<template>
  <q-page-container>
    <div class="create-post">
      <div class="container">
        <div :class="{ invisible: !error }" class="err-message">
          <!-- <p><span>Error:</span>{{ errorMsg }}</p> -->
        </div>
        <div class="blog-info">
          <input type="text" placeholder="Enter Blog title" v-model="blogTitle" />
          <div class="upload-file">
            <label for="blog-photo">Upload Cover Photo</label>
            <input
              @change="fileChange"
              type="file"
              ref="blogPhoto"
              id="blog-photo"
              accept=".png, .jpg, .jpeg"
            />

            <q-btn
              class="preview q-mr-md"
              :class="{ 'button-inactive': !store.state.blogPhotoFileURL }"
              label="Preview Photo"
              color="dark"
              @click="icon = true"
            />

            <q-dialog v-model="icon" class="modal">
              <q-card class="modal-content">
                <q-card-section class="row items-center q-pb-none">
                  <div class="text-h6">Cover Photo Preview</div>
                  <q-space />
                  <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section>
                  <img :src="blogCoverPhoto" alt="" />
                </q-card-section>
              </q-card>
            </q-dialog>
            <span>File Chosen: {{ store.state.blogPhotoName }}</span>
          </div>
        </div>
        <div class="editor">
          <QuillEditor
            :options="editorSettings"
            v-model:content="blogHTML"
            contentType="html"
            useCustomImageHandler
            @imageAdded="imageHandler"
            toolbar="full"
            placeholder="Write Something..."
          />
        </div>
        <div class="blog-actions">
          <button @click="uploadBlog">Publish Blog</button>
          <router-link class="router-button" :to="{ name: 'BlogPreview' }"
            >Post Preview</router-link
          >

          <q-dialog v-model="modalFailed">
            <q-card style="width: 300px">
              <q-card-section>
                <div class="text-h6">Error</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div v-if="error" class="error q-mt-md">{{ errorMsg }}</div>
              </q-card-section>

              <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="OK" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
  </q-page-container>
</template>

<script>
import { computed, ref, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import Quill from 'quill';
import ImageResize from 'quill-image-resize';
Quill.register('modules/imageResize', ImageResize);

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import db from '../firebase/firebaseInit';
import { useRouter } from 'vue-router';

import { useQuasar } from 'quasar';

export default {
  name: 'CreatePostPage.vue',
  components: { QuillEditor },
  data() {
    return {
      editorSettings: {
        modules: {
          imageResize: {
            modules: ['Resize'],
          },
        },
      },
    };
  },
  setup() {
    const $q = useQuasar();
    let timer;
    const error = ref(null);
    const errorMsg = ref(null);
    const file = ref(null);
    const store = useStore();
    const blogPhoto = ref(null);
    const router = useRouter();
    const modalFailed = ref(null);

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });

    const profileId = computed(() => {
      return store.state.profileId;
    });

    const blogCoverPhotoName = computed(() => {
      return store.state.blogPhotoName;
    });

    const blogTitle = computed({
      get() {
        return store.state.blogTitle;
      },
      set(payload) {
        store.commit('updateBlogTitle', payload);
      },
    });
    const blogHTML = computed({
      get() {
        return store.state.blogHTML;
      },
      set(payload) {
        store.commit('newBlogPost', payload);
      },
    });

    function fileChange() {
      file.value = blogPhoto.value.files[0];
      const fileName = file.value.name;

      store.commit('fileNameChange', fileName);
      store.commit('createFileURL', URL.createObjectURL(file.value));
    }

    const blogCoverPhoto = computed(() => {
      return store.state.blogPhotoFileURL;
    });

    function imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/blogPostPhotos/${file.value.name}`);
      docRef.put(file.value).on(
        'state_changed',
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          Editor.insertEmbed(cursorLocation, 'image', downloadURL);
          resetUploader();
        }
      );
    }

    function uploadBlog() {
      if (blogTitle.value.length !== 0 && blogHTML.value.length !== 0) {
        if (file.value) {
          $q.loading.show({
            message: 'Processing Please Wait....',
          });

          timer = setTimeout(() => {
            $q.loading.hide();
            timer = void 0;
          }, 5000);

          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(
            `documents/BlogCoverPhotos/${store.state.blogPhotoName}`
          );
          docRef.put(file.value).on(
            'state_changed',
            (snapshot) => {
              console.log(snapshot);
            },
            (err) => {
              console.log(err);
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL();
              const timestamp = await Date.now();
              const dataBase = await db.collection('blogPost').doc();

              await dataBase.set({
                blogID: dataBase.id,
                blogHTML: blogHTML.value,
                blogCoverPhoto: downloadURL,
                blogCoverPhotoName: blogCoverPhotoName.value,
                blogTitle: blogTitle.value,
                profileId: profileId.value,
                date: timestamp,
              });
              await store.dispatch('getPost');
              router.push({ name: 'ViewBlogPage', params: { blogid: dataBase.id } });
            }
          );
          return;
        }
        error.value = true;
        modalFailed.value = true;
        errorMsg.value = 'Please ensure you upload a cover photo first!';

        return;
      }
      error.value = true;
      modalFailed.value = true;
      errorMsg.value = 'Please ensure that Blog Title and Blog Post has been filled!';

      return;
    }

    return {
      error,
      errorMsg,
      store,
      profileId,
      blogCoverPhotoName,
      blogTitle,
      blogHTML,
      fileChange,
      file,
      blogPhoto,
      icon: ref(false),
      blogCoverPhoto,
      imageHandler,
      uploadBlog,
      modalFailed,
    };
  },
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 12px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
    border: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  .invisible {
    opacity: 0 !important;
  }

  .err-messsage {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-top: 20px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}

.modal {
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .modal-content {
    justify-content: center;
    position: relative;
    border-radius: 12px;
    background-color: #fff;
    padding: 50px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);

    img {
      margin-top: 16px;
      display: block;
      width: auto;
      height: 100%;
      width: 100%;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
