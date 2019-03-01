window.onload = function(){
	$(".uname").click(function(){
		if( $(this).val()=="邮箱/用户名/已验证手机号" ){
			$(this).val("");
			$(this).css("color","gray");
		}
	})
	$(".upwd").click(function(){
		if( $(this).val()=="密码" ){
			$(this).val("");
			$(this).css("color","gray");
			
		}
	})
	$(".btn_login").click(function(){
		var val = $(".uname").val();
		var pwd = $(".upwd").val();
			var def = $.ajax({
				type:"get",
				url:`http://127.0.0.1/projectHe/regi_log.php?status=login&uname=${val}&upwd=${pwd}`,
				async:true
			})
			def.done( function(mes){
				if( mes == 2 ){
					alert("用户名不存在，请注册");
					window.location.href = "register.html";
				}else if( mes == 0 ){
					alert("密码错误，请重新输入密码");
					window.location.href = "login.html";
				}else if( mes == 1 ){
					alert("登录成功");
					location.href = `index.html?id=${val}`;
				}
			} )
	})
}







