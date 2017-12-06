/**
 * Created by win on 2017/5/1.
 */

$(function(){
    logoBtn();
    function logoBtn(){
        $(".logo-select span").click(function(){
            $(this).next("ul").slideDown(80).siblings("ul").slideUp(80)
            return false;
        });
        $(document).click(function(){
            $(".logo-select ul").slideUp(80)
        })
    }

    navMain();
    function navMain(){
        var timeOnOffA;
        var timeOnOffB;
        $(".header-navBox>li").hover(function(){
            clearTimeout(timeOnOffA);
            if (!$(this).find("ul").is(":animated")) {
                $(this).find("ul").css("top","50px").animate({top: 36, opacity: "show"},200);
            }
            return false;
        },function(){
            var _this=$(this);
            timeOnOffB=setTimeout(function(){
                _this.find("ul").hide();
            },100)
        });
        $(".header-navBox>li ul").hover(function(){
            clearTimeout(timeOnOffB);
            if (!$(this).is(":animated")) {
                $(this).animate({top: 36, opacity: "show"},200);
            }
            },function(){
            var _this=$(this);
            timeOnOffA=setTimeout(function() {
                _this.hide();
            },100)

        });
    }

    bannerScroll();
    function bannerScroll(){
        var banBox=$(".banner-scroll"),
            imgAll=$(".banner-blockAll"),
            leftBtn=$(".bannerLeftBtn"),
            rightBtn=$(".bannerRightBtn"),
            oLi=$(".banner-scroll ol li");
        var aW=1180;
        var num=0;
        var maxNum=2;
        imgAll.find("li:first").clone().appendTo(imgAll);
        rightBtn.click(function(){rigAuto(num < maxNum,1,0,tabBtn,rigHome)});
        leftBtn.click(function(){rigAuto(num>0,-1,maxNum,tabBtn,lefHome)});
        //翻页
        function rigAuto(f,n,m,fn1,fn2) {
            if (!imgAll.is(":animated")) {
                if (f) {num+=n;fn1()} else {num = m;fn2()}
                oLiStyle()
            }
        }
        //自动播放
        var autoPlay;
        autoPlayFn();
        function autoPlayFn(){autoPlay=setInterval(function(){rigAuto(num < maxNum,1,0,tabBtn,rigHome)},3000)}
        banBox.hover(function(){clearInterval(autoPlay)},function(){autoPlayFn()});
        //上下翻页
        function tabBtn(){
            imgAll.animate({"left":-aW*num},500)
        }
        //下一页返回
        function rigHome(){
            imgAll.animate({"left":-aW*(maxNum+1)},500,function(){$(this).css("left","0")})
        }
        //上一页跳转
        function lefHome(){
            imgAll.css("left",-aW*(maxNum+1)).animate({"left":-aW*(maxNum)},500)
        }
        //焦点按钮
        oLi.mouseover(function(){
            if (!imgAll.is(":animated")) {
                var x = num;
                num = $(this).index();
                if (x < num) {
                    imgAll.css({
                        left: -aW * (num - 1)
                    });
                    tabBtn();
                } else if (x > num) {
                    imgAll.css({
                        left: -aW * (num + 1)
                    });
                    tabBtn();
                }
                oLiStyle()
            }
        });
        //焦点样式
        function oLiStyle(){
            oLi.eq(num).addClass("banOn").siblings().removeAttr("class")
        }
    }

    leftMenu();
    function leftMenu(){
        $(".cont-left-menu>ul>li").click(function(){
            $(this).find("ul").slideToggle("").parent().siblings().find("ul").slideUp();
        })
    }

    contTab();
    function contTab(){
        //选项卡JSON
        $.getJSON("json/index.json",function(data){
            $.each(data.cardTab.tabNav,function(i,item){
                var navTxt="<li>"+item+"</li>" ;
                $(navTxt).appendTo(".cont-right-f2-nav");
            });
            $(".cont-right-f2-nav li:first").addClass("contF2On");
            $(".cont-right-f2-nav li").click(function(){
                var x=$(this).index();
                $(this).addClass("contF2On").siblings().removeAttr("class");
                cardTab(x);
            });
        });
        cardTab(0);
        function cardTab(xz){
            $(".cont-right-f2-contAll").text("");
            $.getJSON("json/index.json",function(data){
                $.each(data.cardTab.cont[xz],function(i,item){
                    var blockCont="" +
                        "<li>"+
                        "<div>"+
                        "<a href='"+item.aHref +"'><img src='"+item.imgSrc +"' alt='"+item.imgAlt +"' title='"+item.imgTitle +"'></a>"+
                        "<h2>"+item.price +"</h2>"+
                        "<p>"+item.text +"</p>"+
                        "<a href='"+item.aHref +"' class='btn btn-default add-to-cart'><i class='fa fa-shopping-cart'></i>Add to cart</a>"+
                        "</div>"+
                        "</li>";
                    $(blockCont).appendTo(".cont-right-f2-contAll");
                })
            });
        }

    }

    botImgScroll();
    function botImgScroll(){
        //底部轮播图JSON
        $.getJSON("json/index.json",function(data){
            $.each(data.footScroll,function(i,item){
                var cont=""+
                    "<li><div>"+
                    "<img src='"+item.imgSrc+"' alt='"+item.imgAlt +"' title='"+item.imgTitle +"'>"+
                    "<h2>"+item.price +"</h2>"+
                    "<p>"+item.text +"</p>"+
                    "<a href='"+item.aHref +"' class='btn btn-default add-to-cart'><i class='fa fa-shopping-cart'></i>Add to cart</a>"+
                    "</div></li>";
                $(cont).appendTo(".cont-right-f3-imgAll");
            });
            setTimeFn()
        });


        function setTimeFn(){
            var timeName;
            timeName=setInterval(function(){
                rightTab();
            },2000);
            $(".cont-right-f3").on("mouseover mouseout",function(e){
                clearInterval(timeName);
                if(e.type=="mouseout"){
                    timeName=setInterval(function(){
                        rightTab();
                    },2000);
                }
            });
            var botL=$(".cont-right-f3 span").eq(0);
            var botR=$(".cont-right-f3 span").eq(1);
            var imgBox=$(".cont-right-f3-imgAllBox");
            imgBox.find("li").width(imgBox.width()*0.3);
            imgBox.find("ul").width((imgBox.find("li").length+4)*imgBox.find("li").width());
            var n=0;
            var ix=$(".cont-right-f3-imgAll>li").children.length;
            var aW=$(".cont-right-f3-imgAll>li")[0].offsetWidth;
            imgBox.find("li:lt(3)").clone().appendTo(imgBox.find("ul"));
            botR.click(function(){
                rightTab()
            });
            function rightTab(){
                if (!imgBox.find("ul").is(":animated")) {
                    if (n < ix) {
                        n++;
                        imgBox.find("ul").animate({"left": -aW * n}, 500);
                    } else {
                        n = 0;
                        imgBox.find("ul").animate({"left": -aW * (ix+1)}, 500, function () {
                            $(this).css("left", "0px")
                        });
                    }
                }
            }
            botL.click(function(){
                if (!imgBox.find("ul").is(":animated")) {
                    if (n > 0) {
                        n--;
                        imgBox.find("ul").animate({"left": -aW * n}, 500);
                    } else {
                        n = ix;
                        imgBox.find("ul").css("left", -aW * (ix+1)).animate({"left": -aW *n}, 500)
                    }
                }
            });}


    }

    leftPrice();
    function leftPrice(){
        var PriceBox=$(".cont-left-priceBar");
        var PriceAB=PriceBox.find("i");
        var PriceA=PriceBox.find("i")[1];
        var PriceB=PriceBox.find("i")[2];
        var PriceBg=PriceBox.find("div").eq(0);
        var PriceText=PriceBox.find("div").eq(1);

        PriceAB.mousedown(function(e){
            var e=e||event;
            var ele=$(this);
            var bgMin;
            var bgMax;
            var x= e.clientX-this.offsetLeft;
                $(document).bind("mousemove",function(e){
                    var _x= e.clientX-x;
                    if(_x<=0){_x=0;}else if(_x>=PriceBox.width()-20){_x=PriceBox.width()-20;}
                    ele.css({"left":_x+"px"});
                    var aL=PriceA.offsetLeft;
                    var bL=PriceB.offsetLeft;
                    if(aL<bL){
                        bgMin=aL;
                        bgMax=bL;
                    }else{
                        bgMin=bL;
                        bgMax=aL;
                    }
                    PriceBg.css({
                        "left":bgMin-2+"px",
                        "width":bgMax-bgMin+20+"px"
                    });
                    var min$=Math.round(bgMin/(PriceBox.width()-20)*600);
                    var max$=Math.round(bgMax/(PriceBox.width()-20)*600);
                    PriceText.html(min$+"-"+max$+"<i></i>");
                $(this).bind("mouseup",function(){
                    $(this).unbind("mousemove mouseup");
                    })
            })
        })
    }

//主要产品JSON
    $.getJSON("json/index.json",function(data){
        $.each(data.commodity,function(i,item){
            var blockCont="" +
                "<div class='commodity'>" +
                "<div class='commodity-main'>"+
                "<img src='"+item.trImgSrc+"' />"+
                "<div>" +
                "<img src='"+item.imgSrc+"' title='"+item.imgTitle+"' alt='"+item.imgAlt+"'>"+
                "<h2>"+item.price+"</h2>"+
                "<p>"+item.text+"</p>"+
                "<a href='"+item.aHref+"'><i class='fa fa-shopping-cart'></i>Add to cart</a>" +
                "</div>"+
                "<div class='commodity-main-hidden'>"+
                "<div class='overlay-content'>"+
                "<img src='"+item.imgSrc+"' title='"+item.imgTitle+"' alt='"+item.imgAlt+"'>"+
                "<h2>"+item.price+"</h2>"+
                "<p>"+item.text+"</p>"+
                "<a href='"+item.aHref+"' class='btn btn-default add-to-cart'><i class='fa fa-shopping-cart'></i>Add to cart</a>"+
                "</div></div></div>"+
                "<p>"+
                "<a href='"+item.aHref+"'><i class='fa fa-plus-square'></i>Add to wishlist</a>"+
                "<a href='"+item.aHref+"'><i class='fa fa-plus-square'></i>Add to compare</a>"+
                "</p></div>";

            $(blockCont).appendTo(".cont-right-f1");
        })
    });


});