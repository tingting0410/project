//切换城市
$(".city_a").mouseenter(function(){
	$(".city_map").show();
	$(".container").show();
	$(".city_map").mouseleave(function(){
		$(".city_map").hide();
		$(".container").hide();
	})
})
//切换下的滚动
var flag = true;
$(".Letter a").mouseenter(function(){
	flag = false;
	$(this).addClass("activ")
	       .siblings()
	       .removeClass("activ");
	var Top = $(this).index()*30 ;
	$(".all_ul").stop().animate( {"top":-Top} , 1000 );
	$("#scoll").stop().animate( { "top": $(this).index()*10} , 1000 )
	if($(".all_ul").css("top")  == "-420px" ){
		console.log($(".all_ul").css("top"));
		$(".all_ul").css("top","-420px");
		$("#scoll").css("top","144px");
	}
})
$(".Letter a").mouseleave(function(){
	$(this).removeClass("activ");
})

//切换的搜索
$(".search_city").click( function(){
	$(".city_text").val("");
} )
$(".city_text").blur( function(){
	$(".city_text").val("输入城市名");
} )
//nav_rig nav下拉
$(".nav_rig li").mousemove( function(){
	$(this).addClass("active");
	$(this).find("span").css("color","#e62318");
	$(this).find(".active1").css("display","block");
	return false;
} ).mouseout(function(){
	$(this).removeClass("active");
	$(this).find("span").css("color","#717171");
	$(this).find(".active1").css("display","none");
})


//开门红搜索
$(".form").click( function(){
	$(".txt").val("");
} )
$(".txt").blur( function(){
	$(".txt").val("新春开门红");
} )
//菜单滑出
$(".con_le h2").mouseenter(function(){
	$(".menu_hid").show();
})	
$(".menu_hid").mouseleave(function(){
	$(".menu_hid").hide();
})

$(".menu_li").hover(
	function(){
		$(this).addClass("active2").siblings(".menu_li").removeClass("active2");
	     //$(".menu_cut").fadeIn(0).siblings(".menu_cut").fadeOut(0);
	     $(this).stop().animate({"padding-left":"5px"},300).siblings(".menu_li").animate({"padding-left":0},300);
	    $(this).find(".menu_cut").fadeIn(300);
	    $(this).find(".ico").css("background-position-x",0);
	},
	function(){
		$(this).removeClass("active2").stop().animate({"padding-left":"0"},300);
		$(this).find(".menu_cut").hide();
	    $(this).find(".ico").css("background-position-x","-21px");
	}
)