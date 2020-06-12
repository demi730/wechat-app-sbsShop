var baseUrl = 'http://localhost:8087/foods/Index/';
var getShopList = baseUrl + 'getShopList';
var getFoodsBySid = baseUrl + 'getFoodsBySid';
var queryAll = baseUrl + 'queryAll';
var setAll = baseUrl + 'setAll';
var getOrder = baseUrl + 'getOrder';
var setOrder = baseUrl + 'setOrder';
//跳转到商家详情页面
function goToDetails(sid) {
    wx.navigateTo({
        url: '../details/details?sid=' + sid
    })
}
//每次改变商品数量后自动计算总件数、总价格
function getSum({fid,operation,list,input_num}){
    //更新餐品件数
    let num = 0;
    for (var i = 0; i < list.length; i++) {
        if (list[i].fid === fid) {
            let num = list[i].num;
            if (input_num){
                if (input_num < 0){
                    list[i].num = 0;
                }else {
                    list[i].num = input_num;
                }
            } else if (num === 0 && operation === -1){
                list[i].num = 0;
            } else{
                num = num + operation;
                list[i].num = num;
            }
            break;
        }
    }
    //计算总件数
    let sum = 0;
    for (var i = 0; i < list.length; i++) {
        let QC = list[i].num;
        sum += parseInt(QC);
    }
    // 计算总价格
    let price = 0;
    if (sum > 0) {
        for (var i = 0; i < list.length; i++) {
            var QB = list[i].price;
            var QR = list[i].num;
            price += parseFloat(QB * QR);
        }
    }
    return {sum,price};
}
module.exports = {
    getShopList: getShopList,
    getFoodsBySid: getFoodsBySid,
    goToDetails: goToDetails,
    getSum: getSum,
    queryAll:queryAll,
    setAll:setAll,
    getOrder:getOrder,
    setOrder:setOrder
};
