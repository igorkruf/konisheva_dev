<template>
  <div
    class="wrap_group_type_usluga row justify-center items-stretch"
    v-if="type_usluga.length != 0"
  >
    <q-card
      class="typeusluga col-12 col-sm-5 col-md-3 column justify-between"
      v-for="(type_uslug, index) in type_usluga"
      :key="index"
      flat
    >
      <img :src="type_uslug.url_img" />
      <!-- <span class="hr"></span> -->
      <div>
        <div class="name_card">{{ type_uslug.name }}</div>
        <q-card-section>
          <div
            class="info_card"
            @click="
              showPopupPrimer1(type_uslug.name, type_uslug.id_type_usluga)
            "
          >
            <span>Прейскурант</span>
            <span>({{ type_uslug.count }} услуг)</span>
            <!-- <q-btn
            color="deep-orange"
            glossy
            :label="`Прайс(${type_uslug.count} услуг)`"
          /> -->
          </div>
        </q-card-section>
      </div>
      <popup-price
        v-if="PopupPrimerShow"
        @close="closePopupPrimer1()"
        :id_type_usluga="`${id_type}`"
      >
        <template v-slot:header>
          <div column justify-space-around>
            <div>
              <q-img
                v-for="mode in fitModes"
                :key="mode"
                src="@/assets/img/logo.png"
              />
            </div>
            <div>{{ title_popup }}</div>
          </div>
        </template>
      </popup-price>
    </q-card>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import server from '@/assets/server.js'
import popup from '@/components/popup/popup_price.vue'
export default {
  setup(props, context) {
    const type_usluga = ref([])
    server.get('myplugin/v1/type_usluga').then((response) => {
      response.data.forEach((element, i) => {
        setTimeout(() => {
          if (element.id_parent_type_usluga == 0) {
            type_usluga.value.push(element)
          }
        }, 0 * i)
      })
    })
    ///////////////////////////////////////////////////////////////////
    const title_popup = ref(null)
    const id_type = ref(null)
    const PopupPrimerShow = ref(false)
    const closePopupPrimer1 = () => {
      PopupPrimerShow.value = false
      console.log(PopupPrimerShow.value)
    }
    const showPopupPrimer1 = (title, id) => {
      console.log('показать попап')
      title_popup.value = title
      id_type.value = id
      PopupPrimerShow.value = true
      console.log(PopupPrimerShow.value)
    }
    const onIntersection = (entry) => {
      if (entry.isIntersecting === true) {
        console.log('typeusluga')
      }
    }

    onMounted(() => {
      console.log('1')
      context.emit('loadedtypeusluga')
    })

    //////////////////////////////////////////////////////////////
    return {
      type_usluga,

      closePopupPrimer1,
      showPopupPrimer1,
      PopupPrimerShow,
      title_popup,
      id_type,
      onIntersection,
    }
  },
  components: {
    popupPrice: popup,
  },

  //   async created() {
  //     let response = await server.get('myplugin/v1/post')
  //     this.posts = response.data
  //     // response.data.forEach((element, i) => {
  //     //   setTimeout(() => {
  //     //     if (element.title.rendered != '') {
  //     //       this.services.push(element);
  //     //     }
  //     //   }, 1000 * i);
  //     // });
  //   },
}
</script>
<style scoped>
.wrap_group_type_usluga {
  border: 0px solid red;
  background-color: #ec602b !important;
}
.tu {
  background-color: #ec602b;
}
.my-card {
  border: px solid green;
  /* background-color: #ec602b !important; */
}
.typeusluga {
  background-color: #ec602b !important;
  border: 0px solid black;
}
.hr {
  display: block;
  height: 3px;
  background-color: #fcf3d6;
  margin: 0px 80px;
}
.name_card {
  text-align: center;
  color: #fcf3d6;
  font-size: 20px;
  margin-bottom: 20px;
}
.info_card {
  text-align: center;
  color: #fcf3d6;
  border: 0px solid #fcf3d6;
  padding: 10px;
  background-color: #fcf3d633;
  border-radius: 5px;
}
.info_card:hover {
  background-color: #fcf3d68f;
  cursor: pointer;
}
/* @keyframes fade-out {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@media (prefers-reduced-motion: no-preference) {
  .visible {
    animation: fade-out 1s;
  }
} */
</style>