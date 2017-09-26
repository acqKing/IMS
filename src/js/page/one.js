$(document).ready(function(){
    var pNum;
    var pageCount;//总页数
    var totalCounts;//总条数
    alert("aaa");
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

   $.ajax({
        type:"GET",
        url:'http://rapapi.org/mockjsdata/24500/team/team/teamaccounts.do',
        dataType:"json",
        success:function(data){
            if(data.success){
                alert("ok");
                $('.teamCounts').empty();
                 totalCounts = data.counts;

            } else{
                alert("出现错误：" + data.msg);
            }
        },
        error: function(jqXHR){
            alert("发生错误" + jqXHR.status);

        }

    });

    alert("aaa");


    thisFirst = +$('.pageBody a:eq(0)').text();
    thisLast = +$('.pageBody a:eq(4)').text();
    if (thisFirst === 1) {
        $('.pageTop a').hide();
    } else {
        $('.pageTop a').show();
    }
    if (thisLast === data.pageCount) {
        $('.pageBottom a').hide();
    } else {
        $('.pageBottom a').show();
    }

    
    $('pageTop a').click(function () {
        $('.pageBody').empty();
        if(thisFirst > 5){
            for(pNum = 0;pNum < 5; pNum++){
                $('.pageBody').append('<a href="#">'+(thisFirst-5+pNum) + '</a>');
            }
        }else {
            for (pNum = 1;pNum <= 10; pNum++){
                $('.pageBody').append('<a href="#">' + pNum +'</a>');
            }
        }
    });
    //最后一个
    $('pageBottom a').click(function () {
        $('.pageBody').empty();
        totalPage = $('.teamCounts').val()/10;
        if(pageCount - thisLast > 5){
            
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
                 totaPage = json.totalPage;
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
    