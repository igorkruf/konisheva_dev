<template>
  <div v-if="sotrudniks != null" class="wrap_group_sotrudnik">
    <!-- <div class="wrap_group_sotrudnik" v-if="sotrudniks != null"> -->
    <div class="row justify-between">
      <q-card
        class="card_sotrudnik col-12 col-sm-5 col-md-3 column justify-between"
        flat
        v-for="(sotrudnik, index) in sotrudniks"
        :key="index"
      >
        <q-img :src="sotrudnik.img_sotrudnik" />
        <div class="info_sotrudnik">
          <q-separator />
          <div class="fio_sotrudnik">{{ sotrudnik.fio_sotrudnik }}</div>
          <div class="podrobno_sotrudnik">
            {{ sotrudnik.podrobno_sotrudnik }}
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import server from '@/assets/server.js'
export default {
  setup() {
    const sotrudniks = ref(null)
    server.get('myplugin/v1/sotrudnik').then((response) => {
      sotrudniks.value = response.data
    })
    const onIntersection = (entry) => {
      if (entry.isIntersecting === true) {
        console.log('sotrudniki')
      }
    }
    onMounted(() => {
      console.log('4')
    })
    return {
      sotrudniks,
      onIntersection,
    }
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
  padding: 50px;
}

.card_sotrudnik {
  border: 0px solid green;
  background-color: #fff0;
}
.sps {
  margin: 10px 50px 50px 50px;
}
.wrap_group_sotrudnik {
  background-color: #ec602b;
  padding: 50px;
  margin-bottom: 20px;
}
.info_sotrudnik {
  padding: 20px;
}
.fio_sotrudnik {
  font-size: 14px;
  padding: 10px 0px 10px 0px;
  color: #fff;
}
.podrobno_sotrudnik {
  font-size: 12px;
  color: #fff;
  padding-bottom: 10px;
}
@keyframes fade-out {
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
}
</style>