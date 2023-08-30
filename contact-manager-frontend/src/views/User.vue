<template>
    
    <div class="container">
        <div class="user">
            <h2 >Welcome, {{ getName }}</h2><br>
        </div>
        <ContactList ></ContactList>
    </div>

    
</template>


<script>

    import ContactList from "../components/ContactList.vue"
    import { mapGetters } from "vuex";

    export default{
        name: "User",
        components:{
            ContactList
        },
        
        computed:{
            ...mapGetters(['getName'])
        }
    }
</script>


<style scoped>
    .container{
        display: block;
        margin-top: 4rem;
        
    }

    .user{
        background-color: white;
        padding: 1rem;
        border: 2px solid #000;
    }

</style>