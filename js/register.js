var oUsername = document.querySelector('input[name=username]');
var oPassword = document.querySelector('input[name=password]');
var oSubmit = document.querySelector('input[type=submit]');
var oForm = document.getElementsByClassName("middlelist")
var oForm = false;
var oPass = false;
var oUser = false;

oSubmit.disabled = true;

oSubmit.onclick = function() {
    //先进行js校验用户名和密码符合规范，js校验通过
    //请求ajax进行校验用户名是否可用,当这个校验通过才能请求注册接口

    myajax.post('http://h6.duchengjiu.top/shop/api_user.php', {
            status: 'register',
            username: oUsername.value,
            password: oPassword.value
        },
        function(err, responseText) {
            var json = JSON.parse(responseText);
            console.log(json);
            if (json.message === "注册成功") {
                toast('注册成功，2秒后跳转到登录界面');
                setTimeout(function() {
                    location.href = 'login.html';
                }, 2000)
            }
            if (json.message == "用户名不合法，请填写3-20位的英文数字下划线") {
                toast("用户名格式不正确，请填写3-20位的英文数字组成的用户名格式")
            }
            if (json.message === "用户名已存在") {
                toast("用户已存在，请重新注册")
            }
            if (json.message === "少传参数username") {
                toast("请输入用户名")
            }
            if (json.message === "密码最小长度为6位") {
                toast("请输入密码，且密码最小长度为6位")
            }

        });
}
oPassword.onkeyup = function() {
    if (oPassword.value === "") {
        oPass = false;
    } else {
        oPass = true;
    }
    chec()

}
oUsername.onkeyup = function() {
    if (oUsername.value === "") {
        oUser = false;
    } else {
        oUser = true;
    }
    chec()

}

function chec() {
    oForm = oPass && oUser;
    oSubmit.disabled = !oForm;
    console.log(!oForm)
    if (oUsername.value !== "" && oPassword.value !== "") {
        oSubmit.style.color = "#fff";
    } else {
        oSubmit.style.color = "#ccc";
    }
    // return !oForm;
}


window.onkeyup = function(event) {
    if (event.keyCode === 13) {
        oSubmit.click();

    }
}