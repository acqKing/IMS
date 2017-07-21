/**
 *首页
 * @author: qking
 **/
require.config({
	baseUrl: MIS.STATIC_ROOT
});
require(['lib/jquery', 'module/item'], function($, item) {
	
	var index = {
		init: function() {

            /*将页面比较大的逻辑提出来，写在js/module,在此处调用*/
			item();
			
		}
	};

	index.init();
	
});




