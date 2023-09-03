<template>
    <div class="container">
        <form @submit.prevent="login">
            <h2>LOGIN</h2>
            <input v-model="email" type="text" placeholder="email" required><br>
            <input v-model="password" type="password" placeholder="password" required><br>

            <div class="login">
                <button type="submit">login</button>
                <div v-if="showFailed" class="loginFailed">
                    {{message}}
                </div>
            </div>
            
            <hr>

            <div class="register">
                <button v-on:click="$emit('show-register')" >Create new account</button>
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
                message: "",
                showLoading: false,
                showFailed:  false
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
                    console.log(data.user, data.token);
                    if(res.ok){
                        const userData = Object.assign(data.user, {token: data.token})
                        this.$store.dispatch('ADD_USER', userData)
                        setTimeout(() => {
                            this.showLoading = false
                            this.$router.push({name: 'user', params: {userId: userData._id}}) 
                        }, 2000); 
                        
                    }else{
                        this.showFailed = true
                        this.showLoading = false
                        this.message = "Email id or password is incorrect"
                        console.log("Login Failed: ", data.msg);
                    }


                }catch(error){
                    this.showLoading = false
                    this.showFailed = true
                    this.message = "Failed to login"
                    console.error("login failed : ", error);
                }
            },

            // async getUserInfo(token){
            //     try{
            //         const res = await fetch("http://localhost:5001/api/users/current",{
            //             headers:{
            //                 Authorization: `Bearer ${token}`
            //             }
            //         })

            //         var userData = await res.json();
            //         userData = Object.assign(userData, {token: token})
            //         console.log('User info : ', userData);
            //         this.$store.dispatch('ADD_USER', userData)

            //     }catch(error){
            //         console.log("Failed to fetch user info: ", error);
            //     }
            // },
        }
    }
</script>

<style scoped>

    form{
        display: flex;
        flex-direction: column;
        text-align: center;
        background-color: white;
        padding: 5rem;
        box-shadow: 10px 10px #000;
        border-radius: 5px;
        min-width: 500px;
    }

    input{
        margin: 1rem;
        border: 0;
        border-bottom: 1px solid #000;
        padding: 0.5rem;
        height: 55px;
        width: 100%;
    }

    input:focus{
        outline: none;     
    }

    input:focus::placeholder{
        color: transparent;
        transition: color 0.5s;
    }

    .login{
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 15px;
    }

    .login button{
        border: none;
        background: #1877f2;
        color: #fff;
        font-size: 1.2rem;
        font-weight: 500;
        margin: 0 20px 0 20px;
    }

    .loginFailed{
        font-size: large;
    }

    .register{
        text-align: center;
        margin-bottom: 20px;
        margin-top: 25px;
    }

    .register button{
        padding: 15px 20px;
        border: none;
        font-size: 1.1rem;
        font-weight: 500;
        transition: 0.2s ease;
        background: #42b72a;
        border-radius: 20px;
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