$(function() {
    // 获取手指在轮播图元素上的一个滑动方向（左右）

    // 获取界面上轮播图容器
    var $carousels = $('.carousel');
    var startX, endX;
    // 在滑动的一定范围内，才切换图片
    var offset = 50;
    var hotGoods = document.getElementById('hot-goods');
    var oCat = document.getElementById('cat');
    console.log(hotGoods);
    // 注册滑动事件
    $carousels.on('touchstart', function(e) {
        // 手指触摸开始时记录一下手指所在的坐标x
        startX = e.originalEvent.touches[0].clientX;
    });
    $carousels.on('touchmove', function(e) {
        // 目的是：记录手指离开屏幕一瞬间的位置 ，用move事件重复赋值
        endX = e.originalEvent.touches[0].clientX;
    });
    $carousels.on('touchend', function(e) {
        //console.log(endX);
        //结束触摸一瞬间记录手指最后所在坐标x的位置 endX
        //比较endX与startX的大小，并获取每次运动的距离，当距离大于一定值时认为是有方向的变化
        var distance = Math.abs(startX - endX);
        if (distance > offset) {
            //说明有方向的变化
            //根据获得的方向 判断是上一张还是下一张出现
            $(this).carousel(startX > endX ? 'next' : 'prev');
        }
    })
    var lock = true;
    var timer = setInterval(function() {
        if (!lock) return;
        if (oCat != undefined && oCat.innerHTML === "") {
            indexAjax();
            lock = false;
        }
        //3. 3秒后开锁
        setTimeout(function() {
            lock = true;
        }, 1000);
    }, 50);
    window.onload = function() {
        if (!lock) return;
        indexAjax;
        setTimeout(function() {
            lock = true;
        }, 1000);
    }

    function indexAjax() {

        $.ajax({
            type: "get",
            url: "http://h6.duchengjiu.top/shop/api_cat.php",
            success: addCategory
        })
        $.ajax({
            type: "get",
            url: "http://h6.duchengjiu.top/shop/api_goods.php",
            data: "page=1&pagesize=30",
            success: addImg
        })

    }

    function addCategory(res) {
        var data = res.data; //json对象当中的data是一个数组
        var arr = [""]
        for (var i = 0; i < data.length; i++) {
            var obj = data[i]; //数组里面的每一项是一个商品分类的对象
            oCat.innerHTML += `<li class="category-list"><a href="html/list.html?cat_id=${obj.cat_id}">${obj.cat_name}</a></li>`;
        }
    }

    function addImg(res) {
        console.log(hotGoods);
        console.log(res);
        var data = res.data;
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var obj = data[i]; //数组里面的每一项是一个商品分类的对象
            hotGoods.innerHTML += `
                <div id="hot">
                    <li>
                        <a href="html/goods.html?goods_id=${obj.goods_id}">
                            <img src="${obj.goods_thumb}" alt="">
                            <p>${obj.goods_name}</p><span>¥ ${obj.price}</span>
                            <span>
                            查看详情
                            </span>
                        </a>
                    </li>
                </div>`;
        }
    }

});
$(function() {
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(function() {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 100) {
                $("#backtotop").fadeIn(1500);
            } else {
                $("#backtotop").fadeOut(1500);
            }
        });
        //当点击跳转链接后，回到页面顶部位置
        $("#backtotop").click(function() {
            $('body,html').animate({ scrollTop: 0 }, 1000);
            return false;
        });
    });
});