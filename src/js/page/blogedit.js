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
					console.log(res)
				},function(err){
					console.log(err)
				})
						
		},

		//调用函数
		transfer:function(){
			
		},


	};


	blogpaper.init();
	blogpaper.transfer();


});

