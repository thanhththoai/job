$(window).on("scroll", function () {
  scrollTab();
});

$(".lnb a").on("click", function (e) {
  e.preventDefault();
  let clickHref = $(this).attr("href");
  let targetTop = $(clickHref).offset().top - 170;

  $("html, body").stop().animate({ scrollTop: targetTop }, 500);
  setTimeout(function () {
    $(this).addClass("active").siblings().removeClass("active");
  }, 500);
});

function scrollTab() {
  var winT = $(window).scrollTop();
  var scrollBottom =
    $(document).height() - $(window).height() - $(window).scrollTop();

  const headerH = $("#header").outerHeight() - 1;
  let lnbT = $(".lnb_location").offset().top - 100;

  if (winT >= lnbT) {
    $(".lnb").addClass("fixed");
    $(".lnb").css("top", headerH);
  } else {
    $(".lnb").removeClass("fixed");
    $(".lnb").css("top", "0");
  }

  $(".overview_container section").each(function () {
    let sectTop = $(this).offset().top - 300;
    let sectId = $(this).attr("id");
    if (scrollBottom == 0) {
      $(".lnb a:last-of-type")
        .addClass("active")
        .siblings()
        .removeClass("active");
    } else if (winT > sectTop) {
      $('.lnb a[href="#' + sectId + '"]')
        .addClass("active")
        .siblings()
        .removeClass("active");
    }
  });
}
