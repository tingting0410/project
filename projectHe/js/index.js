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
$(".Letter a").not($(".fa")).mouseenter(function(){
	flag = false;
	$(this).addClass("activ")
	       .siblings()
	       .removeClass("activ");
	var Top = $(this).index()*30 ;
	$(".all_ul").stop().animate( {"top":-Top} , 1000 );
	$("#scoll").stop().animate( { "top": $(this).index()*10} , 1000 )
})
$(".Letter a").mouseleave(function(){
	$(this).removeClass("activ");
})


//滚轮滑动
$(".city").on("mousedown","span",function(){
	$(".city").mousemove(function(e){
		var e = e || event;
		y = e.pageY - $(".all_city").offset().top -($("#scoll").height())/2;
		maxT = $(".all_scroll").height()-$("#scoll").height();
		y = Math.min(Math.max( 0 , y ) , maxT);
		$("#scoll").css("top",y);
	})
	$(".city").mouseup(function(){
		$(".city").on("mousedown","span",function(){});
	})
	return false;
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
//banner图轮播
$(function(){
	var arr = ["#9a231b","#eef3f5","#de3435","#e8eaea","#4f3a29","#f2efea","#179bf4","#ffffff"]
	$("#ban").css("background-color",arr[0]);
	var timer = setInterval( auto ,2000 );
	var index = 0 ;
	function auto(){
		index++;
		if( index == $(".ban_all li").size() ){
			index = 0 ;
		}
		$(".bottom_cut span").eq(index).addClass("cut").siblings().removeClass("cut");
		//$(".ban_all li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
		$(".ban_all li").eq(index).stop().animate({"opacity":1 } , 0).siblings().animate({"opacity":0} , 0);
		$(".ban_all li").eq(index).stop().animate({"left":"50%"} , 1500).siblings().animate({"left":"49%"} , 1500);
		$("#ban").css("background-color" ,arr[index]).stop().animate({"opacity":1 } , 0).siblings("#ban").animate({"opacity":0} , 0);
	}
	$(".bottom_cut span").mouseenter( function(){
		clearInterval( timer );
		index = $(this).index()-1;
		auto();
	} )
	$(".bottom_cut span").mouseleave( function(){
		timer = setInterval( auto , 2000 );
	} )
	
})
//菜单滑出
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



//控制切换每隔类型  type 各种模块  客厅  卧室 等
function lun(a){
	var class1 = document.getElementsByClassName(a)[0];
	var timer = setInterval( auto, 3000 );
	var index = 0;
	function auto(){
		index++;
		if( index == $(class1).find(".btn").size() ){
			index = 0;
		}
		$(class1).find(".btn").eq(index).addClass("active4").siblings().removeClass("active4");
		$(class1).find(".type_cut").eq(index).stop().fadeIn(1000).siblings().fadeOut(500);
	}
	$(class1).find(".btn").mouseenter( function(){
		clearInterval(timer);
		index = $(this).index()-1;
		auto();
	} )
	$(class1).find(".btn").mouseleave( function(){
		
		timer = setInterval( auto, 3000 );
	} )
}
$(function(){
	lun("lun1");
})
$(function(){
	lun("lun2");
})
$(function(){
	lun("lun3");
})
$(function(){
	lun("lun4");
})
$(function(){
	lun("lun5");
})
$(function(){
	lun("lun6");
})
$(function(){
	lun("lun7");
})





// 美乐乐体验馆
$(".btn_r").click( function(){
	$(".muse_ul").animate( {"marginLeft":"-935px"} ,1300 ,function(){
		$(".muse_ul").css("margin-left",-20)
					 .find(".muse_li:first")
					 .appendTo(".muse_ul")
					 .find(".muse_li:first")
					 .appendTo(".muse_ul");
	} )
} )
$(".btn_l").click( function(){
	$(".muse_ul li:last").prependTo(".muse_ul");
	$(".muse_ul li:last").prependTo(".muse_ul");
	$(".muse_ul li:last").prependTo(".muse_ul");
	$(".muse_ul").css("margin-left",-935);
	$(".muse_ul").animate({marginLeft:-20},1300);
} )

//换名字
var s = location.href;
var arr = [];
arr = s.split("?");
s1 = arr[1];
arr1 = s1.split("=");
s2 = arr1[1];
sid = arr1[0];
if( sid == "id" ){
	$(".login_zhu a").eq(0).html(s2);
	$(".login_zhu a").eq(1).html("[退出]").css("color","red");
}
