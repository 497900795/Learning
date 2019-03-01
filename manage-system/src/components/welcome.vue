<template>
    <div class="welcome">
        <div class="welcome-banner">一个欢迎用的banner</div>
        <span class="skip" @click="skip">跳过&ensp;{{timer}}</span>
    </div>
</template>

<script>
export default {
    name: 'welcome',
    data() {
        return {
            timer: 5
        }
    },
    methods: {
        skip() {
            this.$router.replace('login');
        } 
    },
    created() {
        let that = this
        setInterval(function() {
            that.timer--;
            if(that.timer == 0) {
                that.$router.replace('login')
            }
        }, 1000)
    }
}
</script>


<style scoped>

    .welcome {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;

        background-image: url('../../static/hd.jpg');
        background-size: 100% auto;
        background-position: center center;
    }

    .skip {
        display: inline-block;
        position: fixed;
        padding: 0.5em;
        right: 10px;
        top: 10px;
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 4px;
        box-shadow: 1px 1px 2px #666;
        cursor: pointer;
    }

    .welcome-banner {
        position: relative;
        top: 25%;
        padding: 0.5em;

        background-color: rgba(255, 255, 255, 0.6);
        color: #000;
        font-size: 64px;
    }
</style>
