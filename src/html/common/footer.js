(function(){
	"use strict"
	var footerScript = document.getElementsByTagName('script'),
		path;
	for(var i = footerScript.length; i > 0; i--) {
	    path = footerScript[i-1].getAttribute('data-js');
		if(path != null){
			break;	
		}
	}
	var footerTpl = function(){
		/*
        <footer>
    <p class="pull-right"><a href="#top">回到顶部</a></p>
    <p class="text-center">Copyright &copy2017 经济管理学院信管工作室</p>
		</footer>
		*/
	}
	var footer = footerTpl.toString().replace(/^[^\/]+\/\*!?/, '').replace(/\*\/[^\/]+$/, '') +
				'<script src="/js/lib/r.js" data-main="/js/page/' + path + '"></script>'+
			  '</div></body></html>';
	document.write(footer);

})();