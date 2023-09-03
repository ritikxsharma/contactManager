<template>
    <div class="contacts">     
        <h2>Contacts</h2>
        <nav> 
            <input v-model="searchQuery" type="text" placeholder="Search..">
            <!-- <button @click="showAdd = true">Add Contact</button> -->
        </nav>
        <div class="contacts-wrapper">
            <div v-for="contact in filteredContacts" :key="contact" >
                <ul>
                    <li>{{ contact.name }}</li>
                    <li>{{ contact.contactNumber }}</li>
                </ul>
                <button @click="showUpdateContactForm(contact)" id="update">Update</button>
                <button @click="deleteContact(contact._id)" id="delete">Delete</button>
            </div>
        </div>

        <div v-if="showUpdate" class="addScreen">
            <UpdateContact :contact = "selectedContact" @contact-updated = "updateContact" @close-update-form = "showUpdate = false" ></UpdateContact>
        </div>
    </div>
</template>


<script>
    import {mapGetters} from "vuex"
    import AddContact from "./AddContact.vue"
    import UpdateContact from "./UpdateContact.vue"

    export default{
        name: "UserContacts",
        components:{
            AddContact,
            UpdateContact
        },

        props:{
            userId: String,
            contacts: Array
        },

        data(){
            return{
                searchQuery:"",
                showUpdate: false,
                selectedContact: {}
            }
        },

        computed:{

            ...mapGetters(['getToken', 'getAllUsers']),
            
            filteredContacts(){
        
                if (this.searchQuery.trim().length == 0) {
                    return this.contacts
                }

                return this.contacts.filter(contact => contact.name.replace(/\s+/g, '').toLowerCase().match(this.searchQuery.toLowerCase().trim()))
            }  
        },

        methods:{

            async deleteContact(contactId){
                try {
                    console.log(contactId);
                    console.log(this.getToken(this.$route.params.userId));
                    const res = await fetch(`http://localhost:5001/api/contacts/${contactId}`, {
                        method: "DELETE",
                        headers:{
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.getToken(this.$route.params.userId)}`
                        },
                    })

                    if (res.ok) {
                        this.$emit('contact-delete', contactId)
                    }else{
                        alert("Sorry contact cannot be deleted.Pleasse try again...")
                    }
                    
                } catch (error) {
                    console.log("Error: ", error);
                }
            },

            showUpdateContactForm(contact){
                this.showUpdate = true
                this.selectedContact = contact
            },

            updateContact(updatedContact){
                this.showUpdate = false
                this.$emit('contact-updated', updatedContact)
                
            },
        }
    }
</script>


<style scoped>

    .contacts{
        display: flex;
        flex-direction: column;
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 5px;
    }

    h2{
        text-align: center;
        margin-bottom: 10px;
    }

    nav{
        display: flex;
        align-items: center;
        background-color: #333;
        padding: 1rem;
        
    }

    nav > input{
        width: 50%;
        padding: 14px;
    }

    nav > button{
        width: 10rem;
        height: auto;
    }

    .contacts-wrapper{
        overflow-y: scroll;
    }

    .contacts-wrapper > div{
        display: flex;
        align-items: center;
        margin: 1rem;
        padding: 1rem;
        border-radius: 0.5rem;
        font-size: larger;
        border: 2px solid #ccc;
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
        position: relative;
        width: 6rem;
        height: 3rem;
        margin: 0.2rem;
        padding: 0.2rem;
        border-radius: 20px;
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