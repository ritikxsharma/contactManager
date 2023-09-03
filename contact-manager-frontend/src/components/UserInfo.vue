<template>
    <div class="user-info">
        <h2>User Profile</h2>
        <div class="profile-details">
            <div class="profile-image">
                <img alt="User Avatar" />
            </div>
            <div class="profile-info">
                <p><strong>Name: </strong>{{ getUserName($route.params.userId) }}</p>
                <p><Strong>Contacts saved: </Strong> {{ contactsLength }}</p>
            </div>
        </div>
    </div>
</template>


<script>
    import { mapGetters } from 'vuex';

    export default{
        name: "UserInfo",

        props:{
            contactsLength: Number
        },

        computed:{
            ...mapGetters(['getUserName'])
        }
    }
</script>

<style scoped>
    .user-info {
        background-color: #f0f0f0;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .user-info h2 {
        margin-bottom: 10px;
        text-align: center;
    }

    .profile-details {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .profile-image img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 20px;
    }

    .profile-info p{
        margin: 0;
    }

</style>