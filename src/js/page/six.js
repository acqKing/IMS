
  $(document).ready(function () {
      //站内搜索开始
      //资料搜索
      $("#ziliao").click(function(){
          $(".sousuo").html("团队资料"+"<b class='caret'></b>");
          $(".getit").click(function(){
            /*        $.ajax({
             type："POST",
             });
             */      });
      });
      $("#xiangmu").click(function(){
          $(".sousuo").html("团队项目"+"<b class='caret'></b>");
      });
      $("#chengyuan").click(function(){
          $(".sousuo").html("团队成员"+"<b class='caret'></b>");
      });
      //站内搜索结束
    //创建公告开始
    $(".putgongg").click(function(){
      $.ajax({
        type:"GET",
        url:"http://rapapi.org/mockjsdata/24500/team/team/show.do",
        data: {
        //  createTime:    ,
          //teamName:      ,
        //  createBy:      ,
          title:$(".title").val(),
          context:$(".gonggao").val()
        },
        dataType: "json",
        success: function(data){
          if (data.success) {
            alert("创建成功！");
          } else{
            alert("出现错误：" + data.msg);
          }
        },
        error: function(jqXHR){
          alert("发生错误" + jqXHR.status);
        },

      });
    });
    //创建公告结束

    //修改团队公告
    $(".changethegg").click("")
  });

