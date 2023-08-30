<template>
    <div class="contacts">
        <div v-if="isAdd" class="addScreen">
            <AddContact @close-add="closeAdd"></AddContact>
        </div>
       
        <nav> 
            <input v-model="searchQuery" type="text" placeholder="Search..">
            <button @click="isAdd = true">Add Contact</button>
        </nav>
        <div class="contacts-wrapper">
            <div v-for="(contact, index) in filteredContacts " :key="contact" :class="getBackground(index)">
                <ul>
                    <li>{{ contact.name }}</li>
                    <li>{{ contact.contactNumber }}</li>
                </ul>
                <button @click="deleteContact(contact._id)" id="delete">Delete</button>
            </div>
        </div>

        
    </div>
</template>


<script>

    import {mapGetters} from "vuex"
    import AddContact from "./AddContact.vue"

    export default{
        name: "UserContacts",
        components:{
            AddContact
        },

        data(){
            return{
                searchQuery:"",
                contacts: [],
                isAdd: false,
            }
        },

        computed:{

            ...mapGetters(['getToken']),

            filteredContacts(){
        
                if (this.searchQuery.trim().length == 0) {
                    return this.contacts
                }

                return this.contacts.filter(contact => contact.name.replace(/\s+/g, '').toLowerCase().match(this.searchQuery.toLowerCase().trim()))

            }  
        },

        mounted(){
            this.getContacts()
        },

        methods:{

            async getContacts(){
                try{
                    const res = await fetch("http://localhost:5001/api/contacts", {
                        method: 'GET',
                        headers:{
                            'Content-Type': "application/json",
                            Authorization: `Bearer ${this.getToken}`
                        },

                    })
                    const data = await res.json()
                    this.contacts = data
                    console.log(this.contacts);
                    
                }catch(error){
                    console.log("Error:", error);
                }
            },

            closeAdd(){
                this.isAdd = !this.isAdd
                this.getContacts()
            },

            async deleteContact(contactId){
                try {
                    const res = await fetch(`http://localhost:5001/api/contacts/${contactId}`, {
                        method: "DELETE",
                        headers:{
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.getToken}`
                        },
                    })

                    if (res.ok) {
                        this.getContacts()
                    }else{
                        alert("Sorry contact cannot be deleted.Pleasse try again...")
                    }
                    
                } catch (error) {
                    console.log("Error: ", error);
                }
            },

            getBackground(index){
                return index%2 == 0 ? 'bg-1' : 'bg-2'
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

    .contacts{
        display: flex;
        flex-direction: column;
        background-color: white;
    }

    nav{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #00000045;
        padding: 1rem;
    }

    nav > input{
        margin: 0;
        padding: 14px;
    }

    nav > button{
        width: 10rem;
        height: auto;
    }

    .contacts-wrapper{
        overflow-y: scroll;
        max-height: 50rem;
    }

    .contacts-wrapper > div{
        display: flex;
        align-items: center;
        margin: 1rem;
        padding: 1rem;
        border-radius: 0.5rem;
        font-size: larger;
    }

    .bg-1{
        background-color: rgb(225, 225, 248);
    }

    .bg-2{
        background-color: rgb(247, 235, 235);
    }

    ul{
        list-style-type: none;
        margin: 0;
    }

    li:nth-child(1){
        font-size: 25px;
        font-weight: bold;

    }

    li:nth-child(2){
        font-size: 20px;
        font-style: italic;
    }

    button{
        width: 5rem;
        height: 4rem;
        margin: 0.2rem;
        padding: 0.2rem;
        border-radius: 2rem;
        border: 0;
    }

    nav > button{
        height: 3rem;
        background-color: rgb(65, 147, 201);
    }


    button:nth-child(2){
        margin-left: auto;
    }

    #delete{
        border: 1px solid red;
        color: red;
    }

    #delete:hover{
        width: 7rem;
        font-size: 1rem;
        background-color: red;
        color: white;
        font-style: italic;
        transition: background-color 1s ease;
        transition: width 1s ease;
    }

    #update{
        border: 1px solid green;
        color: green;
    }

    #update:hover{
        width: 7rem;
        font-size: 1rem;
        background-color: green;
        color: white;
        font-style: italic;
        transition: background-color 1s ease;
        transition: width 1s ease;
    }

    .addScreen{
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