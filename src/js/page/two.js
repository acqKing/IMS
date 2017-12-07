/**
 * Created by HP on 2017/9/7.
 */
$(document).ready(function () {
    //二级导航开始
    $(".sec-3,.sec-4,.sec-5").hide();
    $(".toSec-3").click(function(){
        $(".toSec-1,.toSec-2,.toSec-4,.toSec-5").removeClass("active");
        $(this).addClass("active");
        $(".sec-3").show();
        $(".sec-2,.sec-4,.sec-5").hide();

    });
    $(".toSec-2").click(function(){
        $(".toSec-1,.toSec-3,.toSec-4,.toSec-5").removeClass("active");
        $(this).addClass("active");
        $(".sec-2").show();
        $(".sec-3,.sec-4,.sec-5").hide();

    });
    $(".toSec-4").click(function(){
        $(".toSec-1,.toSec-2,.toSec-3,.toSec-5").removeClass("active");
        $(this).addClass("active");
        $(".sec-4").show();
        $(".sec-2,.sec-3,.sec-5").hide();

    });
    $(".toSec-5").click(function(){
        $(".toSec-1,.toSec-2,.toSec-3,.toSec-4").removeClass("active");
        $(this).addClass("active");
        $(".sec-5").show();
        $(".sec-2,.sec-3,.sec-4").hide();
     $(".toSec-1").click(function () {
         $(".toSec-5,.toSec-2,.toSec-3,.toSec-4").removeClass("active");
         $(this).addClass("active");
     });
    });
    //二级导航结束
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
});
