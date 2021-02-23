"use strict"

/* =================== */
/*   	  hamburger      */
/* =================== */
let body = $("body");
let hamburger = $("#hamburger");
hamburger.click(function () {
  $(".header-nav").fadeToggle(600);
  hamburger.toggleClass("active");
  body.toggleClass("hidden");
});

// 画面スクロールでhamburgerメニュー出現
$(window).scroll(function (){
if($(window).scrollTop() > $(window).height()){
  hamburger.addClass("in");
}
else{
  hamburger.removeClass("in");
}
});

// hamburgerメニュー以外クリックで閉じる
$('.hamburger-action').click(function(){
  body.toggleClass("hidden");
  hamburger.removeClass("active");
});



/* =================== */
/*  navクリックで滑らかに移動  */ 
/* =================== */
const smoothScroll = function () {
  const interval = 10,
        divisor = 10,
        range = 5,
        btn = document.querySelectorAll( 'a[href^="#"]' );

  let count = 0;
  while(count < btn.length){
    (function(elem){
      btn[elem].addEventListener('click', function(e){
        e.preventDefault();
        let toY,
          nowY = window.scrollY || window.pageYOffset;
        const href = btn[elem].getAttribute('href'),
          target = document.querySelector(href),
          targetY = target.getBoundingClientRect().top + nowY;

        (function doScroll(){
          toY = nowY + (targetY - nowY) / divisor;
          window.scrollTo(0, toY);
          nowY = toY;

          if(toY >= targetY + range || toY <= targetY - range) {
            setTimeout(doScroll, interval);
          }
        })();
      }, false);
    })(count);
    count++;
  }
}
smoothScroll();



/* =================== */
/*        wave         */ 
/* =================== */
let smallLetter = $(".small-letter");
let sepalate = function(number){
  // .tab-textを取得
  var container = smallLetter.eq(number);
  // コンテンツを取得
  var content = $(container).html();
  // コンテンツから空白や改行を削除
  var text = $.trim(content);
  // 新しく挿入するhtmlの変数を定義
  var newHtml = "";
  // textを1文字ずつ分割してspanを追加
  text.split("").forEach(function(v){
    newHtml += '<p class=\"letter-wave\">' + v + '</p>';
  });
  // コンテナに作ったHTMLを挿入する
  $(container).html(newHtml);
  
  // $(".letter-wave").addClass("wave");
}
sepalate(0);
sepalate(1);
sepalate(2);
sepalate(3);
sepalate(4);
sepalate(5);
sepalate(6);

// main-titleウェーブ
let letterWave = $(".letter-wave");
function waveIn() {
  var waveIn = setInterval(() => {
    letterWave.addClass("wave");
    clearInterval(waveIn);
    waveOut();
  }, 3500);
}

function waveOut() {
  var waveOut = setInterval(() => {
    letterWave.removeClass("wave");
    clearInterval(waveOut);
    waveIn();
  }, 3500);
}
waveIn();



/* =================== */
/* グラデーション色変わり  */ 
/* =================== */
let code = "#86fde8";
let red   = parseInt(code.substring(1,3), 16);
let green = parseInt(code.substring(3,5), 16);
let blue  = parseInt(code.substring(5,7), 16);
let mainFirst = $(".main-title-first");

function countUpRed(){
  var upRed = setInterval(function(){
    red += 9;
    mainFirst.css({
      "background":"-webkit-linear-gradient(-90deg, #282828, rgb("+ red +","+ green +","+ blue +"))",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent"
    });
    if(red >= 255){
      clearInterval(upRed);
      countDownRed();
    }
    // console.log(red);
  }, 1000);
}

function countDownRed(){
  var down = setInterval(function(){
    red -= 9;
    mainFirst.css({
      "background":"-webkit-linear-gradient(-90deg, #282828, rgb("+ red +","+ green +","+ blue +"))",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent"
    });
    if(red <= 0){
      clearInterval(down);
      countUpRed();
    }
    // console.log(red);
  }, 1000);
}
countUpRed();

function countUpGreen(){
  var upGreen = setInterval(function(){
    green += 2;
    mainFirst.css({
      "background":"-webkit-linear-gradient(-90deg, #282828, rgb("+ red +","+ green +","+ blue +"))",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent"
    });
    if(green >= 255){
      clearInterval(upGreen);
      countDownGreen();
    }
    // console.log(green);
  }, 1000);
}

function countDownGreen(){
  var down = setInterval(function(){
    green -= 2;
    mainFirst.css({
      "background":"-webkit-linear-gradient(-90deg, #282828, rgb("+ red +","+ green +","+ blue +"))",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent"
    });
    if(green <= 0){
      clearInterval(down);
      countUpGreen();
    }
    // console.log(green);
  }, 1000);
}
// countUpGreen();

function countUpBlue(){
  var upBlue = setInterval(function(){
    blue += 6;
    mainFirst.css({
      "background":"-webkit-linear-gradient(-90deg, #282828, rgb("+ red +","+ green +","+ blue +"))",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent"
    });
    if(blue >= 255){
      clearInterval(upBlue);
      countDownBlue();
    }
    // console.log(blue);
  }, 1000);
}

function countDownBlue(){
  var down = setInterval(function(){
    blue -= 6;
    mainFirst.css({
      "background":"-webkit-linear-gradient(-90deg, #282828, rgb("+ red +","+ green +","+ blue +"))",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent"
    });
    if(blue <= 0){
      clearInterval(down);
      countUpBlue();
    }
    // console.log(blue);
  }, 1000);
}
countUpBlue();



/* =================== */
/*   	 slideshow       */
/* =================== */

let nowPage = 0; // 現在の画像
let nextPage = 1; // 次の画像
const slides = $("#slideshow").find("img");
const slideLength = slides.length;
const fadeTime = 1500; // 1.5s
const showTime = 6000;

slides.hide();

// 先頭の画像だけ表示する
slides.eq(0).show();
// eq(マイナス)だと後ろから何番目

// 画像を切り替える関数
const slideshow = () => {
  slides.eq(nowPage % slideLength).fadeOut(fadeTime).removeClass("zoom");
  slides.eq(nextPage % slideLength).fadeIn(fadeTime).addClass("zoom");
  // slideLengthで割った余り
  nowPage++;
  nextPage++;
}

// slideshow関数の呼び出し
setInterval(slideshow, showTime);



/* =================== */
/*   	   slidein       */
/* =================== */

$(window).scroll(function(){
  let jobBoxPart = $(".job-box-part");
  let scroll = $(window).scrollTop();

  let slidein = function(data) {
    let offset = jobBoxPart.eq(data).offset().top;
    // offset().topは下までの距離
    let winH = $(window).height();
  
    if(scroll > offset - winH / 1.5){
      jobBoxPart.eq(data).addClass("in");
    }
    else{
      jobBoxPart.eq(data).removeClass("in");
    }
  }
  slidein(0);
  slidein(1);
  slidein(2);
});



/* =================== */
/*    carousel panel   */ 
/* =================== */

let carousel = $(".work-carousel");
let carouselItem = carousel.find("li");
let prev = $("#prev");
let next = $("#next");

let length = carouselItem.length;
let carouselWidth = carouselItem.width();
let innerWidth = carouselWidth * length;
const time = 400;

let c = 1;

let flag = true;

// 画像サイズ切り替え
let workCal = $(".work-carousel");
let brilliant = workCal.find(".work-carousel-img");
brilliant.eq(0).addClass("brilliant");

// 説明の切り替え
let workDes = $(".work-des");
let workDesBox = workDes.find(".work-des-box");

prev.click(function () {
  if(flag){
    flag = false;
    if (c == 1) {
      brilliant.eq(c - 1).removeClass("brilliant");
      workDesBox.eq(c - 1).addClass("out");
      carousel.stop().animate(
        {
          // left: (-length + 1) * carouselWidth,
          left: -innerWidth + carouselWidth,
        },
        time,
        function(){
          flag = true;
        }
        );
      c = length;
      brilliant.eq(c - 1).addClass("brilliant");
      workDesBox.eq(c - 1).removeClass("out");
    } 
    else {
      brilliant.eq(c - 1).removeClass("brilliant");
      workDesBox.eq(c - 1).addClass("out");
      carousel.stop().animate(
        {
          left: (-c + 2) * carouselWidth,
        },
        time,
        function(){
          flag = true;
        }
      );
      c--;
      brilliant.eq(c - 1).addClass("brilliant");
      workDesBox.eq(c - 1).removeClass("out");
    }
  }
});

next.click(function () {
  if(flag){
    // 再びクリックしても動かないようにする
    flag = false;
    if (c == length) {
      brilliant.eq(length - 1).removeClass("brilliant");
      workDesBox.eq(c - 1).addClass("out");
      carousel.stop().animate(
        {
          left: 0,
        },
        time,
        function(){
          flag = true;
        }
      );
      c = 1;
      brilliant.eq(c - 1).addClass("brilliant");
      workDesBox.eq(c - 1).removeClass("out");
    } 
    else {
      brilliant.eq(c - 1).removeClass("brilliant");
      workDesBox.eq(c - 1).addClass("out");
      carousel.stop().animate(
        {
          left: -c * carouselWidth,
        },
        time,
        function(){
          flag = true;
        }
      );
      c++;
      brilliant.eq(c - 1).addClass("brilliant");
      workDesBox.eq(c - 1).removeClass("out");
    }
  }
});



/* =================== */
/*     scroll walk     */ 
/* =================== */

let legLeft = $(".leg-left");
let legRight = $(".leg-right");
let legSize = 65;
function scrollWalk() {
  window.addEventListener("scroll", function(){
    let scrollValue = window.pageYOffset + window.innerHeight;
    // console.log(scrollValue);
    let bodyBottom = document.body.offsetHeight;
    // console.log(bodyBottom);

    let per = scrollValue / bodyBottom;
    let posi = window.innerHeight * per - legSize;

    // console.log(posi);
    console.log(per);

    legLeft.css({
      "top": posi + "px",
    });
    legRight.css({
      "top": posi + "px"
    });
    if(per <= 0.16){
      legLeft.removeClass("out");
      legRight.removeClass("in");
    }
    if(per > 0.16 && per <= 0.3){
      legLeft.addClass("out");
      legLeft.removeClass("in");
      legRight.removeClass("out");
      // legRight.addClass("in");
    }
    if(per > 0.3){
      legLeft.removeClass("out");
      legLeft.addClass("in");
      legRight.addClass("out");
      legRight.removeClass("in");
    }
    if(per > 0.45){
      legLeft.addClass("out");
      legLeft.removeClass("in");
      legRight.removeClass("out");
      legRight.addClass("in");
    }
    if(per > 0.6){
      legLeft.removeClass("out");
      legLeft.addClass("in");
      legRight.addClass("out");
      legRight.removeClass("in");
    }
    if(per > 0.75){
      legLeft.addClass("out");
      legLeft.removeClass("in");
      legRight.removeClass("out");
      legRight.addClass("in");
    }
    if(per > 0.85){
      legLeft.removeClass("out");
      // legLeft.addClass("in");
      legRight.addClass("out");
      legRight.removeClass("in");
    }
    if(per >= 0.95){
      legLeft.removeClass("in");
      legRight.removeClass("out");
    }
  });
}
scrollWalk();


let height = 30;
let offset = 0;
let lastPosition = 0;
let ticking = false;

function onScroll(){
  if(lastPosition > height){
    if(lastPosition > offset){
      legLeft.removeClass("up");
      legRight.removeClass("up");
    }
    else{
      legLeft.addClass("up");
      legRight.addClass("up");
    }
    offset = lastPosition;
  }
}
let up = $(".up");
window.addEventListener('scroll', function() {
  let scrollValue = window.pageYOffset + window.screen.height;
  let bodyBottom = document.body.offsetHeight;
  let per = scrollValue / bodyBottom;

  lastPosition = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      onScroll(lastPosition);
      ticking = false;
      if(per <= 0.16){
        up.removeClass("out");
        up.removeClass("in");
      }
      if(per > 0.16 && per <= 0.3){
        up.addClass("out");
        up.removeClass("in");
        up.removeClass("out");
        // legRight.addClass("in");
      }
      if(per > 0.3){
        up.removeClass("out");
        up.addClass("in");
        up.addClass("out");
        up.removeClass("in");
      }
      if(per > 0.45){
        up.addClass("out");
        up.removeClass("in");
        up.removeClass("out");
        up.addClass("in");
      }
      if(per > 0.6){
        up.removeClass("out");
        up.addClass("in");
        up.addClass("out");
        up.removeClass("in");
      }
      if(per > 0.75){
        up.addClass("out");
        up.removeClass("in");
        up.removeClass("out");
        up.addClass("in");
      }
      if(per > 0.85){
        up.removeClass("out");
        // legLeft.addClass("in");
        up.addClass("out");
        up.removeClass("in");
      }
      if(per >= 0.95){
        up.removeClass("in");
        up.removeClass("out");
      }
    });
    ticking = true;
  }
});
onScroll();