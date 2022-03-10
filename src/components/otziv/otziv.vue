<template>
  <div class="wrap_group_post" v-if="otzivs != null">
    <div class="tl_kovich"></div>
    <div class="br_kovich"></div>
    <q-carousel
      v-model="slide"
      vertical
      transition-prev="slide-down"
      transition-next="slide-up"
      swipeable
      animated
      control-color="green-9"
      padding
      arrows
      height="300px"
      style="background-color: #fcf3d6"
    >
      <q-carousel-slide
        class="column no-wrap"
        v-for="(otziv, index) in otzivs"
        :key="index"
        :name="index"
      >
        <div class="q-mt-md text-justify">
          <div v-html="otziv.post_content"></div>
          <div class="fio_otziv">{{ otziv.post_title }}</div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div @click="showPopupPrimer1()" class="add_otziv">
      <span>Оставить отзыв</span>
    </div>

    <popup-formaddotziv v-if="PopupPrimerShow" @close="closePopupPrimer1()">
      <template v-slot:header></template>
    </popup-formaddotziv>
  </div>
</template>
<script>
import { ref } from 'vue'
import server from '@/assets/server.js'
import popupFormaddotziv from '@/components/popup/popup_form_add_otziv.vue'
export default {
  setup() {
    const otzivs = ref(null)
    server.get('myplugin/v1/otziv').then((response) => {
      otzivs.value = response.data
    })

    const PopupPrimerShow = ref(false)
    const closePopupPrimer1 = () => {
      PopupPrimerShow.value = false
      console.log(PopupPrimerShow.value)
    }
    const showPopupPrimer1 = () => {
      console.log('показать попап')

      PopupPrimerShow.value = true
      console.log(PopupPrimerShow.value)
    }

    //////////////////////////////////////////////////////////////
    return {
      otzivs,
      //popup form_add_otziv
      PopupPrimerShow,
      closePopupPrimer1,
      showPopupPrimer1,
      slide: ref(0),
    }
  },
  components: {
    popupFormaddotziv,
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
.wrap_group_post {
  border: 0px solid red;
  position: relative;
  padding: 0px 50px 10px 50px;
  min-height: 150px;
  background-color: #fcf3d6;
}
.tl_kovich {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 50px;
  height: 50px;
  border: 0px solid red;
  background-image: url('~@/assets/img/kovichkizel.png');
  background-repeat: no-repeat;
  z-index: 1000;
  background-size: contain;
}
.br_kovich {
  position: absolute;
  bottom: 100px;
  right: 10px;
  width: 50px;
  height: 50px;
  border: 0px solid red;
  background-image: url('~@/assets/img/kovichkizel.png');
  background-repeat: no-repeat;
  z-index: 1000;
  background-size: contain;
}
.fio_otziv {
  text-align: right;
  color: #878382;
  margin-top: 20px;
}

.add_otziv {
  text-align: center;
  color: #517c13;
  border: 1px solid #fcf3d6;
  padding: 10px;
  background-color: #517c132b;
  border-radius: 5px;
  margin: 0px 20px 20px 20px;
}
.add_otziv:hover {
  background-color: #517c1354;
  cursor: pointer;
}
</style>