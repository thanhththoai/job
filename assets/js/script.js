$(document).on("ready", function () {

// footer family site
  $(".family_site_wrap button").on("click", function () {
    $(this).parent(".family_site_wrap").toggleClass("active");
  });
  
//   all menu function
  $(".ham_btn").click(function () {
    let mainCont = $('#container').hasClass('main_container');
    $("html").toggleClass("gnb_open");
    if ($("html").hasClass("gnb_open") != true) {
      if ($(".main_container #section01").hasClass("active") == true) {
        $("html").addClass("darkBg");
      }
      if(mainCont){

          scrollEvent();
      }
      $(".ham_btn").css("transition", "all .1s 0.5s");
    } else {
      $(".ham_btn").css("transition", "unset");
      $("html").removeClass("darkBg");
      if(mainCont){
          nonScroll();
    }
    }
    $("body, html").toggleClass("fixed");
  });
});

function scrollEvent() {
  $("body").off("scroll touchmove mousewheel");
}

function nonScroll() {
  $("body").on("scroll touchmove mousewheel", function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  });
}
