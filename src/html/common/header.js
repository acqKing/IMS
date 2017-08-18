(function() {
	
	"use strict"
	var companyId,companyName;
	var headerCss = document.getElementsByTagName('script'),
		path, cssPath, headTitle = "";
	var temp = '';

	// if (location.host == 'localhost:8080' || location.host == '202.202.43.7' ||
	// 	location.host == '172.22.1.159') {
	// 	temp = '';
	// } else {
	// 	temp = '';
	// }

	for(var i = 0; i < headerCss.length; i++){
	    cssPath = headerCss[i].getAttribute('data-css');
		headTitle = headerCss[i].getAttribute('data-title');
		if(cssPath != null && cssPath != undefined){

			//css路径
			cssPath = '<link rel="stylesheet" href="'+temp+'/css/page/' + cssPath + '.css"/>'
			break;	
		}

	}
	var html = '<!DOCTYPE html>'+
				'<html lang="en">'+
				'<head>'+
					'<meta charset="UTF-8">'+
					'<meta name="viewPort" content="width=device-width, initial-scale=1.0">'+
					'<title>'+headTitle+'</title>'+
					'<link rel="stylesheet" href="/css/lib/bootstrap.css"/>'+
					'<link rel="stylesheet" href="/css/common/global.css"/>'+
					'<link rel="stylesheet" href="/css/common/header.css"/>'
					+cssPath+
					'<script>'+	
						'var MIS = {};'+
						'MIS.STATIC_ROOT = "/js"'+
					'</script>'+
					'<script src="'+temp+'/js/lib/jquery.js"></script>'+
					// '<script src="'+temp+'/js/modules/api.js"></script>'
					'<script src="'+temp+'/js/lib/bootstrap.js"></script>'+
				'</head>';
				
    var headerTpl = function() {

		/*
       <nav class="navbar navbar-inverse navbar-fixed-top">
    	<div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#demo-navbar" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">信管工作室</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div <div class="collapse navbar-collapse" id="demo-navbar">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">首页<span class="sr-only">(current)</span></a></li>
                <li><a href="#">用户管理</a></li>
                <li><a href="#">团队管理</a></li>
                <li><a href="#">博客管理</a></li>
                <li><a href="#">文件管理</a></li>
                <li><a href="#">项目管理</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">关于我们 <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#introduce" >工作室介绍</a></li>
                        <li><a href="#information">最新信息</a></li>
                        <li><a href="#project">项目成果</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">加入我们</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">。。。</a></li>
                    </ul>
                </li>
            </ul>
            <!--<form class="navbar-form navbar-left">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search">
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
            </form>-->


			<ul class="nav navbar-nav navbar-right">
                <li><a type="button" class="btn btn-inverse" data-toggle="modal" data-target="#myModal">
                    <!-- Button trigger modal -->
                    登录
                </a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">账户管理 <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">账号注册</a></li>
                        <li><a href="#">修改密码</a></li>
                        <li><a href="#">相关帮助</a></li>

                    </ul>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>

<!-- sign in-->
<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">登录</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="Username">用户名</label>
                        <input type="email" class="form-control" id="Username" placeholder="请输入你的邮箱">
                    </div>
                    <div class="form-group">
                        <label for="InputPassword">密码</label>
                        <input type="password" class="form-control" id="InputPassword" placeholder="请输入你的密码">
                    </div>

                    <div class="checkbox">
                        <label>
                            <input type="checkbox"> 记住密码
                        </label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="submit" class="btn btn-inverse">登录</button>
            </div>
        </div>
    </div>
</div>

   ;



		*/
	};

	var  header = html +'<div class="wrapper">'+ headerTpl.toString().replace(/^[^\/]+\/\*!?/, '').replace(/\*\/[^\/]+$/, '');
	document.write(header);

	


})();