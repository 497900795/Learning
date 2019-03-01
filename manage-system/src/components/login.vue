<template>
    <div class="wrap">
        <div class="bulliten">
            <transition-group name="bulliten-fade">
                <img src="../../static/b1.jpg" alt="测试轮播图" width="100%" v-if="currentPic==0" key="0">
                <img src="../../static/b2.jpg" alt="测试轮播图" width="100%" v-if="currentPic==1" key="1">
                <img src="../../static/b3.jpg" alt="测试轮播图" width="100%" v-if="currentPic==2" key="2">
                <img src="../../static/b4.jpg" alt="测试轮播图" width="100%" v-if="currentPic==3" key="3">
            </transition-group>
        </div>
        <div class="login">
            <div class="login-header">
                <h1>登录</h1>
                <hr>
            </div>
            <form @submit.prevent>
                <div class="form-group">
                    <label for="username">用户名</label>
                    <input type="text" name="username" id="username" class="form-control" placeholder="用户名">
                </div>
                <div class="form-group">
                    <label for="password">密码</label>
                    <input type="password" name="password" id="password" class="form-control" placeholder="密码">
                </div>
                <div class="form-group">
                    <br>
                    <input type="button" value="登录" @click.prevent.stop="login" class="btn btn-block btn-success">
                </div>
            </form>
        </div>
        <div class="info">
            <span>更多信息</span>
            <img src="../../static/qr.jpg" alt="测试二维码" width="100%">
        </div>
    </div>
</template>


<style scoped>
    .wrap {
        margin: 0;
        padding: 0;
        text-align: center;
    }

    .bulliten {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .login {
        position: absolute;
        top: 20%;
        left: 30%;
        width: 40%;
        padding: 3em;
        text-align: center;
        border-radius: 1em;
        background-color: rgba(255, 255, 255, 0.6);
        color: #000;
    }

    .login > form {
        text-align: left;
    }

    .info {
        position: absolute;
        width: 8em;
        top: 40%;
        right: 20px;
        padding: 1em;
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 2px;
    }

    .bulliten-fade-enter-active, .bulliten-fade-leave-active {
        transition: all 1.2s ease;
    }

    .bulliten-fade-enter-active {
        transition-delay: 1.2s;
    }

    .bulliten-fade-enter, .bulliten-fade-leave-to {
        transform: scale(1.2);
        opacity: 0;
    }

    .bulliten-fade-enter-to, .bulliten-fade-leave {
        transform: none;
        opacity: 1;
    }

</style>

<script>
import loginData from '../mock/mockdata.js'
export default {
    name: 'login',
    data() {
        return {
            currentPic: 0,
            timer: null
        }
    },
    methods: {
        login() {
            if (this.timer) {
                clearInterval(this.timer);
            }
            let that = this;
            this.$axios.post('/logReq', {
                params: {
                    username: 123,
                    password: 456
                }
            }).then(function(res) {
                //后台返回一个token和一个uid
                //token为true表示登录成功，反之为登录失败
                //uid代替cookie，放入vuex中表示当前登录用户的唯一标识
                if(res.data.token == 1) {
                    alert(res.data.token)
                    that.$store.state.id = res.data.uid;
                    that.$router.replace('/mainInter');
                }
                else {
                    alert('用户名或密码错误')
                }
            }).catch(function(err) {
                console.log(err)
            })
            
        } 
    },
    created() {
        let that = this
        this.timer = setInterval(function() {
            that.currentPic++;
            if (that.currentPic >= 4) {
                that.currentPic = 0;
            }
        }, 5000)
    }
}
</script>


