var oUsername = document.querySelector('input[name=username]');
var oPassword = document.querySelector('input[name=password]');
var oBtn = document.querySelector('input[type=button]');
var oForm = false;
var oPass = false;
var oUser = false;

oBtn.disabled = true;
oBtn.addEventListener("click", function() {
    //js校验
    //直接调用登录的接口
    myajax.post('http://h6.duchengjiu.top/shop/api_user.php', {
        status: 'login',
        username: oUsername.value,
        password: oPassword.value
    }, function(error, responseText) {
        var json = JSON.parse(responseText);
        console.log(json);
        localStorage.token = json.data.token;
        localStorage.username = json.data.username;
        console.log(localStorage.token);
        console.log(localStorage.username);
        // alert(json.message)
        if (json.message == "登录成功") {
            location.href = "../index.html";
        }
        if (json.message == "用户名不合法，请填写3-20位的英文数字下划线") {
            toast("用户名格式不正确，请填写3-20位的英文数字组成的用户名格式")
        }
        if (json.message === "少传参数username") {
            toast("请输入用户名")
        }
        if (json.message === "密码最小长度为6位") {
            toast("请输入密码，且密码最小长度为6位")
        }
        if (json.message === "密码错误") {
            toast("登录失败，请检查用户名或密码")
        }
        if (json.message === "用户名不存在") {
            toast("用户名不存在，请前往注册")

        }
    });
})
oPassword.onkeyup = function() {
    if (oPassword.value === "") {
        oPass = false;
    } else {
        oPass = true;
    }
    chec();

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
    oBtn.disabled = !oForm;
    console.log(!oForm);
    if (oUsername.value !== "" && oPassword.value !== "") {
        oBtn.style.color = "#fff";
    } else {
        oBtn.style.color = "#ccc";
    }
    // return !oForm;
}