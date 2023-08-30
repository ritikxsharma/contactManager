<template>
    <div class="container">
        <form @submit.prevent="login">
            <h2>LOGIN</h2>
            <input v-model="email" type="text" placeholder="email"><br>
            <input v-model="password" type="password" placeholder="password"><br>
            <button type="submit">login</button>

            <div v-if="showFailed" class="loginFailed">
                Entered email or password is incorrect!!!
            </div>

        </form>
        <div v-if="showLoading" class="loading-screen">
            <LoadingScreen></LoadingScreen>
        </div>
    </div>
</template>

<script>

    import LoadingScreen from '../components/LoadingScreen.vue'

    export default{
        name: "login",
        components:{
            LoadingScreen
        },
        data(){
            return{
                email: "",
                password: "",
                showLoading: false,
                showFailed: false
            }
        },
        methods:{
            async login(){
                this.showLoading = true
                console.log(`email: ${this.email} and password: ${this.password}`);
                const userData = {
                    email: this.email,
                    password: this.password
                }

                try{
                    const res = await fetch('http://localhost:5001/api/users/login', {
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    })

                    const data = await res.json()
                    console.log(res.ok);
                    if(res.ok){
                        const token = data.accessToken
                        await this.getUserInfo(token)
                        setTimeout(() => {
                            this.showLoading = false
                            this.$router.push('user') 
                        }, 2000); 
                                      
                    }else{
                        this.showFailed = true
                        this.showLoading = false
                        console.log("Login Failed: ", data.msg);
                    }


                }catch(error){
                    console.error("login failed : ", error);
                }
            },

            async getUserInfo(token){
                try{
                    const res = await fetch("http://localhost:5001/api/users/current",{
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    })

                    var userData = await res.json();
                    userData = Object.assign(userData, {token: token})
                    console.log('User info : ', userData);
                    this.$store.dispatch('setUser', userData)

                }catch(error){
                    console.log("Failed to fetch user info: ", error);
                }
            }
        }
    }
</script>

<style scoped>
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50rem;
    }

    form{
        background-color: white;
        padding: 5rem;
        box-shadow: 10px 10px #000;
        border-radius: 5px;
    }

    input{
        margin: 1rem;
        border: 0;
        border-bottom: 1px solid #000;
        padding: 0.5rem;
    }

    input:focus{
        outline: none;     
    }

    input:focus::placeholder{
        color: transparent;
        transition: color 0.5s;
    }


    button{
        margin: 1rem;
        width: 10rem;
        height: 2rem;
        background-color: lightskyblue;
        border: 0;
        border: 1px solid #fff;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover{
        transform: scale(1.2);
        transition: transform 0.4s ;
    }

    .loginFailed{
        font-size: large;
    }

    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 24px;
    }

</style>