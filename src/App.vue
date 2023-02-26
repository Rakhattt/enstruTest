<template>
  <div id="app">
    <div :class="{ 'bg-dark': sidebar }">
      <div class="container">
        <Header />

        <router-view/>

        <h1 class="title">Заявки</h1>

        <div class="flex w-75">
          <div class="add-application-wrap">
            <Plus />
            <button class="add-application" @click="addApp">Новая заявка</button>
          </div>

          <div class="flex">
            <div class="icon-wrapper" style="margin-right: 8px">
              <Move />
            </div>
            <div class="icon-wrapper" @click="dropShow = !dropShow">
              <Fill />
            </div>

            <transition name="slide">
              <div class="drop-wraper" v-if="dropShow">
                <div class="drop-wraper-inner">
                  <Profile />
                  <div class="sub-text">Профиль</div>
                </div>
                <div class="drop-wraper-inner bt bb " @click="sidebar = !sidebar">
                  <Message />
                  <div class="sub-text">Обратная свзяь</div>
                </div>
                <div class="drop-wraper-inner">
                  <Exit/>
                  <div class="sub-text">Выход</div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <div class="card w-75" v-for="app of applications" :key="app.id">
          <div class="status"></div>

          <div class="flex mb-14">
            <div class="flex">
              <CheckUndefined style="margin-right: 9px;"/>
              <div class="card-title">{{ app.title }}</div>
            </div>
            <div class="flex">
              <div class="card-subtitle">В ожидании коллегии</div>
              <div class="dots">
                <div class="dot"></div>
                <div class="dot" style="margin: 0 3px"></div>
                <div class="dot"></div>
              </div>
            </div>
          </div>

          <div class="flex w-35 mb-14">
            <div class="flex-direction">
              <div class="label">Код</div>
              <div class="code">{{ app.code }}</div>
            </div>
            <div class="flex-direction">
              <div class="label">Код</div>
              <div class="text">{{ app.type }}</div>
            </div>
          </div>

          <div class="flex-direction mb-14">
            <div class="label">Характеристика</div>
            <div class="text">{{ app.characteristic }}</div>
          </div>

          <router-link :to="app.link" class="text border-line" style="display: block">Подробная информация</router-link>
        </div>

      </div>
    </div>

    <transition name="slide-sidebar">
      <Sidebar v-if="sidebar" @sidebarToogle="sidebar = !sidebar" />
    </transition>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Header from '@/components/Header.vue'
  import Plus from "@/assets/Plus.vue"
  import Move from "@/assets/Move.vue"
  import Fill from "@/assets/Fill.vue"
  import CheckUndefined from "@/assets/CheckUndefined.vue"
  import Profile from "@/assets/Profile.vue"
  import Message from "@/assets/Message.vue"
  import Exit from "@/assets/Exit.vue"
  import Download from "@/assets/Download.vue"
  import Sidebar from "@/components/Sidebar.vue"

  export default {
    name: 'App',
    data () {
      return {
        dropShow: false,
        sidebar: false,
        applicationsInfo: [
          {
            id: Math.random(),
            title: "Потоковая передача видеоданных",
            code: "271141.700.000041",
            type: "Товар",
            characteristic: "Услуги по передаче данных — Потоковая передача видеоданных Характеристика — организация защищенного выделенного канала передачи видеоданных, работающий на базе протокола IP, для подключения удаленных видеокамер клиента к центральной точке клиента.",
            link: "/"
          },
        ],
        applications: [],
      }
    },
    components: {
       Header,Plus,Move,Fill,CheckUndefined,Profile,Message,Exit,Download,Sidebar
    },
    methods: {
      addApp: function () {
          this.applications.push(...this.applicationsInfo)
      },
    },
  }
</script>

<style lang="scss">
  body {
    margin: 0;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
  .container {
    width: 80%;
    margin: 0 auto;
    position: relative;
  }

  .title {
    color: #252525;
    text-align: left;
    margin: 44px 0;
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .add-application {
    font-size: 1rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    color: #fff;
    background-color: #0051AD;
    border: 1px solid transparent;
    cursor: pointer;
  }
  .add-application-wrap {
    display: inline-flex;
    align-items: center;
    background-color: #0051AD;
    border-radius: 4px;
    padding: 8px 24px 8px 12px;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    cursor: pointer;
  }

  .icon-wrapper {
    padding: 12px;
    border: 1px solid #7893B0;
    border-radius: 4px;
    cursor: pointer;
  }

  .card {
    background: #FAFCFE;
    border: 1px solid #7893B0;
    border-radius: 12px;
    padding: 16px;
    margin-top: 20px;
    position: relative;
    .status {
      position: absolute;
      background-color: #0051AD;
      height: 30px;
      width: 4px;
      left: 0;
    }
  }
  .card-title {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: #252525;
  }
  .dots {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 8px;
    cursor: pointer;
    .dot {
      width: 3px;
      height: 3px;
      background-color: #7893B0;
      border-radius: 100%;
    }
  }

  .flex-direction {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .w-35 {
    width: 35%;
  }
  .mb-14 {
    margin-bottom: 14px;
  }
  .label {
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #425F80;
  }
  .code {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.4px;
    color: #0184FF;
  }
  .text {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.4px;
    color: #252525;
    text-align: left;
  }
  .border-line {
    text-decoration: underline;
  }
  .sub-text {
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #252525;
    margin-left: 10px;
  }
  .drop-wraper {
    position: absolute;
    background: #fff;
    box-shadow: 0px 4px 12px rgba(30, 33, 34, 0.1);
    border-radius: 4px;
    top: 40px;
    right: 150px;
    :hover {
      background-color: #E2EBF3;
    }
    .drop-wraper-inner {
      display: flex;
      align-items: center;
      padding: 13px 15px;
      cursor: pointer;
    }
  }

  .bt {
    border-top: 1px solid #E2EBF3;
  }
  .bb {
    border-bottom: 1px solid #E2EBF3;
  }

  .w-75 {
    width: 75%;
  }

  .sidebar {
    width: 380px;
    min-width: 380px;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    margin: 0;
    right: 0px;
    transition: left 0.3s;
    background: #E2EBF3;
    z-index: 2000;
    border-radius: 8px;
  }

  .close{
    position: absolute;
    top: 15px;
    right: 15px;
    width: 35px;
    height: 35px;
    cursor: pointer;
    background-color: #0051AD;
    border-radius: 4px;

  }

  .close:before,
  .close:after {
    content: "";
    position: absolute;
    top: 15px;
    left: 8px;
    width: 20px;
    height: 3px;
    background: #fff;
  }

  .close:before {
    webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .close:after {
    webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .sidebar-title {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -0.4px;
    color: #0E0F0F;
  }
  .sidebar-wrap {
    padding: 16px;
  }
  .sidebar-wrapper {
    padding: 16px;
  }

  .input {
    padding: 21px 12px;
    background: #FFFFFF;
    border: 1px solid #C7D6E6;
    border-radius: 4px;
    outline: none;
  }
  .custom-file-input {
    padding: 11px 12px;
    background: #FFFFFF;
    border: 1px dashed #C7D6E6;
    border-radius: 4px;

    color: transparent;
  }
  .w-93 {
    width: 93%;
  }
  .mb-4 {
    margin-bottom: 16px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  textarea {
    resize: none;
  }
  .custom-file-input::-webkit-file-upload-button {
    visibility: hidden;
  }
  .custom-file-input::before {
    content: 'Файл';
    display: inline-block;
    cursor: pointer;
    color: #757575;
  }
  .custom-file-input:hover::before {
    border-color: black;
  }
  .custom-file-input:active {
    outline: 0;
  }
  .custom-file-input:active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }

  .slide-enter {
    opacity: 0;
    transform: translateX(-20px);
    transition: 0.5s all ease;
  }

  .slide-enter-to {
    opacity: 1;
    transform: translateY(0px);
    transition: 0.5s all ease;
  }

  .slide-leave-to {
    opacity: 0;
    transform: translateX(-20px);
    transition: 0.5s all ease;
  }

  .slide-sidebar-enter {
    opacity: 0;
    transform: translateX(10px);
    transition: 1s all ease;
  }

  .slide-sidebar-enter-to {
    opacity: 1;
    transform: translateY(0px);
    transition: 1s all ease;
  }

  .slide-sidebar-leave-to {
    opacity: 0;
    transform: translateX(10px);
    transition: 1s all ease;
  }
  .bg-dark {
    transition: 1s all ease;
    background: #0E0F0F;
    opacity: 0.6;
    pointer-events: none;
  }
</style>
