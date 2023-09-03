
import {createStore} from 'vuex'

export default createStore({
    state:{
        users: []
    },

    mutations:{
        ADD_USER(state, newUser){
            state.users.push(newUser)
        },

        DELETE_USER(state, removeUser){
            state.users = state.users.filter(user => user != removeUser.id)
        }
    },

    actions:{
        ADD_USER({commit}, newUser){
            commit('ADD_USER', newUser)
        },

        DELETE_USER({commit}, removeUser){
            commit('DELETE_USER', removeUser)
        }
            
    },

    getters:{
        getAllUsers: state => state.users,
        getUserName: state => userId =>{
            return state.users.find(user => user._id == userId).username
        },
        getToken: state => userId =>{
            return state.users.find(user => user._id == userId).token
        },
        removeUser: state => userId =>{
            return state.users.filter(user => user._id != userId)
        }

    }
})