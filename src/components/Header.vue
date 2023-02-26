<template>
    <div class="header">
        <router-link to="/"><Logo /></router-link>

        <ul class="nav">
            <li v-for="menuItem of menuItems"
                :key="menuItem.id"
                @click="toggleShow"
            >
                <router-link
                        v-text="menuItem.title"
                        :to="menuItem.url"
                        tag="a">
                </router-link>
                <ArrowDown style="margin-left: 8px;" class="arr" v-if="menuItem.arrowDown" :style="{transform: showMenu ? 'rotate(180deg)' : ''}"/>
            </li>
            <transition name="slide">
                <div v-if="showMenu" class='menu-drop-down'>
                    <div class='drop-menu-item'>Замена 15-значных кодов на 15-значные</div>
                    <div class='drop-menu-item'>Коды 15-значные</div>
                    <div class='drop-menu-item'>Отношения между 15-значными кодами и ТН ВЭД</div>
                    <div class='drop-menu-item'>Вывод 15-значных кодов из оборота</div>
                </div>
            </transition>
        </ul>

        <div class="header-right">
            <div class="border-drop">
                <Bell />
                <div style="margin-left: 10px">{{ bell }}</div>
            </div>

            <div class="border-drop" @click="moderatorShow = !moderatorShow">
                <div style="margin-right: 12px">Модератор</div>
                <ArrowDown :style="{transform: moderatorShow ? 'rotate(180deg)' : ''}" />
                <transition name="slide">
                    <div v-if="moderatorShow" class='moderator-show'>
                        <div class='drop-menu-item'>Модератор 1</div>
                        <div class='drop-menu-item'>Модератор 2</div>
                    </div>
                </transition>
            </div>

            <div class="border-line"></div>

            <div class="lang" @click="langShow = !langShow">
                <FlagKz />
                <div class="lang-title">kz</div>
                <ArrowDown :style="{transform: langShow ? 'rotate(180deg)' : ''}" />
                <transition name="slide">
                    <div v-if="langShow" class='lang-wrap'>
                        <FlagKz />
                        <div class="lang-title">ru</div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import Logo from "@/assets/Logo.vue"
    import ArrowDown from "@/assets/ArrowDown.vue"
    import Bell from "@/assets/Bell.vue"
    import FlagKz from "@/assets/FlagKz.vue"
    import FlagRu from "@/assets/FlagRu.vue"
    export default {
        data () {
            return {
                menuItems: [
                    {
                        id: 0,
                        title: "Заявки",
                        url: "/applications"
                    },
                    {
                        id: 1,
                        title: "Поставщикам",
                        url: "/suppliers"
                    },
                    {
                        id: 2,
                        title: "Инструменты",
                        url: "/tools",
                        arrowDown: true,
                    },
                    {
                        id: 3,
                        title: "Контакты",
                        url: "/contacts"
                    },{
                        id: 4,
                        title: "Консоль",
                        url: "/console",
                    },
                ],
                bell: 4,
                showMenu: false,
                moderatorShow: false,
                langShow: false,
            }
        },
        computed: {
        },
        components: {
            Logo,ArrowDown,Bell,FlagKz
        },
        methods: {
            toggleShow: function() {
                this.showMenu = !this.showMenu;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .arr {
        transition: 0.5s transform ease; transform-origin: 50%;
    }
    ul {
        display: flex;
        padding-left: 0;
        li {
            list-style-type: none;
            margin-right: 24px;
            a {
                text-decoration: none;
                font-size: 16px;
                line-height: 24px;
                color: #0184FF;
                :hover {
                    color: #0051AD;
                }
            }
        }
    }

    .header-right {
        display: flex;
    }

    .border-drop {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        border: 1px solid #0184FF;
        border-radius: 8px;
        color: #0184FF;
        cursor: pointer;
        margin-right: 16px;
        position: relative;
    }

    .border-line {
        background-color: #7893B0;
        width: 1px;
    }

    .lang {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        margin-left: 16px;
        position: relative;
        .lang-title {
            margin: 0 8px;
            color: #0184FF;
        }
    }

    .nav {
        position: relative;
        li {
            cursor: pointer;
        }
    }

    .menu-drop-down {
        background-color: #fff;
        padding-right: 12px;
        padding-left: 12px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        list-style: none;
        margin: .125rem 0 0;
        position: absolute;
        box-shadow: 0px 4px 12px rgba(30, 33, 34, 0.1);
        border-radius: 8px;
        left: 199px;
        top: 25px;
    }

    .lang-wrap {
        background-color: #fff;
        padding: 10px;
        cursor: pointer;
        display: flex;
        margin: .125rem 0 0;
        position: absolute;
        box-shadow: 0px 4px 12px rgba(30, 33, 34, 0.1);
        border-radius: 8px;
        top: 30px;
    }
    .drop-menu-item {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #252525;
        padding: 12px 0px;
        text-align: left;
    }

    .moderator-show {
        position: absolute;
        background-color: #0184ff30;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 4px 12px rgba(30, 33, 34, 0.1);
        border-radius: 4px;
        top: 36px;
        left: 0;
        right: 0;
        padding: 0 12px;
    }
    .slide-enter {
        opacity: 0;
        transform: translateY(-20px);
        transition: 0.5s all ease;
    }

    .slide-enter-to {
        opacity: 1;
        transform: translateY(0px);
        transition: 0.5s all ease;
    }

    .slide-leave-to {
        opacity: 0;
        transform: translateY(-20px);
        transition: 0.5s all ease;
    }
</style>