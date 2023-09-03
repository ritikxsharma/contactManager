<template>
    <div class="add-screen">
        <form @submit.prevent="addContact">
            <div @click="closeForm" class="close">x</div>
            <h2 style="color: #000;">ADD CONTACT</h2>
            <input v-model="name" type="text" placeholder="name"><br>
            <input v-model="contactNumber" type="text" placeholder="contact number"><br>
            <button type="submit">ADD</button>
        </form>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex'

    export default{
        name: "AddContact",

        data(){
            return{
                name: "",
                contactNumber:""
            }
        },

        computed:{

            ...mapGetters(['getToken'])

        },

        methods:{
            async addContact(){
                try {
                    const newContact = {
                        name: this.name,
                        contactNumber: this.contactNumber
                    }
                    console.log(newContact);
                    const res = await fetch("http://localhost:5001/api/contacts", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.getToken(this.$route.params.userId)}`
                        },
                        body: JSON.stringify(newContact)
                    })

                    if(res.ok){
                        this.$emit('close-add', newContact)
                    }else{
                        alert("Sorry failed to add contact")
                    }

                    this.name = ""
                    this.contactNumber = ""

                } catch (error) {
                    console.log("Error: ", error);
                }
            },

            closeForm(){
                this.$emit('close-add')
            }
        }
    }

</script>

<style scoped>
    .add-screen{
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: aliceblue;
    }

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        padding: 5rem;
        box-shadow: 10px 10px #000;
        border-radius: 5px;
    }

    .close {
        font-size: 3rem;
        color: #000;
        cursor: pointer;
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
        height: 3rem;
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