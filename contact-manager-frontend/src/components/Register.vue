<template>
    <div class="container">
        <form @submit.prevent="registerUser" >
            <h2>NEW ACCOUNT ? </h2>
            <input v-model="username" type="text" placeholder="username"><br>
            <input v-model="email" type="text" placeholder="email"><br>
            <input v-model="password" type="text" placeholder="password"><br>
            <div class="register">
                <button type="submit">register</button>
                <div v-if="registerFailed" class="registerFailed">
                    {{message}}
                </div>
            </div>
            <hr>
            <div class="login">
                Already have a account? <button v-on:click ="$emit('show-login')">Sign in</button>
            </div>
        </form>       



    </div>
</template>


<script>
    export default{
        name: "Register",
        data(){
            return{
                username: "",
                email: "",
                password: "",
                message: "",
                registerFailed: false
            }
        },

        methods:{
            async registerUser(){
                const newUser = {
                    username : this.username,
                    email: this.email,
                    password: this.password
                }

                try {
                    
                    const res = await fetch("http://localhost:5001/api/users/register", {
                        method: "POST",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newUser)
                    })
                    
                    const data = await res.json()
                    if (res.ok) {
                        console.log(data);
                        alert("User Registered Successfully, Now redirecting to login page")
                        setTimeout(2000)
                        this.$router.push('login')
                    }else{
                        console.log("Registeration Failed:", data.msg);
                    }

                } catch (error) {
                    this.message = "Registeration Failed"
                    this.registerFailed = true
                    console.log("Registeration Failed: ", error);
                }
            }
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

    .register{
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 15px;
    }

    .register button{
        border: none;
        background: #1877f2;
        color: #fff;
        font-size: 1.2rem;
        font-weight: 500;
        transition: 0.2s ease;
    }


    .login{
        text-align: center;
        margin-bottom: 20px;
        margin-top: 25px;
    }

    .login button{
        padding: 15px 20px;
        font-size: 1.1rem;
        font-weight: 500;
        transition: 0.2s ease;
        background: #42b72a;
        border: none;
        border-radius: 20px;
    }

</style>