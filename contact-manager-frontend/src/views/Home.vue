<template>
    <div class="container">
        <div class="desc">
            <div class="text">
                <h2>Contact Manager</h2>
                <p>All your contacts in one place</p>
            </div>
            <Login @show-register="changeRegister" v-if="showLogin"></Login>
            <Register @show-login="changeLogin" v-if="showRegister"></Register>
        </div>    
        
    </div>
</template>
  
  
<script>
    import Login from '../components/Login.vue';
    import Register from '../components/Register.vue';
    import { mapGetters } from "vuex";
    export default{
        name: "Home",
        components: {
            Login,
            Register
        },
        data(){
            return{
                showLogin: true,
                showRegister: false
            }
        },

        computed:{
            ...mapGetters(['getAllUsers'])
        },

        methods:{
            changeLogin(){
                this.showLogin = true
                this.showRegister = false
            },

            changeRegister(){
                this.showRegister = true
                this.showLogin = false
            },

            // async logout(){
            //     const res = await fetch("http://localhost:5000/api/users/logout",{
            //         methods: "POST",
            //         headers:{
            //             'COntent-Type': 'application/json',
            //             Authorization: `Bearer ${token}`
            //         }
            //     })
                
            //     await getUserInfo(token)
            // },

            mounted(){
                console.log(this.getAllUsers);
            }
        }
    }
</script>

<style scoped>

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .container{
        display: flex;
        align-items: center;
        min-width: 100%;
        min-height: 100vh;
        background: #f0f2f5;
        justify-content: center;
    }

    .desc{
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 600px;
    }

    .text{
        margin-bottom: 90px;
    }

    h2{
        font-size: 4rem;
        margin-bottom: 10px;
    }

    p{
        font-size: 2rem;
        white-space: nowrap;
    }

</style>
  
  