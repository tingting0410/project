<?php
	header("content-type:text/html;charset=utf-8");
	$conn = mysql_connect( "localhost","root","root" );
	mysql_select_db( "project" , $conn );
	mysql_query( "set names utf8" );
	//接数据
	$status = $_GET["status"];
	$uname = $_GET["uname"];
	$upwd = $_GET["upwd"];
	if( $status == "login" ){//登录功能
		$sql = "select * from infor where uname='$uname'";
		$res = mysql_query($sql);
		$arr = mysql_fetch_array($res);
		if( $arr ){
			if( $upwd == $arr["upwd"] ){
				echo 1;//登录成功
			}else{
				echo 0;//密码错误;
			}
		}else{
			echo 2;//用户名不存在;
		}
	}else if( $status == "register" ){//注册功能
		$sql = "insert into infor(uname,upwd) values('$uname','$upwd')";
		$row = mysql_query($sql);
		if( $row ){
				echo 1;//注册成功;
			}else{
				echo 0;//注册失败;
			}
	}else if( $status == "name"  ){
		$sql = "select * from infor where uname='$uname'";
		$res = mysql_query($sql);
		$arr = mysql_fetch_array($res);
		if( $arr ){
			echo 2;//该用户名已占用;
		}else{
			echo 0;
		}
	}
	
?>