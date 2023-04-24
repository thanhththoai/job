$(document).on("ready", function () {

// popup function

$('button[data-bs-dismiss*="pop"]').on("click", function () {
    $("body").removeClass("popup-open");
    let target = $(this).data("bs-dismiss");
    $("#" + target).hide();
    console.log("first");
  });

  $('button[data-bs-toggle="popup"]').on("click", function () {
    $("body").addClass("popup-open");
    let target = $(this).data("bs-target");
    $("#" + target).show();
  });
});
function ParentDelete(el){
    $(el).on('click',function(){
        $(this).parent().remove();
    })
}
function ClickaddRemove(el, addF) {
    $(el).on('click',function(){
        $(this).addClass("active").siblings().removeClass("active");
        addF;
    })
   
  }
  function addRemove(el) {
    $(el).addClass("active").siblings().removeClass("active");
  }

  function tabMenuActive(el, functionName, href){
     $(el).on(functionName, function (e) {
    e.preventDefault();
    let target = $(this).attr(href);
    addRemove(this);
    addRemove(target);
    console.log(target);
  });
  }
setScreenSize();
window.addEventListener('resize', setScreenSize);

function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

function targetScroll(el){
let target=    $(el).attr('href');

 let targetT = $(target).offset().top - 100;
 $('body, html').animate({scrollTop: targetT}, 500)
}

