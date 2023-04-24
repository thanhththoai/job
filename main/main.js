$(function () {
  //   AOS.init();
  $(document).ready(function () {
    $("html").addClass("darkBg");

    setTimeout(() => {
      $("html").addClass("onLoad");
    }, 500);

    $("#fullpage").fullpage({
      navigation: true,
      navigationPosition: "left",
      responsiveWidth: 1201,
      showActiveTooltip: true,
      scrollingSpeed: 800,
      afterLoad: function (anchorLink, index) {
        noticeSwiper.init();
        BusienssSwiper.init();
        mySwiper.init();
      },
    });
  });

  var noticeSwiper = new Swiper(".notice_slider_wrap .swiper-container", {
    slidesPerView: 3,
    loopAdditionalSlides: 6,
    spaceBetween: 30,
    speed: 1000,
    parallax: true,
    loop: true,
    navigation: {
      nextEl: ".notice_slider_btn_wrap .slider-next",
      prevEl: ".notice_slider_btn_wrap .slider-prev",
    },
  });

  var BusienssSwiper = new Swiper(".business_slider_wrap .swiper-container", {
    effect: "fade",
    loop: true,
    navigation: {
      nextEl: ".business_slider_btn_wrap .slider-next",
      prevEl: ".business_slider_btn_wrap .slider-prev",
    },
  });

  var getTimeout = (function () {
    var e = setTimeout,
      b = {};
    setTimeout = function (a, c) {
      var d = e(a, c);
      b[d] = [Date.now(), c];
      return d;
    };
    return function (a) {
      return (a = b[a]) ? Math.max(a[1] - Date.now() + a[0], 0) : NaN;
    };
  })();

  function sanitisePercentage(i) {
    return Math.min(100, Math.max(0, i));
  }

  var percentTime;
  var tick;
  var progressBar = document.querySelector(".progress");

  var mySwiper = new Swiper(".main_slier", {
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    loopAdditionalSlides: 1,
    roundLengths: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    on: {
      init: function () {
        let swiper = this;
        let defaultSlideDelay = swiper.params.autoplay.delay;
        updateSwiperProgressBar(progressBar, defaultSlideDelay);
      },
      slideChange: function () {
        var swiper = this;
        var defaultSlideDelay = swiper.params.autoplay.delay;
        var currentIndex = swiper.realIndex + 1;
        var currentSlide = swiper.slides[currentIndex];
        var currentSlideDelay =
          currentSlide.getAttribute("data-swiper-autoplay") ||
          defaultSlideDelay;
        updateSwiperProgressBar(progressBar, currentSlideDelay);
      },
    },
  });

  function updateSwiperProgressBar(bar, slideDelay) {
    function startProgressBar() {
      resetProgressBar();
      tick = setInterval(progress, 50);
    }

    function progress() {
      var timeLeft = getTimeout(mySwiper.autoplay.timeout);
      if (mySwiper.autoplay.running && !mySwiper.autoplay.paused) {
        percentTime = sanitisePercentage(
          100 - Math.round((timeLeft / slideDelay) * 100)
        );
        bar.style.width = percentTime + "%";

        if (percentTime > 100) {
          resetProgressBar();
        } else if (percentTime == 100) {
          progressBar.style.transition = "none";
        } else {
          progressBar.style.transition = "all 0.5s linear";
        }
      }

      if (mySwiper.autoplay.paused) {
        percentTime = 0;
        bar.style.width = 0;
      }
    }

    function resetProgressBar() {
      percentTime = 0;
      bar.style.width = 0;
      clearInterval(tick);
    }

    startProgressBar();
  }

  // full page window mobile functoin
  let winW = $(window).width();
  if (winW > 849) {
    $(window).on("mousewheel", function () {
      setTimeout(() => {
        sectActiveAni();
      }, 500);
      noticeSwiper.init();
      BusienssSwiper.init();
      mySwiper.init();
      $(".ham_btn").css("transition", "unset");
      let a = $("#section01").hasClass("active");
      headerAni(a);
    });
  }
  if (winW < 850) {
    $(window).scroll(function () {
      var scrollTop = $(window).scrollTop();
      let a = scrollTop > 0;
      headerAni(a);
    });
  }

  //   click event
  tabMenuActive(".tab_menu_wrap a", "click","href");
 
  function sectActiveAni() {
    let sOn = $(".section:not(.fp-auto-height)").hasClass("active");
    let t = $("#section03").hasClass("active");
    if (sOn) {
      $(".section.active").addClass("animation_sect");
    }
    if (t) {
      $(".theme_tab").removeClass("active");
      $(".theme_tab:first-child").addClass("active");
      $(".tab_menu_wrap >a").removeClass("active");
      $(".tab_menu_wrap >a:first-child").addClass("active");
    }
  }

  function headerAni(a) {
    if (a) {
      $("html").addClass("darkBg");
    } else {
      $("html").removeClass("darkBg");
    }
  }
});
