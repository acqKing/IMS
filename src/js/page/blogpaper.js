/**
 *blogpaper
 * @author: qking
 **/
require.config({
	baseUrl: MIS.STATIC_ROOT
});
require(['lib/jquery', 'module/blogitem','util/funcTpl','util/request'], function($, blogitem,funcTpl,request) {
	
	var blogpaper = {
		init: function() {
            /*将页面比较大的逻辑提出来，写在js/module,在此处调用*/
			blogitem();
			
			request.ajax(
				'GET',
				'/api/index'
				).then(function(res){
					localStorage.setItem("identify","personal");
					// if(){
					// 	localStorage.setItem("identify","personal");
					// }
					console.log(res)
			
				},function(err){
					console.log(err)
				})
						
		},

		//调用函数
		transfer:function(){
			blogpaper._identify();
		},

		//判断是否为本人，若是本人生成修改博客按钮
		_identify(){
			var identify=localStorage.getItem("identify");
			if (identify=="personal") {
				var change=document.createElement("div");
				change.class=change;
				change.innerHTML='<div>'+
					 '<div class="card">'+
           				 '<a href="blogedit.html">'+'<button class="btn btn-info" >修改</button>'+'</a>'+
           				       '<button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal">'+
			              '删除'+
			            '</button>'+

			            '<div class="modal fade modalbox" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">'+
			              '<div class="modal-dialog" role="document">'+
			                '<div class="modal-content">'+
			                  '<div class="modal-header">'+
			                    '<h5 class="modal-title" id="exampleModalLabel" style="display:inline">&nbsp!&nbsp!&nbsp!&nbsp!&nbsp!</h5>'+
			                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
			                      '<span aria-hidden="true">&times;</span>'+
			                    '</button>'+
			                  '</div>'+
			                  '<div class="modal-body">'+
			                   '您确定要删除该博客'+
			                  '</div>'+
			                  '<div class="modal-footer">'+
			                    '<button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>'+
			                    '<button type="button" class="btn btn-primary news">确定</button>'+
			                  '</div>'+
			                '</div>'+
			              '</div>'+
			            '</div>'+
       				 '</div>'+
				'</div>';
				$(".index")[0].append(change);			
			// 	$("#modify").onclick=function(){
			// 		alert(1);
			// 		window.local.open("blog.html");
			// }
			}

		}




	};


	blogpaper.init();
	blogpaper.transfer();


});



