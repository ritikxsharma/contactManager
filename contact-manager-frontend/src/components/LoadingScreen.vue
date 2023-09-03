<template>
    <div class="loading-screen">
        <div class="spinner"></div>
        LOADING...
    </div>
</template>

<script>

    export default{
        name: "LoadingScreen"
    }

</script>

<style scoped>
    .loading-screen{
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

    .spinner{
        border: 4px solid #fff;
        border-top: 4px solid #fff;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin{
        0% {
            transform: rotate(0deg);
        }

        50%{
            transform: rotate(180);
            border: #000;
        }

        100%{
            transform: rotate(360deg);
        }
    }
</style>