<template>
    <div class="wrap">
        <div class="logout" @click="logout">登出</div>
        <div class="buy-group">
            <router-link to="/buy-el"><div class="buy-item buy-el">购电服务</div></router-link>
            <router-link to="/buy-net"><div class="buy-item buy-net">购网服务</div></router-link>
        </div>
    </div>
</template>

<style scoped>

    .wrap {
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .logout {
        float: right;
        padding: 0.8em 1.2em;
        background-color: #FF0000;
        color: #FFFFFF;
        font-weight: 600;
        border-radius: 0.5em;
        cursor: pointer;
    }

    .buy-group {
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        align-content: center;
        justify-content: center;
    }

    .buy-item {
        width: 300px;
        height: 300px;
        margin: 20px;
        border-radius: 150px;
        text-align: center;
        line-height: 300px;
        font-size: 50px;
        color: #FFFFFF;
        text-decoration: none;
    }

    .buy-el {
        background-color: #00CC00;
    }

    .buy-net {
        background-color: #0000FF;
    }

</style>


<script>
export default {
    name: 'mainInter',
    methods: {
        logout() {
            //id清空
            this.$store.state.id = -1;
            this.$router.push('/login');
        }
    }
}
</script>

