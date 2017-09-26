$(document).ready(function () {
    var pNum;
    var totalPage;
    var totalCounts;
    $.ajax({
        type: "POST";
        url:"http://rapapi.org/mockjsdata/24500/team/team/show.do",
        dataType:"json",
        data: {
            'pageNow' : 1,
            'pageSize' : 10
        }
        success: function(data){
            if(data.success){
                totalPage = data.pages;
                totalPage = data.counts;
            }
        }
    });
});