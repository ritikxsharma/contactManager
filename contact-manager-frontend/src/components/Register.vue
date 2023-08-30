<template>
    <div class="container">
        <form @submit.prevent="registerUser" >
            <h2>NEW ACCOUNT ? </h2>
            <input v-model="username" type="text" placeholder="username"><br>
            <input v-model="email" type="text" placeholder="email"><br>
            <input v-model="password" type="text" placeholder="password"><br>
            <button type="submit">register</button>
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
                password: ""
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
                    console.log("Registeration Failed: ");
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
</style>