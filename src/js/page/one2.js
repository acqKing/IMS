$(document).ready(function () {
    var pNum;
    var totalPage;
    var totalCounts;
    $.ajax({
        type: "POST";
        //url:"http://rapapi.org/mockjsdata/24500/team/team/show.do",
        url: "http://localhost:8080/team/team/show.do",
        dataType:"json",
        data: {
            'pageNow' : 1,
            'pageSize' : 10
        }
        success: function(data){
            if(data.success){
                totalPage = data.pages;
                totalPage = data.counts;
            } else {
                alert("出现错误：" + data.msg);
            } 
        }
    });
});

define(["require"], function(require) {
    var cssUrl = require.toUrl("../scss/page/bootstrap.min.css");
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = cssUrl;
    document.getElementsByTagName("head")[0].appendChild(link);
});