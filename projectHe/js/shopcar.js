window.onload = function(){
	//获取cookie数据
	var list = getCookie("shoplist");
	var str = "";
	for( var i = 0 ; i < list.length ; i++ ){
		var shopinfo = list[i];
		str += '<div class="shop-item clearfix">'+
					'<p class="fl"><input type="checkbox" class="ck"/></p>'+
					'<img class="fl" src="images/'+ shopinfo.src +'" alt="" />'+
					'<p class="fl">'+ shopinfo.id +'</p>'+
					'<span class="fl">'+ shopinfo.price +'元</span>'+
					'<p class="fl count" '+
						'data-id="'+ shopinfo.id +'" '+
						'data-price="'+ shopinfo.price +'" data-count="'+ shopinfo.count +'"'+
						'data-name="'+ shopinfo.id +'" data-src="'+ shopinfo.src +'"'+
						'>'+
						'<span class="updateCount" data-number="1">+</span>'+
						'<span class="shop-count">'+ shopinfo.count +'</span>'+
						'<span class="updateCount" data-number="-1">-</span>'+
					'</p>'+
					'<em class="fl sumPrice">'+ (shopinfo.count * shopinfo.price) +'元</em>'+
					'<i class="fl delBtn">删除</i>'+
				'</div>';
	}
	$(".shoplist").html(str);
	//全选
	$("#selectAll").click( function(){
		$(".ck").prop( "checked" , $(this).prop("checked") );
		sum();
	} )
	//点击复选框 结算
	$(".ck").click(function(){
		sum();
	})
	//结算
	function sum(){
		var money = 0 ;
		var count = 0;
		$(".ck:checked").each(function(){
			count += parseInt( $(this).parent().parent().find(".shop-count").html());
			money += parseInt( $(this).parent().parent().find(".sumPrice").html());
		})
		$(".count2").html(count);
		$(".money2").html(money);
	}
	//加减操作
	$(".updateCount").click( function(){
		var num = $(this).data("number");
		var count = $(this).parent().find(".shop-count").html();
		if( count == 1 && num == "-1" ){
			return;
		}
		var id = $(this).parent().data("id");
		for( var i = 0 ; i < list.length; i++ ){
			if( list[i].id == id ){
				list[i].count += num;
				setCookie("shoplist" , JSON.stringify( list ));
				$(this).parent().find(".shop-count").html(list[i].count);
				$(this).parent().next().html( list[i].count*list[i].price  + "元");
				sum();
				break;
			}
		}
	} )
	//删除操作
	$(".delBtn").click( function(){
		var id = $(this).parent().find(".count").data("id");
		for( var i = 0 ; i < list.length ; i++ ){
			if( list[i].id == id ){
				list.splice(i , 1);
				setCookie("shoplist" , JSON.stringify(list));
				$(this).parent().remove();
				break;
			}
		}
	} )
}








