/*!
 * @author Sumanta Parida
 * @version 1.0.1
 */
$(function (){
  sticky();
// FLEX SLIDER
  $(window).load(function() {
    $('.flexslider').flexslider({
      animation: "slide",
      touch : "true",
      pauseOnHover: "false",
      controlsContainer: $(".custom-controls-container"),
      customDirectionNav: $(".custom-navigation a"),
      start: function(slider) {
        $('body').removeClass('loading');
      }
    });
  });
  // OWL CUROSOLE
  $('.testimonials').owlCarousel({
    loop: false,
    margin: 10,
    responsiveClass: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 1,
        nav: true,
        loop: false
      }
    }
  });
  //
  // Mobile Menu
  $("[data-mobile-menu], .closeMenu > a, [data-over-lay]").on("click", function(e) {
    e.preventDefault();
    $("html").toggleClass("menu");
  });
  // Meadia Screen
  if($(window).width() > 1024) {
    //alert($(window).width() + "if")
    //MAIN MENU
    $("[data-mega-menu] > li").mouseenter(function() {
        var li = $(this).children("a");
        var menu = $(this).children(".mega-menu-container");
        $(li).addClass("active");
        //$(menu).stop(true).slideToggle(100);
        $(menu).stop(true, false).slideDown(100);
        if ( $(this).children("a").is("[Megacourses-height]") ) {
          checkheight1();
          checkPosition();
          return false
        } else if ($(this).children("a").is("[Maestrias-height]")) {
          //Maest-submenu
          //var mh = $(".Maest-submenu .nasted-nev").outerHeight();
          //$(".Maest-submenu").css({"height": mh +"px"});
          checkheight2();
          checkPosition2();
        }
      }).mouseleave(function() {
        var li = $(this).children("a");
        var menu = $(this).children(".mega-menu-container");
        $(li).removeClass("active");
        $(menu).stop(true, false).slideUp(100);
        //console.log("Leave")
      });
      // SUB MENU
      $("[data-sub-nav] > li").mouseenter(function() {
          console.log($(this).parents(".sub-nev"))
          //$("[data-sub-nav] > li").removeClass("active");
          $(this).parents(".sub-nev").children("ul").children("li").removeClass("active");
          $(this).toggleClass("active");
        })
        .mouseleave(function() {});
        //
        $("[data-child] > li > a, [data-child] > ul > li > a").mouseenter(function(event) {
          event.preventDefault();
          $("[data-child] > li, [data-child] > ul > li").removeClass("active");
          $(this).parent().toggleClass("active");
          //
          console.log($(this).attr('href'))
          var eachid = $(this).attr('href');
          $(this).parents(".sub-nev").next(".nav-data").children(".data-container").hide();
          $(eachid).show();
        })
        .mouseleave(function() {});
        // Window Scroll
        $(window).scroll(function() {
           if($(window).scrollTop() > 335) {
             $(".addCardContainer").addClass("fixed").css({"z-index":"999"});
           } else {
             $(".addCardContainer").removeClass("fixed").removeAttr("style");
           }
        });
        // plus button
        $(".plus_dropdown").mouseenter(function(){
          $(this).addClass("open");
          $(this).children(".dropdown-toggle").attr("aria-expanded","true");
        }).mouseleave(function(){
          $(this).removeClass("open");
          $(this).children(".dropdown-toggle").attr("aria-expanded","false");
        });
        // testimonials
        testimonial();
  } else {
    // Reset Menu
    $(".Mega-submenu ul[data-sub-nav] > li, .Maest-submenu ul[data-sub-nav] > li").removeClass("active");
    $(".Mega-submenu ul[data-sub-nav] > li .nasted-nev, .Maest-submenu ul[data-sub-nav] > li .nasted-nev").removeAttr("style","")
    $(".Mega-submenu ul[data-sub-nav] > li .nasted-nev [data-child] ul > li > a, .Maest-submenu ul[data-sub-nav] > li .nasted-nev [data-child] ul > li > a").removeClass("active");

    $("[data-mega-menu] > li > a").on("click", function() {
      if ( $(this).parent("li").hasClass("active") ) {
        $(this).parent().removeClass("active");
        $(this).next(".mega-menu-container").slideUp(500);
        return false
      } else {
        $("[data-mega-menu] > li > .mega-menu-container").slideUp(500);
        $("[data-mega-menu] > li").removeClass("active");
        $(this).parent().addClass("active");
        $(this).next(".mega-menu-container").slideDown(500);
        return false
      }
    });
    //
    $("[data-nasted-nav] > li > a").on("click", function() {
      $(this).parents("[data-mega-menu]").find("[data-child]").hide();
      $("[data-nasted-nav] > li > a").removeClass("active");
      $(this).addClass("active");
      $(this).next("[data-child]").show();
    });
    //
    $(document).on("click", "[data-sub-nav] > li > a",  function() {
      if ( $(this).parent("li").hasClass("active") ) {
        $(this).parent("li").removeClass("active");
        $(this).next(".nasted-nev").slideUp(500);
        return false
      } else {
        $("[data-sub-nav] > li").removeClass("active");
        $("[data-sub-nav] > li").children(".nasted-nev").slideUp(500);
        $(this).parent("li").addClass("active");
        $(this).next(".nasted-nev").slideToggle(500);
        return false
      }
    });
    // data-child
    $(document).on("click", "[data-child] > li > a",  function() {
      if ( $(this).parent("li").hasClass("active") ) {
        $(this).parent("li").removeClass("active");
        $(this).parent().next("ul").slideUp(500);
        return false
      } else {
        $("[data-child] > li + ul").slideUp(500);
        $("[data-child] > li").removeClass("active");
        $(this).parent().addClass("active");
        $(this).parent().next("ul").slideDown(500);
        return false
      }
    });
    // Search
    $("[data-search]").on("click", function(){
      $("[role='search']").show(100);
      $(".mobile_search").stop(true, false).fadeToggle(200).css({"z-index":"999"});
      $("html").css({"overflow":"hidden"});
    });
    $("[role='search']").on("click", function(){
      $("[role='search']").hide(100);
      $(".mobile_search").stop(true, false).fadeToggle(200).removeAttr("style");
      $("html").removeAttr("style");
      console.log("sumanta");
    });
    // Card
    $("[data-cart-mobile]").on("click", function(){
      $("[role='pop-overlay']").show(100);
      var cheight = $(".nav-container").outerHeight();
      $("[cart-mobile]").css({"top": cheight + "px"});
      $("[cart-mobile]").stop(true, false).fadeToggle(500);
    });
    //
    $("[role='pop-overlay'], .cart-close").on("click", function(){
      $("[role='pop-overlay']").hide(100);
      $("[cart-mobile]").stop(true, false).fadeToggle(500);
    });
  }
// SELECT OPTION
  $("[select-dropdown]").bind("click", function(select) {
    select.preventDefault();
    $(this).offsetParent().toggleClass("active");
  });
  $("ul[option] > li > a").on("click", function(option){
    option.preventDefault();
    var parent = $(this).parents('.selection');
    var optionList = $(this).html();
    $(parent).find("[data-append]").html(optionList);
    $(parent).toggleClass("active");
  });
  //
  $("[data-light-box]").on("click", function() {
    $("[data-gallery]").show();
  });
  $(".overlay-div").on("click", function() {
    $("[data-gallery]").show();
  });
  $(".closeBtn").on("click", function() {
    $("[data-gallery]").hide();
  });
  // Category Start
  Category();
  //
  treepophover();
  treepop();
});

function Category() {
  $(document).on("click", ".mega-courses > ul > li > h3 > a", function() {
    var fid = $(this).attr("href");
    $("html").css({"overflow":"hidden"});
    $(fid).fadeIn(500);
    if($(window).width() > 1024) {
      // PoPup
      popupdymention();
    }
  });
  $(".pop-close, .mega-courses-overlay").on("click", function(event) {
    event.preventDefault();
    $("html").removeAttr("style");
    $(".mega-courses-popup-container").fadeOut(500);
  });
}
//
// popUp resize
function popupdymention() {
  a = $("[mega-data] ul").outerHeight();
  b = $(".bottom-bar").outerHeight();
  c = $("[cat-headding]").outerHeight();
  d = a + b + c + 70
  console.log(a, b, c);
  $("[mega-data]").css({"height": d});
}
// testimonials wrapper
function testimonial() {
  ta = $(".testimonials-wrapper").height();
  el = $(".testimonials-wrapper > div");
  $(el).css({"height": ta});
  $(window).resize(function(){
    tar = $(".testimonials-wrapper").height();
    $(el).css({"height": tar});
  });
}
// Sticky Menu
function sticky() {
  var stickyOffset = $('.mainNav').offset().top;
  $(window).scroll(function(){
    var sticky = $('.nav-container');
        scroll = $(window).scrollTop();
    if (scroll >= stickyOffset) {
      sticky.addClass('sticky');
    } else {
      sticky.removeClass('sticky');
    }
  });
}
// Menu scroll
function menu_scroll() {
  //var mh = $(".Mega-submenu .nasted-nev").outerHeight();
  //$(".Mega-submenu").css({"height": mh +"px"});
  checkPosition();
  // Resize
  $(window).resize(function() {
    checkPosition();
  });
}

function checkPosition() {
  var kl = $(".Mega-submenu .nasted-nev").outerHeight();
  var wh = $(window).height();
  var mh = $(".Mega-submenu").height();
  var sth = $(".sticky").height();
  var nh = $(".nasted-nev").height();
  var mn = $(".mainNav").height();
  var mp = $(".megacursos .mega-penal").height();
  var g = wh - (mn + mp + 30)
    if (wh < 800) {
      $(".megacursos .Mega-submenu").css({"height": g + "px", "overflow-y":"scroll"});
      $(".megacursos .Mega-submenu > div").css({"height": kl + "px"});
    } else {
        console.log(wh + "else");
    }
}
//
function checkPosition2() {
  var kl = $(".Maest-submenu .nasted-nev").outerHeight();
  var wh = $(window).height();
  var mh = $(".Maest-submenu").height();
  var sth = $(".sticky").height();
  var nh = $(".nasted-nev").height();
  var mn = $(".mainNav").height();
  var mp = $(".maestrias .mega-penal").height();
  var g = wh - (mn + mp + 30)
    if (wh < 800) {
      $(".maestrias .Maest-submenu").css({"height": g + "px", "overflow-y":"scroll"});
      $(".maestrias .Maest-submenu > div").css({"height": kl + "px"});
    } else {
        console.log(wh + "else");
    }
}
//
function checkheight1() {
  var wh1 = $(window).height();
  var ss = $(".Mega-submenu .nasted-nev").outerHeight();
  if (wh1 > 800) {
    $(".Mega-submenu").css({"height": ss +"px"});
    console.log("sumanta Mega");
  } else {

  }
}
//
function checkheight2() {
  var wh3 = $(window).height();
  var sss = $(".Maest-submenu .nasted-nev").outerHeight();
  if (wh3 > 800) {
    $(".Maest-submenu").css({"height": sss +"px"});
    console.log("sumanta M");
  } else {

  }
}
// tree_popup
function treepop() {
  $(".tree_popup > img, span[tree-popup]").on("click", function(){
    $("[treepopup]").after("<div tree-overlay></div>");
    $("[treepopup]").fadeIn(500, function(){
      var tr = $("[treepopup]").width();
      var ft = tr / 6;
      $("[god-list] > li").css({"width": ft});
    });
    $("html").css({"overflow":"hidden"});
  });
  //
  $(document).on("click", ".treeclose, [tree-overlay]", function(){
    $("html").removeAttr("style");
    $("[tree-overlay]").remove();
    $("[treepopup]").fadeOut(500);
  });
}
// Tree popup hover
function treepophover() {
  $("ul[god-list] li[universe]").mouseenter(function() {
    var fg = $(this).children("a").children("span").children();
    fg.attr("tree-data","true");
  }).mouseleave(function() {
    var fg = $(this).children("a").children("span").children();
    fg.attr("tree-data","false");
  });
}
// loader
$(window).load(function() {
  $("[loader]").fadeOut(500);
});
//
