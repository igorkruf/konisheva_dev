<template>
  <div>
    <div v-if="posts == null" class="q-spinner">
      <q-spinner color="#000" size="3em" />
    </div>
    <div class="wrap_group_post blockposts" v-else>
      <div class="row" v-for="(post, index) in posts" :key="index">
        <q-card class="my-card col-12" flat square>
          <q-card-section horizontal v-if="index % 2">
            <q-card-section
              class="col-12 col-md-6 chetn"
              v-html="post.content"
            />
            <q-img class="col-md-6" :src="post.img" no-spinner />
          </q-card-section>
          <q-card-section horizontal v-else>
            <q-img class="col-md-6" :src="post.img" no-spinner />
            <q-card-section
              class="col-12 col-md-6 nechetn"
              v-html="post.content"
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- <div class="row justify-con" v-for="(post, index) in posts" :key="index">
      <div class="col-6">{{ post.title }}</div>
      <div class="col-6" v-html="post.content" />
    </div> -->
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import server from '@/assets/server.js'
export default {
  emits: ['loaded'],
  setup() {
    const posts = ref(null)
    server.get('myplugin/v1/post').then((response) => {
      posts.value = response.data
    })

    onMounted(() => {})

    return {
      posts,
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
.nechetn {
  color: #fcf3d6;
  background-color: #ec602b;
}
.chetn {
  color: #ec602b;
  background-color: #fcf3d6;
}
.q-spinner {
  text-align: center;
}
</style>