<template>
    <div class="wrap">
        <form class="form-horizontal info" @submit.prevent>
            <div class="form-group">
                <h1>购电</h1>
            </div>
            <div class="form-group">
                <label for="studentId" class="col-sm-2 control-label">学号</label>
                <div class="col-sm-10"><input type="text" name="studentId" id="studentId" class="form-control" disabled v-model="studentId"></div>
            </div>
            <div class="form-group">
                <label for="studentName" class="col-sm-2 control-label">姓名</label>
                <div class="col-sm-10"><input type="text" name="studentName" id="studentName" class="form-control" disabled v-model="studentName"></div>
            </div>
            <div class="form-group">
                <label for="room" class="col-sm-2 control-label">宿舍</label>
                <div class="col-sm-10"><input type="text" name="room" id="room" class="form-control" disabled v-model="room"></div>
            </div>
            <div class="form-group">
                <label for="oldEl" class="col-sm-2 control-label">原电量</label>
                <div class="col-sm-10"><input type="number" name="oldEl" id="oldEl" class="form-control" disabled v-model="oldEl"></div>
            </div>
            <div class="form-group">
                <label for="buyEl" class="col-sm-2 control-label">购电量</label>
                <div class="col-sm-10"><input type="number" min="0" name="buyEl" id="buyEl" class="form-control" v-model="buyEl"></div>
            </div>
            <div class="form-group">
                <label for="newEl" class="col-sm-2 control-label">新电量</label>
                <div class="col-sm-10"><input type="number" name="newEl" id="newEl" class="form-control" disabled v-model="newEl"></div>
            </div>
            <div class="form-group">
                <label for="oldBalance" class="col-sm-2 control-label">原余额</label>
                <div class="col-sm-10"><input type="number" name="oldBalance" id="oldBalance" class="form-control" disabled v-model="oldBalance"></div>
            </div>
            <div class="form-group">
                <label for="price" class="col-sm-2 control-label">支付金额</label>
                <div class="col-sm-10"><input type="number" name="price" id="price" class="form-control"  disabled v-model="price"></div>
            </div>
            <div class="form-group">
                <label for="newBalance" class="col-sm-2 control-label">新余额</label>
                <div class="col-sm-10"><input type="number" name="newBalance" id="newBalance" class="form-control" disabled v-model="newBalance"></div>
            </div>
            <div class="form-group">
                <div class="col-sm-6"><button type="submit" class="btn btn-success btn-block"  @click.prevent="payEl">购买</button></div>
                <div class="col-sm-6"><button type="reset" class="btn btn-danger btn-block"  @click.prevent="reset">重置</button></div>
            </div>
            <div class="form-group">
                <div class="col-sm-12"><router-link to="/mainInter"><button class="btn btn-default btn-block">返回</button></router-link></div>
            </div>
        </form>
    </div>
</template>

<style scoped>
    .wrap {
        text-align: center;
    }

    .info {
        display: inline-block;
        padding: 2em;
        width: 60%;
        background-color: #F0F0F0;
        border-radius: 1em;
    }
</style>


<script>
import elData from '../mock/mockdata.js'
import ensurePayEl from '../mock/mockdata.js'
export default {
    name: 'buy-el',
    data() {
        return {
            studentId: '',
            studentName: '',
            room: '',
            oldEl: '100.0',
            buyEl: '0.0',
            oldBalance: '200.00',
        }
    },
    methods: {
        //发送请求，只发送购买电量和购电人
        //钱够不够在前端判断
        payEl() {
            if(this.newBalance < 0) {
                alert('余额不足');
                this.reset();
            }
            else {
                let that = this;
                this.$axios.post('/ensurePayEl', {
                    params: {
                        buyEl: this.buyEl,
                        id: this.$store.state.id
                    }
                }).then(function(res) {
                    //回到主界面
                    alert('支付成功');
                    that.$router.replace('/mainInter')
                }).catch(function(err) {
                   console.log(err)
                });
            }
        },
        //重置表单,只需把buyEl重置即可
        reset() {
            this.buyEl = '0.0';
        }
    },
    computed: {
        newEl: function() {
            return (Number(this.oldEl) + Number(this.buyEl)).toFixed(1);
        },
        price: function() {
            return (Number(this.buyEl) * 0.5).toFixed(2);
        },
        newBalance: function() {
            return (Number(this.oldBalance) - this.price).toFixed(2);
        },
    },
    created() {
        var that = this;
        this.$axios.post('/buyElReq', {
            params: {
                id: that.$store.state.id
            }
        }).then(function(res) {
            that. studentId = res.data.studentId;
            that.studentName = res.data.studentName;
            that.room = res.data.room;
            that.oldEl = res.data.oldEl;
            that.oldBalance = res.data.oldBalance;
        });
    }
}
</script>

