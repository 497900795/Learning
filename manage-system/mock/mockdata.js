import Mock from 'mockjs'

let loginData = Mock.mock('/logReq', {
    token: 1,
    uid: '123456'
});

let elData = Mock.mock('/buyElReq', {
    studentId: '1234',
    studentName: 'Tom',
    room: '8B-4-5',
    oldEl: '100.0',
    buyEl: '0.0',
    oldBalance: '200.00'
});

let netData = Mock.mock('/buyNetReq', {
    studentId: '1234',
    studentName: 'Tom',
    oldBalance: '49.00',
    priceType: [10, 20, 50],
    typeExp: [
        '十元套餐，共100GB流量',
        '二十元套餐，共300GB流量',
        '五十元套餐，不限流量'
    ],
})

//拦截确认
let ensurePayEl = Mock.mock('/ensurePayEl', {
    scs: true
})

let ensurePayNet = Mock.mock('/ensurePayNet', {
    token: true
})

export {loginData, elData, ensurePayEl, netData, ensurePayNet}