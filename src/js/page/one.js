$(document).ready(function(){
    var pNum;
    var totalPages;//总页数
    var totalCounts;//总条数
    var pageNow = 1;//当前页面

    //获取总信息条数
 /*    $("teamCounts").load("http://rapapi.org/mockjsdata/24500/team/team/teamaccounts.do" , function(responseText, textStatus, XMLHttpRequest){
        alert("re:" + responseText);

    });*/
 /*   $.getJSON('http://rapapi.org/mockjsdata/24500/team/team/teamaccounts.do',function(data){
        $('.teamCounts').empty();
        var html = ' ';
        $.each( data , function(commentIndex , comment){
            html += comment[data.counts];
        });
        $('teamCounts').html(html);
         alert(data.counts);
        //$('.teamCounts').html(data.counts);
    
    });
   
 */
//获取当前页面的数据
//  $.post("http://172.22.1.169:8080/team/team/show.do",
//      {
//          page:pageNow
//      },
//     function (data,satus) {
//      alert("a");
//      $(tbody).append("<tr></tr>");
//      for(var i=0;i<10;i++){
//          $(tr).append("<td>"+data.data.teamList[i].teamName+"</td><td>"+data.data.teamList[i].creatBy+"</td><td>"+data.data.teamlist[i].creatTime+"</td>");
//      }
//     }
//  );

    //获取页面内容
$.ajax({
    type:"post",
    url:"http://172.22.1.169:8080/team/show.do",
    data:{
        page:pageNow
    },
    success:function (data) {

        $(tbody).append("<tr></tr>");
        for(var i=0;i<10;i++){
            $(tr).append("<td>"+data.data.teamList[i].teamName+"</td><td>"+data.data.teamList[i].creatBy+"</td><td>"+data.data.teamlist[i].creatTime+"</td>");
        }
    },
    error:function(jqXHR) {
        alert("发生错误" + jqXHR.status);

    }
});

//获取总页数
   $.ajax({
        type:"GET",
        url: "http://172.22.1.169:8080/team/teampages.do",
        dataType:"json",
        success:function(data){
            if(data.success){
                alert("ok");
                $('.totalPages').empty();
                // totalCounts = data.counts;
                 totalPages = data.pages;
            } else{
                alert("出现错误：" + data.msg);
                alert("第一个");
            }
        },
        error: function(jqXHR){
            alert("发生错误" + jqXHR.status);

        }

    });
//获取团队总数
   $.ajax({
       type:"GET",
       url:"http://172.22.1.169/team/teamccounts.do",
       dataType:"json",
       success:function (data) {
           if (data.success) {
               alert("ok");
               $('.teamCounts').empty();
               totalCounts = data.accounts;
           } else {
               alert("出现错误：" + data.msg);
               alert("第一个");
           }
       },
       error:function (jqXHR) {
           alert("发生错误" + jqXHR.status);
           alert("aaa");

       }
   });
   //获取当前页码
    $(".pagination li").bind("click",function () {
        pageNow =this.val();
    });
    //获取第一页页码
    thisFirst = +$('.pageBody a:eq(0)').text();
    //获取最后一页页码
    thisLast = +$('.pageBody a:eq(4)').text();
    if (thisFirst === 1) {
        $('.pageTop a').hide();
    } else {
        $('.pageTop a').show();
    }
    if (thisLast === data.totalPages) {
        $('.pageBottom a').hide();
    } else {
        $('.pageBottom a').show();
    }

    //第一个点击
    $('pageTop a').click(function () {
        $('.pageBody').empty();
        if(thisFirst > 5){
            for(pNum = 0;pNum < 5; pNum++){
                $('.pageBody').append('<a href="#">'+(thisFirst-5+pNum) + '</a>');
            }
        }else {
            for (pNum = 1;pNum <= 5; pNum++){
                $('.pageBody').append('<a href="#">' + pNum +'</a>');
            }
        }
    });
    //最后一个点击
    $('pageBottom a').click(function () {
        $('.pageBody').empty();
        if(pageCount - thisLast > 5){
            for(pNum = 1; pNum <= 5;pNum++){
                //点击向后翻，后面的页数大于5
                $('.pageBody').append('<a href="#">'+(thisLast+pNum)+'</a>');
            }
        } else {
            //点击向后翻，后面的页数小于5
            for(pNum = thisLast+1;pNum<totalPages;pNum++){
                $('.pageBody').append('<a href="#">' + pNum + '</a>');
            }
        }
    });
















   /* $(pagination .pageTop).click(function () {
        $.ajax({
            type:"GET",
            url:
        });

    });
   */ 

  /*等会删
    $(".pageBody a").click(function () {
        console.log(0)
        $.ajax({
            type : "GET",
            url:"http://rapapi.org/mockjsdata/24500/team/team/show.do",
            data:{
                pageNow:$(this).val()+1,
                pageSize:10
            },
            dataType:'json',
            /*  beforeSend:function(){
             $("tbody tr").empty();
             $("tbody").append("<td id='loading'>loading...</td>");
             }*/
           /*等会删
            success:function(json){
                alert("aaa");
                $("tbody tr").empty();

                $("tbody tr").append("<td id='teamName'></td>");
                  $("#teamName").text()=json.teamName;
                /*            total=json.total;
                 pageSize = json.pageSize;
                 curPage = page;
                 totaPage = json.totalPages;
                 var tr = "";
                 var */
                /*等会删
            },
            error: function (json){
                alert("网络错误");
            }
        })
    });  等会删*/

});
    