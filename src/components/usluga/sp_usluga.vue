<template>
  <div class="wrap_group_usluga">
    <div class="row" v-for="(usluga, index) in uslugas" :key="index">
      <q-card class="my-card col-12" flat>
        <q-card-section>
          <q-img class="col-6" :src="post.img" />
          <q-card-section class="col-6" v-html="post.content" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import server from '@/assets/server.js'
export default {
  setup() {
    const uslugas = ref(null)
    server.get('myplugin/v1/usluga').then((response) => {
      uslugas.value = response.data
    })

    return {
      uslugas,
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
<style>
.wrap_group_post {
  border: 0px solid red;
}
.my-card {
  border: 0px solid green;
}
</style>