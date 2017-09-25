
define(['lib/jquery', 'util/funcTpl'], function($,funcTpl) {
     
    var personalLoadingData = {
        init:function(){
                var load=function(){
                    var i=0;
                    $.ajax({
                        dataType:"json",
                        url:"http://rapapi.org/mockjsdata/26117/pms/blog/selectOwnAll.do",
                        type:"post",
                        success:function(json){
                                for(i;i<1;i++){
                                    var list_group=document.createElement('div');
                                        list_group.className='list-group';
                                        list_group.innerHTML=
                                            '<a href="blogpaper.html" class="list-group-item list-group-item-action list-group-item-success bloglist"></a>';
                                    $(".content")[0].append(list_group);  
                                    $(".bloglist").eq(i).html(json.title)     
                                }
                                i++;                            
                        },
                        error:function(json){
                            console.log("error");
                        }
                    })                     
                }

                //加载所有blog
                load();
               
        },
    }
    return personalLoadingData.init;
});


