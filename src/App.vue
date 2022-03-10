<template>
  <q-layout view="lHr lpr lff">
    <q-header class="main_header row justify-center" elevated>
      <div class="col-12 col-sm-10 row justify-between block_main_header">
        <div class="logo" @click="ddd"></div>

        <q-tabs
          v-model="tab"
          class="gt-sm"
          style="color: #878382"
          active-color="orange-10"
          indicator-color="orange-10"
          active-class="active"
          stretch
        >
          <q-tab
            class="navigation"
            data-link="post"
            name="post"
            label="Режим работы"
          />
          <q-tab
            class="navigation"
            data-link="typeusluga"
            name="typeusluga"
            label="Услуги"
          />
          <q-tab
            class="navigation"
            data-link="otziv"
            name="otziv"
            label="Отзывы"
          />
          <q-tab
            class="navigation"
            data-link="sotrudnik"
            name="sotrudnik"
            label="Сотрудники"
          />
        </q-tabs>

        <div class="gamburger_menu lt-md" @click="showDrawer">
          <span class="gm1"></span><span class="gm2"></span
          ><span class="gm3"></span>
        </div>
      </div>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      side="right"
      bordered
      class="bg-grey-2"
      swipe-only
      :breakpoint="300"
      overlay
      behavior="desktop"
    >
      <q-list>
        <!-- <q-item-label header>Essential Links</q-item-label> -->

        <q-item clickable class="navigation" data-link="post" name="post">
          <q-item-section avatar>
            <q-icon name="phone_in_talk" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Режим работы</q-item-label>
            <q-item-label caption>Режим работы, контакты</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          class="navigation"
          data-link="typeusluga"
          name="typeusluga"
        >
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Услуги</q-item-label>
            <q-item-label caption>Услуги, прейскурант</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable class="navigation" data-link="otziv" name="otziv">
          <q-item-section avatar>
            <q-icon name="forum" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Отзывы</q-item-label>
            <q-item-label caption>Прочитать, оставить отзыв</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          class="navigation"
          data-link="sotrudnik"
          name="sotrudnik"
        >
          <q-item-section avatar>
            <q-icon name="group" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Сотрудники</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="row justify-center">
        <main-content @active_menu="act_menu" />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted } from 'vue'
import Content from './components/content.vue'

export default {
  name: 'LayoutDefault',

  components: {
    mainContent: Content,
  },

  setup() {
    const leftDrawerOpen = ref(false)

    const showDrawer = () => {
      leftDrawerOpen.value = true
    }
    const tab = ref('post')
    const act_menu = (x) => {
      console.log(`ddddd ${x}`)
      tab.value = x
      // document.querySelectorAll('.navigation').forEach((elem) => {
      //   if (elem.classList.contains('active')) {
      //     elem.classList.remove('active')
      //   }
      //console.log(elem)
      //})
    }
    onMounted(() => {
      document.querySelectorAll('.navigation').forEach((link) => {
        link.addEventListener('click', () => {
          //console.log(link)
          let id = link.dataset.link
          let otstupTop = document.getElementById(id).offsetTop - 60
          window.scrollTo({
            top: otstupTop,
            behavior: 'smooth',
          })
          leftDrawerOpen.value = false
        })
      })
    })
    return {
      leftDrawerOpen,
      showDrawer,
      tab,
      act_menu,
    }
  },

  // mounted() {
  //   document.querySelectorAll('.wrap-post-type').forEach((elem) => {
  //     console.log(elem)
  //   })
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           console.log('hhhhh')
  //           //console.log(entry.target.dataset.type)
  //           // context.emit('active_menu', entry.target.dataset.type)
  //         }
  //       })
  //     },
  //     { threshold: 0.7 }
  //   )

  //   document.querySelectorAll('.wrap-post-type').forEach((fff) => {
  //     observer.observe(fff)
  //   })

  //   // const observer = new IntersectionObserver((entries) => {
  //   //   // перебор записей
  //   //   entries.forEach((entry) => {
  //   //     const post_type = entry.target.querySelector('.post-type')
  //   //     // если элемент появился
  //   //     if (entry.isIntersecting) {
  //   //       // добавить ему CSS-класс
  //   //       post_type.classList.add('post-type-animation')
  //   //       return
  //   //     }
  //   //     // post_type.classList.remove('post-type-animation')
  //   //   })
  //   // })
  //   // observer.observe(document.querySelector('.wrap-post-type'))
  // },
}
</script>

<style>
body {
  overflow-y: scroll;
}
.main_header {
  background-color: #fcf3d6 !important;
  color: #000 !important;
  height: 60px;
  border: 0px solid red;
}
.block_main_header {
  border: 0px solid red;
  background-color: #fcf3d6;
}
.gamburger_menu {
  position: relative;
  border: 0px solid red;
  margin: 5px 20px;
  height: 50px;
  width: 50px;
  border-radius: 50px;
  cursor: pointer;
}
.gamburger_menu:hover {
  background-color: #ec602b17;
}
.gm1 {
  display: block;
  width: 30px;
  height: 3px;
  background-color: #ec602b;
  margin: 14px 10px 0px 10px;
}
.gm2 {
  display: block;
  width: 30px;
  height: 3px;
  background-color: #ec602b;
  margin: 6px 10px 0px 10px;
}
.gm3 {
  display: block;
  width: 30px;
  height: 3px;
  background-color: #ec602b;
  margin: 6px 10px 0px 10px;
}
.logo {
  height: 60px;
  border: 0px solid #ec602b;
  width: 300px;
  background-image: url('~@/assets/img/logo.png');
  background-repeat: no-repeat;
  background-size: contain;
}
.q-tab__indicator {
  height: 3px !important;
}
</style>
