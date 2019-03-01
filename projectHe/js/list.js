//鼠标滑过 图片隐藏  字显示
$(".brand_a").mouseenter(function(){
	$(this).parent().find(".a_ou").show();
})
$(".a_ou").mouseleave(function(){
	$(this).hide();
})
//销量  评价  鼠标滑过的样式
$(".attr li").mouseenter(function(){
	$(this).find("a").addClass("active5").end().siblings().find("a:not(.first)").removeClass("active5");
})
$(".attr li").mouseleave(function(){
	$(this).find("a:not(.first)").removeClass("active5");
})
//鼠标滑过每个商品的时候  similar 显示   shop_car 显示 同时list_lis 边框为红色  
$(".page_li").on("mouseenter","li",function(){
	$(this).find(".similar").fadeIn(200);
	$(this).find(".shop_car").fadeIn(200);
	$(this).addClass("active6").siblings().remove("active6");
})
$(".page_li").on("mouseleave","li",function(){
	$(this).find(".similar").fadeOut(200);
	$(this).find(".shop_car").fadeOut(200);
	$(this).removeClass("active6");
})

//ajax json 数据
window.onload = function(){
	var index = 1 ;
	var pageNum = 16;
	var f = true;
	var lis = document.getElementsByClassName("page_pan");
	show();
	function show(){
		var deff = $.ajax({
			type:"get",
			url:"list.json"
		});
		deff.done(function(res){
			var str = "";
			for( var i = (index-1 )*pageNum; i < index*pageNum; i++ ){
				if( i < 160 ){
					var pro = res[i];
					str+=`<li class="list_li">
						<div class="list_lis">
							<a class="tu" href="details.html?id=${pro.id}&price=${pro.price}"><img src="images/${pro.src}"/></a>
							<div class="similar">
								<span class="similar_s"></span>
								<a class="similar_a" href="">找相似</a>
							</div>
							<div class="price clear_fix">
								<p class="money">
									<span>￥</span>${pro.price}
								</p>
								<p class="yuan">￥9808</p>
							</div>
							<a class="d_name" href="">${pro.ping}</a>
							<div class="tage">
								<span>已售<i>123</i></span>
								<span>评论<i class="a_i">100</i></span>
							</div>
							<div class="shop_car">
								<a class="car_a" href=""><i class="i1"></i><span>对比</span></a>
								<a class="car_a" href=""><i class="i1 i2"></i><span>收藏</span></a>
								<button class="car_a a_car" data-pid="${pro.id}" data-price="${pro.price}" data-src="${pro.src}"><i class="i1 i3"></i><span class="sp9">加入购物车</span></button>
							</div>
						</div>
					</li>`;
				}
			}
			$(".page_li").html(str);
			for( var j = 0 ; j < $(".list_li").size() ; j++ ){
				if( j % 4 == 0 ){
					$(".list_li").eq(j).css("clear","both");
				}
			}
			
			//确定页数
			var total = Math.ceil(res.length/pageNum);
			if(f){
				var page = "";
				for( var i = 1 ; i <= total ; i++ ){
					page += `<p>${i}</p>`;
				}
				$(page).insertAfter(".page_sp");
			}
			$(".page_pan p").eq(index-1).addClass("active7").siblings().removeClass("active7");
		})
	}
	//点击页码
	$(".page_pan").on( "click" , "p" ,function(){
		f = false;
		index = $(this).html();
		show();
	} )
	
	//上一页 下一页
	$(".pre").click( function(){
		f = false
		index--;
		if( index == 0  ){
			index = 1;
		}else{
			show();
		}
	})
	$(".next").click( function(){
		f = false
		index++;
		if( index == 11 ){
			index = 10;
		}else{
			show();
		}
	} )
	
	
	//添加购物车功能(使用事件委托)
	var arr = [];
	$(".page_li").on("click","button",function(){
		//获取当前购买的信息存到cookie中
		var json = {};
		json = {
			id:$(this).data("pid"),
			price:$(this).data("price"),
			src:$(this).data("src"),
			count:1
		}
		console.log(json)
		var flag = true;
		//假设为true时  可以向数组中push一个对象
		var list = getCookie("shoplist");
		if( list.length != 0 ){
			for( var i = 0 ; i < list.length ; i++ ){
				if( json.id == list[i].id ){
					list[i].count++;
					arr = list;
					flag = false;
					break;
				}
			}
		}
		if( flag ){
			arr.push(json);
		}
		setCookie( "shoplist" , JSON.stringify(arr) );
		if( !confirm("点击确定-继续购买 ， 点击取消-跳转到购物车结算") ){
			location.href = "shopcar.html";
		}
	})
	
}
		






		
		
	