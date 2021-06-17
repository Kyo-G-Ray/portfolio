"use strict"


$(() => {

  
  /* =================== */
  /* SP・Tabの hover消す  */
  /* =================== */
  let touch = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

  if(touch) {
    try {
      for (let si in document.styleSheets) {
        let styleSheet = document.styleSheets[si];
        if (!styleSheet.rules) continue;

        for (let ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
          if (!styleSheet.rules[ri].selectorText) continue;

          if (styleSheet.rules[ri].selectorText.match(':hover')) {
            styleSheet.deleteRule(ri);
          }
        }
      }
    } catch (ex) {}
  }




  /* =================== */
  /*   	  hamburger      */
  /* =================== */
  const html = $("html");
  const hamburger = $("#hamburger");

  hamburger.click(function () {
    $(".header-nav").fadeToggle(600);
    hamburger.toggleClass("active");
    html.toggleClass("hidden");
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
    html.toggleClass("hidden");
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
  const smallLetter = $(".small-letter");

  const sepalate = function(number){
    // .small-letterを一つずつ取得
    let container = smallLetter.eq(number);
    // コンテンツを取得
    let content = $(container).html();
    // コンテンツから空白や改行を削除
    let text = $.trim(content);
    // 新しく挿入するhtmlの変数を定義
    let newHtml = "";
    // textを1文字ずつ分割してspanを追加
    text.split("").forEach(function(v){
      newHtml += '<p class=\"letter-wave\">' + v + '</p>';
    });
    // コンテナに作ったHTMLを挿入する
    $(container).html(newHtml);
  }

  for(let i = 0; i < smallLetter.length; i++){
    sepalate(i);
  }

  // main-titleウェーブ
  const letterWave = $(".letter-wave");
  
  function waveIn() {
    const waveIn = setInterval(() => {
      letterWave.addClass("wave");
      clearInterval(waveIn);
      waveOut();
    }, 3500);
  }

  function waveOut() {
    const waveOut = setInterval(() => {
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
  const mainFirst = $(".main-title-first");

  function countUpRed(){
    const upRed = setInterval(function(){
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
    }, 1000);
  }

  function countDownRed(){
    const down = setInterval(function(){
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
    }, 1000);
  }
  countUpRed();

  function countUpGreen(){
    const upGreen = setInterval(function(){
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
    }, 1000);
  }

  function countDownGreen(){
    const down = setInterval(function(){
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
    }, 1000);
  }
  // countUpGreen();

  function countUpBlue(){
    const upBlue = setInterval(function(){
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
    }, 1000);
  }

  function countDownBlue(){
    const down = setInterval(function(){
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
    const jobBoxPart = $(".job-box-part");
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

  const carousel = $(".work-carousel");
  const carouselItem = $('.work-carousel-li');
  console.log(carouselItem);
  const prev = $("#prev");
  const next = $("#next");

  let length = carouselItem.length;
  // let carouselWidth = carouselItem.outerWidth(true);
  // let innerWidth = carousel.outerWidth(true);
  const time = 400;
  
  let c = 1;
  
  let flag = true;
  
  // 画像サイズ切り替え
  let workCal = $(".work-carousel");
  let brilliant = workCal.find(".work-carousel-img");
  brilliant.eq(0).addClass("brilliant");
  
  function scaleFunc(){
    setTimeout(function(){
      // let scale = brilliant.css('transform');
      // let values = scale.split('(')[1];
      // values = values.split(')')[0];
      // values = values.split(', ');

      // let matrix = {
      //   'scale-x':values[0],
      //   'rotate-p':values[1],
      //   'rotate-m':values[2],
      //   'scale-y':values[3],
      //   'transform-x':values[4],
      //   'transform-y':values[5]
      // };

      // let imgScale = matrix['scale-x'];
      window.carouselMove = $('.work-carousel-li').width();
      console.log(carouselMove);
      return carouselMove;
    },500);
  }
    scaleFunc();
    
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
            left: (-length + 1) * carouselMove,
            // left: -innerWidth + carouselMove,
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
            left: (-c + 2) * carouselMove,
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
            left: -c * carouselMove,
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

  const legLeft = $(".leg-left");
  const legRight = $(".leg-right");
  const legSize = 65;

  function alignLeg(leftOrUp, RightOrUp, inOrUp, outOrUp){
    leftOrUp.removeClass(inOrUp);
    RightOrUp.removeClass(outOrUp);
  }

  function upLeg(leftOrUp, RightOrUp, upClass){
    leftOrUp.addClass(upClass);
    RightOrUp.addClass(upClass);
  }

  function promoteRight(leftOrUp, RightOrUp, inOrUp, outOrUp){
    leftOrUp.addClass(outOrUp);
    leftOrUp.removeClass(inOrUp);
    RightOrUp.removeClass(outOrUp);
    RightOrUp.addClass(inOrUp);
  }

  function promoteLeft(leftOrUp, RightOrUp, inOrUp, outOrUp){
    leftOrUp.removeClass(outOrUp);
    leftOrUp.addClass(inOrUp);
    RightOrUp.addClass(outOrUp);
    RightOrUp.removeClass(inOrUp);
  }

  function scrollWalk() {
    window.addEventListener("scroll", function(){
      let scrollValue = window.pageYOffset + window.innerHeight;
      
      let bodyBottom = document.body.offsetHeight;

      let per = scrollValue / bodyBottom;
      let posi = window.innerHeight * per - legSize;

      legLeft.css({
        "top": posi + "px",
      });

      legRight.css({
        "top": posi + "px"
      });

      if(per >= 0.95){
        alignLeg(legLeft, legRight, 'in', 'out');
      }
      else if(per > 0.85){
        promoteLeft(legLeft, legRight, 'in', 'out');
      }
      else if(per > 0.75){
        promoteRight(legLeft, legRight, 'in', 'out');
      }
      else if(per > 0.6){
        promoteLeft(legLeft, legRight, 'in', 'out');
      }
      else if(per > 0.45){
        promoteRight(legLeft, legRight, 'in', 'out');
      }
      else if(per > 0.3){
        promoteLeft(legLeft, legRight, 'in', 'out');
      }
      else if(per <= 0.3){
        promoteRight(legLeft, legRight, 'in', 'out');
      }
      else{
        alignLeg(legLeft, legRight, 'in', 'out');
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
        alignLeg(legLeft, legRight, 'up', 'up');
      }
      else{
        upLeg(legLeft, legRight, 'up');
      }
      offset = lastPosition;
    }
  }
  
  const up = $(".up");
  window.addEventListener('scroll', function() {
    let scrollValue = window.pageYOffset + window.screen.height;
    let bodyBottom = document.body.offsetHeight;
    let per = scrollValue / bodyBottom;

    lastPosition = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function() {
        onScroll(lastPosition);
        ticking = false;

        if(per >= 0.95){
          alignLeg(up, up, 'up', 'up');
        }
        else if(per > 0.85){
          promoteLeft(up, up, 'up', 'up');
        }
        else if(per > 0.75){
          promoteRight(up, up, 'up', 'up');
        }
        else if(per > 0.6){
          promoteLeft(up, up, 'up', 'up');
        }
        else if(per > 0.45){
          promoteRight(up, up, 'up', 'up');
        }
        else if(per > 0.3){
          promoteLeft(up, up, 'up', 'up');
        }
        else if(per > 0.16){
          promoteRight(up, up, 'up', 'up');
        }
        else{
          alignLeg(up, up, 'up', 'up');
        }

      });
      ticking = true;
    }
  });
  onScroll();


});