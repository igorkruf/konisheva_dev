<template>
  <transition name="pr" @after-leave="afterLeave">
    <div
      class="modal-backdrop"
      v-if="visible_modal_backdrop"
      @click.self="visible_modal = !visible_modal"
    >
      <transition
        name="pr1"
        appear
        @after-enter="afterEnter"
        @after-leave="afterLeave_modal"
      >
        <div class="modal" v-if="visible_modal">
          <div class="wrap_modal">
            <q-btn
              class="close_btn"
              round
              @click="visible_modal = !visible_modal"
              ><q-icon name="close"
            /></q-btn>

            <div class="modal-header column justify-around items-center">
              <q-img
                src="https://mystomat.neksk.ru/wp-content/uploads/2021/11/logo.png"
                style="width: 250px"
              ></q-img>

              <slot name="header"> </slot>
            </div>
            <q-separator />
            <div v-if="uploading_otziv" class="q-spiner">
              <q-spinner color="#000" size="3em" />
            </div>
            <div v-else-if="rezult_add_otziv == null" class="modal-body">
              <div class="q-pa-md">
                <div class="q-mt-md row">
                  <q-input
                    class="col-12 q-mt-md"
                    color="orange-10"
                    outlined
                    placeholder="Ваше имя"
                    v-model="name_otziv"
                    lazy-rules
                    :rules="[(v) => (v && v.length > 0) || 'Введите ваше имя']"
                    @update:model-value="proverka"
                    @change="proverka"
                  />
                  <q-input
                    class="col-12 text_otziv q-mt-md"
                    v-model="text_otziv"
                    color="orange-10"
                    outlined
                    placeholder="Ваш отзыв"
                    type="textarea"
                    autogrow
                    lazy-rules
                    :rules="[(v) => (v && v.length > 0) || 'Введите отзыв']"
                    @update:model-value="proverka"
                    @change="proverka"
                  />

                  <q-btn
                    color="orange-10"
                    class="full-width q-mt-lg q-pa-md"
                    label="Оставить отзыв"
                    v-if="canUpload"
                    @click="upload"
                  />
                </div>
              </div>
            </div>
            <div class="spsb_otziv" v-else>
              <span class="spsb_fio">{{ rezult_add_otziv }},</span>&nbsp;спасибо
              за отзыв. Мы оставляем за собой право не опубликовывать
              отрицательные отзывы. Но ни один отзыв не останется без внимания.
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import { ref } from 'vue'
import server from '@/assets/server.js'

export default {
  setup() {
    const visible_modal_backdrop = ref(true)
    const visible_modal = ref(true)
    const uploading_otziv = ref(false)
    const name_otziv = ref('')
    const text_otziv = ref('')
    const canUpload = ref(false)
    const rezult_add_otziv = ref(null)

    const upload = () => {
      uploading_otziv.value = true
      console.log('Отправили отзыв')

      server
        .post(
          `wp/v2/otziv?title=${name_otziv.value}&content=${text_otziv.value}`,
          {},
          {
            //здесь использую пароли приложений wordpress (в профиле пользователя mystomat )
            headers: {
              Authorization:
                'Basic ' + btoa('mystomat:2yQt 6zSz UFGu URTf AWI0 C29s'),
            },
          }
        )
        .then((response) => {
          uploading_otziv.value = false
          rezult_add_otziv.value = response.data.title.rendered
        })
    }

    const proverka = () => {
      if (name_otziv.value.length == 0) {
        canUpload.value = false
      } else {
        canUpload.value = text_otziv.value.length > 0 ? true : false
      }
    }
    // server.get('myplugin/v1/type_usluga').then((response) => {
    //   response.data.forEach((element, i) => {
    //     setTimeout(() => {
    //       if (element.id_parent_type_usluga == 0) {
    //         type_usluga.value.push(element)
    //       }
    //     }, 0 * i)
    //   })
    // })
    return {
      visible_modal_backdrop,
      visible_modal,
      uploading_otziv,
      name_otziv,
      text_otziv,
      proverka,
      canUpload,
      upload,
      rezult_add_otziv,
    }
  },
  data() {
    return {}
  },
  methods: {
    afterEnter() {
      //let ddd = document.querySelector('.modal');
      // ddd.style.top = '100px';
      console.log('hhh')
      document.body.style.overflow = 'hidden'
    },
    afterLeave_modal() {
      this.visible_modal_backdrop = !this.visible_modal_backdrop
    },
    afterLeave() {
      this.$emit('close')
      document.body.style.overflow = 'visible'
    },
  },
  mounted() {
    //console.log(this.$refs.mb);
    // let vm = this;
    // document.addEventListener('click', function (event) {
    //   if (event.target == vm.$refs.mb) {
    //     console.log('hh');
    //   }
    // });
  },
}
</script>
<style lang="scss" scoped>
.modal-backdrop {
  background-color: rgba(75, 75, 75, 0.89);
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2001;
}
.modal {
  display: block;
  //position:fixed;
  // top: 0px;
  background-color: #fff;
  //box-shadow: 0 0 17px 0 #e7e7e7;
  padding: 16px;
  width: 80vw;
  height: 100vh;
  overflow: scroll;
  z-index: 2002;
  left: calc(50vw - 450px);
  overflow: auto;
  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  &__content {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
}
.wrap_modal {
  border: 0px solid red;
  position: relative;
}
.close_btn {
  position: fixed !important;
  top: 40px;
  right: 40px;
  background-color: #fff !important;
}
.modal-header {
  font-size: 20px;

  padding: 20px;
  border: 0px solid green;
  height: 100px;
}
.modal-body {
  font-size: 14px;
  text-align: justify;
  padding: 20px;
}
.q-spiner {
  margin: 50px;
  text-align: center;
}
.text_otziv {
}
.spsb_otziv {
  margin: 50px;
  font-size: 16px;
  padding: 50px;
  color: rgb(88, 88, 88);
  text-align: justify;
}
.spsb_fio {
  font-size: 20px;
}
@media screen and (max-width: 800px) {
  .modal {
    width: 100vw;
  }
}
</style>
