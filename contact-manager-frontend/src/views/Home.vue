<template>
    <div class="container">
        <h2>Welcome to Contact Manager</h2>
        <nav>
            <ul>
                <li>Home</li>
                <li @click="changeLogin">Login</li>
                <li @click="changeRegister">Register</li>
            </ul>
        </nav> 
        <Login v-if="showLogin"></Login>
        <Register v-if="showRegister"></Register>     
    </div>
</template>
  
  
<script>
    import Login from '../components/Login.vue';
    import Register from '../components/Register.vue';
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

        methods:{
            changeLogin(){
                this.showLogin = true
                this.showRegister = false
            },

            changeRegister(){
                this.showRegister = true
                this.showLogin = false
            }
        }
    }
</script>

<style scoped>

    #app{
        text-align: center;
    }

    nav{
        background-color: #000;
        margin: 0;
        padding: 1rem;
    }

    ul{
        display: flex;
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        
    }

    li{
        padding: 1rem;
        cursor: pointer;
        color: aliceblue;
        font-size: 1.5rem;
    }

    li:nth-child(2){
        margin-left: auto;
    }
</style>
  
  