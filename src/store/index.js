import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/compat'
Vue.use(Vuex)
class User {
    constructor ( email, number,recipient,organization,fio,textarea) {
        this.email = email
        this.number = number
        this.recipient = recipient
        this.organization = organization
        this.fio = fio
        this.textarea = textarea
    }
}
export default new Vuex.Store({
    state: {
        user: null,
    },
    mutations: {
        intercalate (state, payload) {
            state.created.push(payload)
        },
    },
    actions: {
        async applyInfo({commit}, payload) {
            try {
                const newUse = new User(payload.email, payload.number, payload.recipient, payload.organization, payload.fio, payload.textarea)
                const info = await firebase.database().ref('tasks').push(newUse)
                commit('intercalate', {
                    ...newUse,
                    id: info.key
                })
                console.log(info)
            } catch (e) {
                alert(e);
            }
        },
    },
    getters: {
        created (state) {
            return state.created
        },
    }
})
