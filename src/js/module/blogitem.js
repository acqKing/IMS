
define(['lib/jquery', 'util/funcTpl'], function($,funcTpl) {
     
    var blogitem = {
        init:function(){
            $("#index").before(funcTpl(blogitem.tpl));
            $("#index").append(funcTpl(blogitem.putout));

            // $(".man").eq(0).css("background","white");
            // alert($(".man").eq(0).css("background"));

            //权限管理的人员选择
            var management=$(".management")[0];
            management.onclick=function(){
                var a=[0,0,0,0,0];
                for(var i=0;i<$(".man").length;i++){
                     $(".man").eq(i).css("background","white");
                }
                for(var i=0;i<$(".man").length;i++){
                    $(".man")[i].index=i;
                          $(".man")[i].onclick=function(){
                            k=this.index;
                            if(a[k]==0){
                                $(".man").eq(k).css("background","#5CB85C");
                                a[k]=1;
                            }else{
                                $(".man").eq(k).css("background","white");
                                a[k]=0;
                            }
                        }
                }  
            }

        },
        tpl:function(){
            /*  
            <style type="text/css">
                .man{
                    cursor:pointer;
                    background-color:white;
                }
            </style>

        <div class="collapse navbar-collapse nav-head" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right nav-list">
                <li>
                    <a href="blog.html">博客首页</a>
                </li>
                
                <li>
                    <a href="blogpersonal.html">我的博客</a>
                </li>
                
                <li>
                    <a href="blogedit.html">写博客</a>
                </li>
                
                <li class="management">
                      <a href="#" data-toggle="modal" data-target="#about-modal">权限设置</a>             
                <li>
                    <a href="#" data-toggle="modal" data-target="#about-modal1">好友</a>
                </li>
                <li>
                     <a href="index.html" style="position:relative;font-size:16px;color:white;">退出</a>
                </li>
            </ul>
    </div>
             */
        },

        putout:function(){
            /*
                <!-- 权限设置 -->
                <div class="modal fade" id="about-modal" tabindex="-1" role="dialog" aria-labelledby="modal-label"
                     aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">

                            <div class="modal-header text-center">
                                <button type="button" class="close" data-dismiss="modal"><span
                                        aria-hidden="true">&times;</span><span class="sr-only">关闭</span></button>
                                <h4 class="modal-title" id="modal-label">权限设置</h4>
                            </div>

                            <div class="modal-body text-center">
                                <nav class="navbar navbar-light bg-light" style="margin:0px;">
                                      <form class="form-inline" style="margin-bottom:0;">
                                        <input class="form-control mr-sm-2 " type="text" placeholder="Search" aria-label="Search"  style="position:relative;width:70%;margin:0px auto;margin-bottom:10px;">
                                        <button class="btn btn-success my-2 my-sm-0" type="button" style="position:relative;margin-bottom:10px;">Search</button>
                                      </form>
                                </nav>
                                <ul class="list-group" style="position:relative;width:80%;margin:0px auto;">
                                  <li class="list-group-item man">Cras justo odio</li>
                                  <li class="list-group-item man">Dapibus ac facilisis in</li>
                                  <li class="list-group-item man">Morbi leo risus</li>
                                  <li class="list-group-item man">Porta ac consectetur ac</li>
                                  <li class="list-group-item man">Vestibulum at eros</li>
                                </ul>    
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-info" data-dismiss="modal">确定</button>
                            </div>

                        </div>
                    </div>
                </div>




                <!-- 查询好友 -->
                <div class="modal fade" id="about-modal1" tabindex="-1" role="dialog" aria-labelledby="modal-label"
                     aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">

                            <div class="modal-header text-center">
                                <button type="button" class="close" data-dismiss="modal"><span
                                        aria-hidden="true">&times;</span><span class="sr-only">关闭</span></button>
                                <h4 class="modal-title" id="modal-label">查询好友</h4>
                            </div>

                            <div class="modal-body text-center">
                                <nav class="navbar navbar-light bg-light" style="margin:0px;">
                                      <form class="form-inline" style="margin-bottom:0;">
                                        <input class="form-control mr-sm-2 " type="text" placeholder="Search" aria-label="Search"  style="position:relative;width:70%;margin:0px auto;margin-bottom:10px;">
                                        <button class="btn btn-success my-2 my-sm-0" type="button" style="position:relative;margin-bottom:10px;">Search</button>
                                      </form>
                                </nav>
                                <ul class="list-group" style="position:relative;width:80%;margin:0px auto;">
                                  <li class="list-group-item"><a href="blogpersonal.html">Cras justo odio</a></li>
                                  <li class="list-group-item"><a href="blogpersonal.html">Cras justo odio</a></li>
                                  <li class="list-group-item"><a href="blogpersonal.html">Cras justo odio</a></li>
                                  <li class="list-group-item"><a href="blogpersonal.html">Cras justo odio</a></li>
                                  <li class="list-group-item"><a href="blogpersonal.html">Cras justo odio</a></li>
                                </ul>    
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-info" data-dismiss="modal">确定</button>
                            </div>

                        </div>
                    </div>
                </div>
             */
        }


    }
    return blogitem.init;
});


