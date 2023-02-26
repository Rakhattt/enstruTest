<template>
<div class="sidebar">
    <div class="flex sidebar-wrap">
        <div class="sidebar-title">Обратная связь</div>
        <div class="close" @click="toogleSidebar"></div>
    </div>

  <div class="sidebar-wrapper">
      <form>
        <div class="pos-rel mb-4">
            <input
                    class="input w-93"
                    type="text"
                    v-model="fio" @blur="$v.fio.$touch()"
                    :class="{'input_error': $v.fio.$error}"
            >
            <label>ФИО</label>
            <div class="invalid" v-if="$v.fio.$error">Пожалуйста, заполните это поле</div>
        </div>
          <div class="df mb-4">
              <div class="auth_blog pos-rel">
                  <input
                          style="width: 80%; margin-right: 16px;"
                          class="input"
                          type="email"
                          v-model="email" @blur="$v.email.$touch()"
                          :class="{'input_error': $v.email.$error}"
                  >
                          <label>Почта</label>
                  <div class="invalid" v-if="$v.email.$error" v-show="$v.email.email">Пожалуйста, введите адрес электронной почты</div>
                  <div class="invalid" v-if="!$v.email.email">Пожалуйста, введите действительный адрес электронной почты </div>
              </div>
              <div class="auth_blog pos-rel">
                  <input
                          style="width: 85%;"
                          class="input"
                          type="number"
                          v-model="number" @blur="$v.number.$touch()"
                          :class="{'input_error': $v.number.$error}"
                  >
                  <label>Телефон</label>
                  <div class="invalid" v-if="!$v.number.minLength"> минимально должно быть {{ $v.number.$params.minLength.min }} цифр а не {{ number.length }}!</div>
              </div>
          </div>
          <div class="mb-4 pos-rel">
              <input
                      class="input w-93"
                      type="text"
                      v-model="organization" @blur="$v.organization.$touch()"
                      :class="{'input_error': $v.organization.$error}"
                      >
                    <label>Организация</label>
              <div class="invalid" v-if="$v.organization.$error">Пожалуйста, заполните это поле</div>
          </div>
          <div class="mb-4 pos-rel">
              <input
                      class="input w-93"
                      type="text"
                      v-model="recipient" @blur="$v.recipient.$touch()"
                      :class="{'input_error': $v.recipient.$error}"
              >
              <label>Получатель</label>
              <div class="invalid" v-if="$v.recipient.$error">Пожалуйста, заполните это поле</div>
          </div>
          <div class="mb-4 pos-rel">
              <textarea
                      class="input w-93"
                      rows="4" cols="50"
                      v-model="textarea"
              >
            </textarea>
              <label>Введите сообщения</label>
          </div>
          <div class="pos-rel">
              <input
                      class="w-93 custom-file-input"
                      type="file"
              >
              <span class="format">Прикрепляемый файл должен быть в формате .doc, .docx, .xls, .pdf, .jpg, .jpeg, .png и размером не более 1mb.</span>
              <!--          <Download />-->
          </div>
      </form>

      <div class="flex" style="margin-top: 20px">
          <button class="cancel"
                  @click="toogleSidebar"
          >
              Отменить
          </button>
          <button class="apply" @click="apply" :class="{ 'dis': disabled }">Применить</button>
      </div>
  </div>
</div>
</template>

<script>
    import {email, minLength, required} from "vuelidate/lib/validators";

    export default {
        name: 'Sidebar',
        data () {
            return {
                email: '',
                organization: '',
                recipient: '',
                number: null,
                fio: '',
                textarea: '',
                disabled: false,
            }
        },
        methods: {
            toogleSidebar: function () {
                this.$emit('sidebarToogle', this.sidebar)
            },
            async apply () {
                if (this.email !== '' && this.organization !== '' && this.recipient !== '' && this.fio !== '') {
                    const info = {
                        email: this.email,
                        organization: this.organization,
                        recipient: this.recipient,
                        number: this.number,
                        fio: this.fio,
                    }
                    console.log(info)
                    this.$store.dispatch('applyInfo', info)
                        .then(() => {
                            alert("Вы успешно применили!")
                            this.$router.push('/')
                        })
                    .catch(() => {
                        alert("упс, что-то пошло не так")
                    })
                }
            }
        },
        validations: {
            email: {
                required,
                email
            },
            organization: {
                required
            },
            recipient: {
                required
            },
            number: {
                minLength: minLength(11)
            },
            fio: {
                required
            }
        },
    }
</script>

<style lang="scss">
    .flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .sidebar {
        width: 380px;
        min-width: 380px;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        margin: 0;
        right: 0;
        transition: left 0.3s;
        background-color: #ffffff !important;
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
        background: #E2EBF3;
    }
    .sidebar-wrapper {
        padding: 16px;
        background-color: #fff;
        box-shadow: -4px 2px 7px -6px rgba(34, 60, 80, 0.14);
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
        content: 'Файл не выбран';
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
    .input_error {
        border: 1px solid red !important;
    }
    .invalid {
        font-size: 12px;
        line-height: 15px;
        color: #DE1C22;
        margin-top: 2px;
        text-align: left;
    }
    .auth_blog {
        width: 70%;
    }
    .pos-rel {
        position: relative;
        label {
            position: absolute;
            top: 6px;
            left: 12px;
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
            color: #425F80;
        }
    }
    .cancel {
        border: 1px solid #7893B0;
        border-radius: 4px;
        padding: 12px 45px;
        color: #7893B0;
        background-color: #fff;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        cursor: pointer;
    }
    .apply {
        color: #FAFCFE;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        background: #0184FF;
        border-radius: 4px;
        padding: 12px 45px;
        border: 1px solid #0184FF;
        cursor: pointer;
    }
    .df {
        display: flex;
    }
    .format {
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        color: #7893B0;
        text-align: left;
        display: block;
    }
    .dis {
        pointer-events: none;
        background-color: #b4c8dc;
    }
</style>