
define(['lib/jquery', 'util/funcTpl'], function($,funcTpl) {
     
    var blogitem = {
        init:function(){
            //$("#index").append(funcTpl(blogitem.tpl));
            //页面跳转
            blogitem._turn();             
            //博客删除
            blogitem._del();
            //博客编辑
            blogitem._blog();  
            //博客发表
            blogitem._publish();
        },

        //页面跳转
        _turn(){
            var btnindex=$(".index")[0];
            var btnpersonal=$(".personal")[0];
            var btnwrite=$(".write")[0];
            var btnset=$(".clock")[0];
            var index=$(".page").eq(0);
            var personal=$(".page").eq(1);
            var write=$(".page").eq(2);
            btnindex.onclick=function(){
                personal.css('display','none');
                write.css('display','none');
                index.css('display','block');
            }
           btnpersonal.onclick=function(){
                index.css('display','none');
                write.css('display','none');
               personal.css('display','block');
            }
           btnwrite.onclick=function(){
                index.css('display','none');
                personal.css('display','none');
                write.css('display','block');
            }
          },  
        //获取时间
        _time(){
            var d = new Date();
            var vYear = d.getFullYear();                  
            var vMonth=d.getMonth()+1;
            var vDay=d.getDate();
            var vtime=vYear+'/'+vMonth+'/'+vDay;
            return vtime;
        },

         //博客删除
         _del(){
            var dele=$(".del");
            for(m=0;m<dele.length;m++){
                dele[m].onclick=function(){
                    var n=dele.index(this);
                    $(".personal-blog").eq(n).remove();  
                    blogitem._blog(); 
                    blogitem._del();
                }
            }
         },


        //博客编辑
        _blog(){
            var btn=$(".btnset"); 
            var k=0;
            for(var i=0;i<btn.length;i++){ 
                btn[i].onclick=function(){
                    //btn
                    var a=btn.index(this);
                    for(var j=0;j<btn.length;j++){
                        btn[j].disabled=true;
                        $(".del")[j].disabled=true;
                    }
                    btn.eq(a).css('display','none');
                    $(".del").eq(a).css('display','none');
                    var btn0=document.createElement('button');
                    var btn1=document.createElement('button');
                    btn0.type='button';
                    btn0.className='btn btn-outline-secondary keep';
                    btn0.id='keep';
                    btn0.innerHTML='保存';
                    $(".btnboth").eq(a).append(btn0);

                    btn1.type='button';
                    btn1.className='btn btn-outline-secondary cansal';
                    btn1.id='cansal';
                    btn1.innerHTML='取消';
                    $(".btnboth").eq(a).append(btn1);

                    $(".keep").css('margin-right','10px')
                    
                    //content
                    var title=$(".title").eq(a).html();
                    var content=$(".content").eq(a).html();

                    $(".title").eq(a).html(
                        '<div class="input-group">'+
                          '<span class="input-group-addon">'+'标题'+'</span>'+
                          '<input type="text" class="form-control changetitle"   id="changetitle" placeholder="" aria-label="Username" aria-describedby="basic-addon1">'
                        +'</div>')
                    $(".content").eq(a).html(
                          '<div class="form-group">'+
                            '<textarea class="form-control changecontent" id="exampleFormControlTextarea1" rows="8">'+'</textarea>'+
                          '</div>'
                    )
                    $(".changetitle")[k].value=title;
                    $(".changecontent")[k].innerHTML=content;
                        //保存
                     var sure=function(){
                            $(".btnboth").eq(a).html(
                                    '<button type="button" class="btn btn-outline-secondary btnset" id="btn">'+
                                    '编辑'+
                                    '</button>'+
                                    '<button type="button" class="btn btn-outline-secondary del" id="del">'+
                                    '删除'+
                                    '</button>'
                            )
                        for(var j=0;j<btn.length;j++){
                            btn[j].disabled=false;
                            $(".del")[j].disabled=false;
                        } 
                        blogitem._blog();                      
                    }                    
                    btn0.onclick=function (){
                        var ctitle=$("#changetitle")[0].value;
                        var ccontent=$("#exampleFormControlTextarea1").val();
                        $(".title").eq(a).html(ctitle);
                        $(".content").eq(a).html(ccontent);
                        $(".time").eq(a).html(blogitem._time());
                    sure();
                    blogitem._del();
                    }
                    //取消
                    btn1.onclick=function(){
                        $(".title").eq(a).html(title);
                        $(".content").eq(a).html(content);
                    sure();
                    blogitem._del();
                    }
                    k++;
                }
            }      
         },               
         _publish(){ 
            $(".Publish")[0].onclick=function(){
                var writetitle=$(".writetitle")[0].value;
                var writecontent=$("#writecontent").val();
                var page=$(".page");
                for(var i=0;i<page.length;i++){
                    page[i].index=i;
            }
                if(writetitle!=false&&writecontent!=false){
                    $(".page").eq(2).css('display','none');
                    $(".page").eq(1).css('display','block');
                    var personalcreate=function(){
                        var Article=document.createElement('div');
                        Article.className="personal-blog";
                        Article.id="personal-blog";
                         Article.innerHTML=
                            '<div class="jumbotron jumbotron-fluid personal-blog" id="personal-blog">'+
                              '<div class="container">'+
                                 '<h2 class="display-3 title atitle" id="title">'+'</h2>'+
                                '<p class="lead content acontent" id="content">'+'</p>'+
                                '<p class="text-right time" id="time">'+'</p>'+
                                '<p class="pull-right btnboth" id="btnboth">'+'<button type="button" class="btn btn-outline-secondary btnset " id="btn">'+'编辑'+'</button>'+'<button type="button" class="btn btn-outline-secondary del" id="del">'+'删除'+'</button>'+'</p>'+
                              '</div>'
                            '</div>' ;   
  
                        var sp1=$(".personal-blog")[0];
                        var sp2=$(".personal")[1];
                        sp1.before(Article);
                        $(".atitle").eq(0).html(writetitle);
                        $(".acontent").eq(0).html(writecontent); 
                        $(".time").eq(0).html(blogitem._time());     
                        blogitem._del();
                        blogitem._blog(); 

                    }
                    personalcreate();
                    var indexcreate=function(){
                         var Article=document.createElement('div');
                        Article.className="index-blog";
                        Article.id="index-blog";
                        Article.innerHTML=
                                '<div class="jumbotron jumbotron-fluid" id="index-blog" >'+
                                  '<div class="container">'+
                                    '<h2 class="display-3 indextitle btitle" >'+'</h2>'+
                                    '<p class="lead indexcontent bcontent" id="content">'+'</p>'+
                                    '<p class="text-right createtime" id="time">'+'</p>'+
                                  '</div>'+
                            '</div>'
                             ;  
                        var sp3=$(".index-blog")[0];
                        sp3.before(Article);
                        $(".btitle").eq(0).html(writetitle);
                        $(".bcontent").eq(0).html(writecontent);
                        $(".createtime").eq(0).html(blogitem._time())
                        blogitem._del();
                        blogitem._blog(); 
                        $(".page").eq(0).css('display','none');
                    }
                   indexcreate();
                }

                $(".writetitle")[0].value="";
                $(".writecontent")[0].value=" ";
            }

         },

        tpl:function(){
            /*
                
            */
        }

    }
    return blogitem.init;
});


  


        


         



