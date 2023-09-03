<template>
    <div class="container">
        <div class="sidebar">
            <button @click="showAdd = true">Add Contact</button>
            <button @click="showUserProfile">Profile</button>
            <button @click="showUserContacts">Contacts</button>
            <button @click="logout">LogOut</button>
        </div>
        <div v-if="showAdd" class="addScreen">
            <AddContact @close-add="onContactAdd" ></AddContact>
        </div>
        <main class="main">
            <UserInfo v-if="selectedButton == 'profile'" :contactsLength = "contacts.length"></UserInfo>
            <ContactList  v-if="selectedButton == 'contacts'" :contacts = "contacts" @contact-delete = "onContactDelete" @contact-updated = "onContactUpdate"></ContactList>
        </main>

    </div>
    
</template>


<script>
    import AddContact from "../components/AddContact.vue";
    import UserInfo from "../components/UserInfo.vue";
    import ContactList from "../components/ContactList.vue"
    import { mapGetters } from "vuex";

    export default{
        name: "User",
        components:{
            ContactList,
            UserInfo,
            AddContact,
        },
        
        data(){
            return{
                contacts: [],
                selectedButton: 'profile',
                selectedContact: {},
                showAdd: false
            }
        },

        computed:{
            ...mapGetters(['getToken']),
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
                            Authorization: `Bearer ${this.getToken(this.$route.params.userId)}`
                        },

                    })
                    const data = await res.json()
                    this.contacts = data
                    console.log(this.contacts);

                }catch(error){
                    console.log("Error:", error);
                }
            },

            async logout(){
                // await this.removeUser(this.$route.params.userId)
                this.$router.push({name: 'home'})
            },

            onContactAdd(newContact){
                this.showAdd = !this.showAdd
                this.contacts.push(newContact)
            },

            onContactDelete(contactId){
                this.contacts = this.contacts.filter(contact => contact._id != contactId)
            },

            onContactUpdate(updatedContact){
                const index = this.contacts.findIndex(contact => contact._id == updatedContact._id)
                if (index != -1) {
                    this.contacts[index] = updatedContact
                }
            },

            showUserProfile(){
                this.selectedButton = 'profile'
            },

            showUserContacts(){
                this.selectedButton = 'contacts'
            }
        }
    }
</script>


<style scoped>

    .container{
        min-width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        margin: 0;
        padding: 0;
    }
    .sidebar{
        flex: 1;
        display: flex;
        height: 100%;
        flex-direction: column;
        border: 2px solid; 
        background-color: #333;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        padding: 20px;
    }

    button{
        position: relative;
        padding: 10px 20px;
        background-color: #444;
        border: none;
        color: #fff;
        text-align: center;
        margin-bottom: 10px;
        cursor: pointer;
        z-index: 1;
    }

    button::before{
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: hsl(200 100% 80%);
        transform: scaleX(0);
        transition: transform 0.5s ease;
        transform-origin: right;
        z-index: -1;
    }

    button:hover{
        color: #333;
    }


    button:hover::before{
        transform: scaleX(1);
        transform-origin: left;
    }

    .main{
        flex: 5;
        padding: 20px;
        background-color: #f0f0f0;
        overflow: auto;
        right: 0;
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
        z-index: 1;
    }
</style>