
define(['lib/jquery', 'util/funcTpl'], function($,funcTpl) {
     
    var item = {
        init:function(){
            console.log(2)
            console.log(item.tpl);
            $("#index").append(funcTpl(item.tpl));
        },
        tpl:function(){
            /*
             <div>item部分</div>
             <p>11111</p>
             <p>22222</p>
            */
        }

    }
    return item.init;
});


