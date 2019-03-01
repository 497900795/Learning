<template>
    <div class="wrap">
        <form class="form-horizontal info">
            <div class="form-group">
                <h1>购网</h1>
            </div>
            <div class="form-group">
                <label for="studentId" class="col-sm-2 control-label">学号</label>
                <div class="col-sm-10"><input type="text" name="studentId" id="studentId" class="form-control" v-model="studentId" disabled></div>
            </div>
            <div class="form-group">
                <label for="studentName" class="col-sm-2 control-label">姓名</label>
                <div class="col-sm-10"><input type="text" name="studentName" id="studentName" class="form-control" v-model="studentName" disabled></div>
            </div>
            <div class="form-group">
                <label for="oldBalance" class="col-sm-2 control-label">原余额</label>
                <div class="col-sm-10"><input type="number" name="oldBalance" id="oldBalance" class="form-control" v-model="oldBalance" disabled></div>
            </div>
            <div class="form-group">
                <label for="price" class="col-sm-2 control-label">支付金额</label>
                <div class="col-sm-10"><input type="number" name="price" id="price" class="form-control" disabled v-model="price"></div>
            </div>
            <div class="form-group">
                <label for="newBalance" class="col-sm-2 control-label">新余额</label>
                <div class="col-sm-10"><input type="number" name="newBalance" id="newBalance" class="form-control" v-model="newBalance" disabled></div>
            </div>
            <div class="form-group">
                <label for="studentName" class="col-sm-2 control-label">套餐</label>
                <div class="col-sm-10">
                    <select name="netType" id="netType" class="form-control" v-model="netType">
                        <option v-for="(item, index) in priceType" :value="index" :key="item">{{item}}元/月</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="help" class="col-sm-2 control-label">套餐说明</label>
                <div class="col-sm-10 help-text">
                    <input type="text" name="helpText" id="helpText" class="form-control" disabled v-model="typeExp[netType]">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6"><button type="submit" class="btn btn-success btn-block" @click.prevent="payNet">购买</button></div>
                <div class="col-sm-6"><button type="reset" class="btn btn-danger btn-block" @click.prevent="reset">重置</button></div>
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
    
    .help-text {
        text-align: left;
    }
</style>

<script>
import netData from '../mock/mockdata.js'
import ensurePayNet from '../mock/mockdata.js'
export default {
    name: 'buy-net',
    data() {
        return {
            studentId: '',
            studentName: '',
            oldBalance: 200,
            priceType: [],
            netType: 0,
            typeExp:[],
        }
    },
    methods: {
         payNet() {
            if(this.newBalance < 0) {
                alert('余额不足');
                this.reset();
            }
            else {
                let that = this;
                this.$axios.post('/ensurePayNet', {
                    params: {
                        netType: this.netType,
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
        //重置表单,只需把netType重置即可
        reset() {
            console.log(this.netType)
            this.netType = 0;
        }
    },
    computed: {
        price() {
            return this.priceType[this.netType]
        },
        newBalance() {
            return Number(this.oldBalance) - Number(this.price);
        }
    },
    created() {
        var that = this;
        this.$axios.post('/buyNetReq', {
            params: {
                id: that.$store.state.id,
                netType: that.netType
            }
        }).then(function(res) {
            that. studentId = res.data.studentId;
            that.studentName = res.data.studentName;;
            that.oldBalance = res.data.oldBalance;
            //每一类的说明
            that.typeExp = res.data.typeExp;
            //价钱种类
            that.priceType = res.data.priceType;
        });
    }
}
</script>
