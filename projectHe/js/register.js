window.onload = function(){
	function yzm(){
		var str = "";
		for( var i = 0 ; i < 4;i++  ){
			var code = rand(48,122);
			if( code>=58&&code<=64 || code>=91&& code<=96 ){
				i--;
			}else{
				str += String.fromCharCode(code);
			}
		}
		return str;
	}
	$(".sp5").html( yzm() );
	$(".p_a").click( function(){
		$(".sp5").html( yzm() );
	} )
	//用户名
	var flagName = null;
	$(".uname").blur(function(){
		var val = $(this).val();
		if( val ){
			var deff = $.ajax({
				type:"get",
				url:`http://127.0.0.1/projectHe/regi_log.php?status=name&uname=${val}&upwd=111111`,
			})
			deff.done(function(msg){
				if( msg == 2 ){
					$(".sp1").show().html("该用户名已存在").css("color","red")
					flagName = false;
				}else{
					$(".sp1").show().html("输入正确").css("color","lawngreen")
					flagName = true;
				}
			})
		}else{
			$(".sp1").show().html("用户名不能为空").css("color","red")
			flagName = false;
		}
	})
	//密码
	var flagPwd = null;
	$(".upwd").blur(function(){
		$(".uname").blur();
		var val = $(this).val();
		var num = /^\d+$/;
		var Let =/^[a-z]+$/i;
		var Sup = /^[!@#$%&^*<>.,?;]+$/;
		var num1 = /\d+/;
		var num2 = /[a-z]+/i;
		var num3 = /[!@#$%^&*<>/.,;]+/;
		if( val.length < 6 || val.length > 20 ){
			$(".sp2").show().html("密码长度不适").css("color","red");
			flagPwd = false;
		}else if( num1.test(val) && num2.test(val)&&num3.test(val) ){
			$(".sp2").show().html("强").css("color","green");
			flagPwd = true;
		}else if(  num.test(val) || Let.test(val)||Sup.test(val) ){
			$(".sp2").show().html("弱").css("color","lawngreen");
			flagPwd = true;
		}else{
			$(".sp2").show().html("中").css("color","lawngreen");
			flagPwd = true;
		}
	})
	//确认密码
var flagQpwd = null;
	$(".uqpwd").blur(function(){
		$(".upwd").blur();
		var val = $(this).val();
		var val2 = $(".upwd").val();
		if( val == val2 ){
			$(".sp3").show().html("√").css("color","lawngreen");
			flagQpwd = true;
		}
	})
//手机号
var flagTell = null;
$(".utell").blur(function(){
	$(".uqpwd").blur();
	var val = $(this).val();
	var reg = /^1[358]\d{9}$/;
	if( reg.test(val) ){
		$(".sp4").show().html("√").css("color","lawngreen");
		flagTell = true;
	}else{
		$(".sp4").show().html("请输入正确的手机号").css("color","red");
		flagTell = false;
	}
})
//验证码
var flagRand = null;
	$(".urand").blur(function(){
		$(".utell").blur();
		var val = $(this).val();
		var val2 = $(".sp5").html();
		if( val == val2 ){
			$(".sp6").show().html("√").css("color","lawngreen");
			flagRand = true;
		}else{
			$(".sp6").show().html("验证码输入错误").css("color","red");
			flagRand = false;
		}
	})
	

	$(".button").click( function(){
		var val = $(".uname").val();
		var pwd = $(".upwd").val();
		if( flagName && flagPwd && flagQpwd && flagTell && flagRand && $(".chec").prop("checked") ){
			var deff1 = $.ajax({
				type:"get",
				url:`http://127.0.0.1/projectHe/regi_log.php?status=register&uname=${val}&upwd=${pwd}`,
			})
			deff1.done(function(res){
				if( res == 1 ){
					alert("注册成功");
					window.location.href = "login.html";
				}else{
					alert(5)
				}
			})
		}else{
			alert("注册失败");
			window.location.href = "register.html";
		}
	} )
}















