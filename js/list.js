(function() {
  var oCat = document.querySelector('#cat');
  myajax.get('http://h6.duchengjiu.top/shop/api_cat.php', {},
    function(error, responseText) {
      var json = JSON.parse(responseText);
      var data = json.data;
      for(var i = 0; i < data.length; i++) {
        var obj = data[i];

        oCat.innerHTML += `<li><a href="list.html?cat_id=${obj.cat_id}">${obj.cat_name}</a></li>`
      }
    });
  var topNav = document.querySelector('.nav-list');
  var topDis = getAllTop(topNav);

  function getAllTop(obj) {
    var allTop = obj.offsetTop;
    while(obj = obj.offsetParent) {
      allTop += obj.offsetTop;
    }
    return allTop;
  }
})();

var page = 1;
var pagesize = 10;

function getContent() {
  var oGoods = document.querySelector('#hot-goods');
  var cat_id = getQueryString("cat_id");
  myajax.get('http://h6.duchengjiu.top/shop/api_goods.php', {
    cat_id: cat_id,
    page,
    pagesize
  }, function(error, responseText) {
    var json = JSON.parse(responseText); //返回的整个json对象
    var data = json.data; //json对象当中的data是一个数组
    for(var i = 0; i < data.length; i++) {
      var obj = data[i]; //数组里面的每一项是一个商品分类的对象
      oGoods.innerHTML += `<div id="hot"><li><a href="goods.html?goods_id=${obj.goods_id}"><img src="${obj.goods_thumb}"/> <p>${obj.goods_name} </p><span>¥ ${obj.price}</span></a></li></div>`;
    }
    lock = true;
  });

}
getContent();

var lock = true;
$(window).scroll(function() {
  if(!lock) return;
  var rate = $(document).scrollTop() / $(document).height();
  if(rate > 0.5) {
    getContent(++page);
    lock = false;
  }
})
var backtotop = new BackToTop('#backtotop');