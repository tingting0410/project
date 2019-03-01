//放大镜
window.onload = function(){
	var $smallImg = $(".small img"),
		$bigImg = $(".big img"),
		$list = $(".bottom li"),
		$box = $(".magn"),
		$mask = $("#mask"),
		smallW = $smallImg.eq(0).width(),
		smallH = $smallImg.eq(0).height();
		$list.mouseenter( function(){
			var index = $(this).index();
			$smallImg.eq(index).show().siblings("img").hide();
			$bigImg.eq(index).show().siblings("img").hide();
		} )
		
		$(".small").on({
			"mouseenter":function(){
				$("#mask").show();
				$(".big").show();
			},
			"mouseleave":function(){
				$("#mask").hide();
				$(".big").hide();
			},
			"mousemove":function(e){
				var bigimgW = $bigImg.eq(0).width();
				var bigimgH = $bigImg.eq(0).height();
				var e = e || event;
				var x = e.pageX - $box.offset().left - $mask.width()/2;
				var y = e.pageY - $box.offset().top - $mask.height()/2;
				var maxL = $box.width()-$mask.width();
				var maxT = $box.height()-$mask.height();
				x = Math.min(Math.max(0 , x) , maxL);
				y = Math.min(Math.max(0 , y) , maxT);
				$mask.css({
					left:x,
					top:y
				})
				var bigImgLeft = x*bigimgW/smallW;
				var bigImgTop= y*bigimgH/smallH;
				$(".bigImage").css({
					left:-bigImgLeft,
					top:-bigImgTop
				})
			}
		})
}
//滚动条 门店导购
var bar = document.getElementsByClassName("tiao_1")[0];
var box = document.getElementsByClassName("magn_guide")[0];
var tiao = document.getElementsByClassName("tiao")[0];
bar.onmousedown=function(e){
	var e = e || event;
	var disy = e.offsetY || e.layerY;
	document.onmousemove = function(e){
		var e = e || event;
		var y = e.pageY - disy - box.offsetTop-42;
		var maxT = tiao.offsetHeight - bar.offsetHeight;
		y = Math.min(Math.max( 0 , y ) , maxT) ;
		bar.style.top = y + "px";
		//内容向上滚动的距离
		//滚动条向下滚动的距离(内容高度-可视区高度)/(可视区高度-滚动条高度)
		var y1 = y*($(".guide_all").height()-$(".guide_bot").height())/(tiao.offsetHeight-bar.offsetHeight);
		$(".guide_all").css("margin-top",-y1);
	}
	document.onmouseup = function(){
		document.onmousemove = document.onmouseup = null;
	}
	return false;
}

	
//加减数量
var index = 1;
$(".num_jia").click(function(){
	index++;
	$(".num").html(index);
})
$(".num_jian").click(function(){
	index--;
	if( index < 1 ){
		index = 1;
	}else{
		$(".num").html(index);
	}
})

//切换  详情 评价 。。
$(".eval_p").click(function(){
	var index = $(this).index();
	$(this).addClass("active9").siblings().removeClass("active9");
	$(".hide").eq(index).show().siblings().hide();
})

//请求服务器  将点击的商品显示在详情页
$(function(){
	var str = location.href;
	str = str.split("?")[1];
	var arr = str.split("&");
	var id = arr[0].split("=")[1];
	var price = arr[1].split("=")[1];
	$.ajax({
		type:"get",
		url:"list.json",
		async:true,
		success:function(json){
			var arr = json;
			var str = "";
			for( var i = 0 ; i < arr.length;i++ ){
				if( id == arr[i].id ){
					$(".price_2").html(`￥${arr[i].price}`);
					$(".jia_car").click(function(){
						var brr = getCookie("shoplist");
						for( var j = 0 ; j < brr.length ; j++ ){
								if( brr[j].id == arr[i].id ){
								brr[j].count = parseInt(brr[j].count)+parseInt($(".num").html());
								}else{
									var json = {
									id:arr[i].id,
									src:arr[i].src,
									price:arr[i].price,
									count:1
								}
								json.count = $(".num").html();
								brr.push(json);
							}
								break;
						}
						setCookie("shoplist",JSON.stringify(brr));
						if( !confirm("确定-继续购买，取消-跳转到购物车页面") ){
							location.href = "shopcar.html";
						}
					})
					break;
				}
			}
		}
	});
	
})
