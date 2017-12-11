var oPrev = document.querySelector(".header-top-left");
oPrev.addEventListener("touchstart", function(event) {
    if (event.targetTouches.length == 1) {　　　　
        event.preventDefault(); // 阻止浏览器默认事件，重要 
        var touch = event.targetTouches[0];
        // 把元素放在手指所在的位置
        window.history.back();
    };

}, false);
var oOrder = document.querySelector('#order');
myajax.get('http://h6.duchengjiu.top/shop/api_order.php', {
	token: localStorage.token
}, function(err, responseText) {
	var json = JSON.parse(responseText);
	console.log(json);
	var data = json.data;
	if(data.length === 0) {
		oOrder.innerHTML = "<h3>您的订单为空</h3>";
		return;
	}
	for(var i = 0; i < data.length; i++) {
		var obj = data[i];
		//遍历商品列表，拼装HTML
		var goodsHTML = '';
		for(var j = 0; j < obj.goods_list.length; j++) {
			var goods = obj.goods_list[j];
			goodsHTML += `
            <div class="goods-text">
                <div class="goods-text-top">
                     <img src="${goods.goods_thumb}">
                     <div class="text-top-1"> ${goods.goods_name}</div>
                </div>
                <div class="goods-text-bottom">
                    <span class="text-bottom-1">单价：${goods.goods_price}</span>
                    <span class="text-bottom-1">数量：${goods.goods_number}</span>
                    <span class="text-bottom-1">小计：${goods.goods_price * goods.goods_number}</span>
                </div>
          </div>
          `;
		}
		//一件商品的总价
		oOrder.innerHTML += `
                          <li>
                            <div class="goods-header">
                                <div class="goods-1">您买的宝贝</div>
                                <div claSS="goods-2">></div>
                                <div class="goods-3">交易关闭</div>
                            </div>
                            <div class="order-goods">
                                ${goodsHTML}
                            </div>
                            <div class="title">
                                <span class="title-1">收货人：${obj.consignee}</span>
                                <span class="title-2">总价:${obj.total_prices}</span>
                                <button data-id="${obj.order_id}" class="cancel-order">取消订单</button>
                            </div>
                          </li>
                          `;
	}
});

oOrder.addEventListener("touchstart", function(event) {
	event = event || window.event;
	var target = event.target || event.srcElement;
	if(target.className === 'cancel-order') {
//		if(!confirm("")) {
//			return;
//		}
		var order_id = target.dataset.id;
		confirm("确定取消订单吗?",function(){
			myajax.post('http://h6.duchengjiu.top/shop/api_order.php?token=' + localStorage.token + '&status=cancel', {
				order_id
			}, function(err, responseText) {
				var json = JSON.parse(responseText);
				if(json.code === 0) {
					toast('订单取消成功');
				}
			},
			function(){
				return;
			});
		})	
	}
}, false)
var oLi = document.querySelector('.header-bottom').querySelectorAll("li");
        for(var i=0;i<oLi.length;i++){
            oLi[i].index=i;
            oLi[i].addEventListener('touchstart', function(event) {
                if (event.targetTouches.length == 1) {
                    event.preventDefault();
                    var touch = event.targetTouches[0];
                    for(var j=0;j<oLi.length;j++){
                        oLi[j].className="";
                    }
                    this.className="tianjia";
                }
            }, false);
        }