// =========================
// PAGE NAVIGATION
// =========================

$( "a.navtab" ).on( "click", function() {
  $( "a.navtab" ).removeClass("active");
  $(".navbar").removeClass("scrolled");
  $(this).addClass("active");
  $('.content-scroll').scrollTop(0);

  var currentPage = $(this).attr("href");
  $(".content:not(" + currentPage + ")").removeClass("active");
  $(".content" + currentPage).addClass("active");
});

$(function() {
  var url = window.location.href;
  var currentPage = "#" + url.split("#")[1];
  console.log(currentPage);
  if ( url.toLowerCase().indexOf("illustration") >= 0 ) {
    $( "a.navtab[href*='illustration']" ).addClass("active");
  } else if ( url.toLowerCase().indexOf("gamedev") >= 0 ) {
    $( "a.navtab[href*='gamedev']" ).addClass("active");
  } else {
    $( "a.navtab[href*='home']" ).addClass("active");
    currentPage = "#home";
  }
  $(".content:not(" + currentPage + ")").removeClass("active");
  $(".content" + currentPage).addClass("active");
});

// =========================
// GAME EMBEDS
// =========================

$( "button.opengame" ).on( "click", function() {
  $( ".embed-overlay" ).addClass("open");
  $( this ).parents().siblings( ".window-container" ).addClass("open");
  resizeEmbed();
});

$( ".embed-overlay" ).on( "click", function() {
  $( ".embed-overlay" ).removeClass("open");
  $( ".game-container .window-container" ).removeClass("open");
});

$( "span.clicktoclose" ).on( "click", function() {
  $( ".embed-overlay" ).removeClass("open");
  $( ".game-container .window-container" ).removeClass("open");
});
 	
// =========================
// PAGE SCROLLING
// =========================

$( "#home .content-scroll" ).on( "scroll", function() {
   if ( $(this).scrollTop() > 80 ) {
      $(".navbar").addClass("scrolled");
   } else {
    $(".navbar").removeClass("scrolled");
   }
});

$( "#illustration .content-scroll" ).on( "scroll", function() {
  if ( $(this).scrollTop() > 80 ) {
     $(".navbar").addClass("scrolled");
  } else {
   $(".navbar").removeClass("scrolled");
  }
});

$( "#gamedev .content-scroll" ).on( "scroll", function() {
  if ( $(this).scrollTop() > 80 ) {
     $(".navbar").addClass("scrolled");
  } else {
   $(".navbar").removeClass("scrolled");
  }
});

// =========================
// CLICK REMINDER
// =========================

$( "#home .content-scroll" ).on( "scroll", function() {
  if ( $(this).scrollTop() > 400 ) {
    if ( !$(".misc-notif").hasClass("alreadyclicked")) {
      $(".misc-notif").removeClass("hidden");
    }
  } else if ( $(this).scrollTop() < 400 ) {
    $(".misc-notif").addClass("hidden");
 } 
});

$( ".gallery-container" ).on( "click", function() {
      $(".misc-notif").addClass("hidden alreadyclicked");
});

// =========================
// LIGHTBOX GALLERY
// =========================


var lightbox = new PhotoSwipeLightbox({
  gallery: '#gallery, #gallery2, #gallery3, #gallery4, #gallery5',
  children: 'a',
  showHideAnimationType: 'none',
  zoomAnimationDuration: false,
  initialZoomLevel: 'fit',
  secondaryZoomLevel: 1,
  maxZoomLevel: 1,
  loop: true,
  wheelToZoom: true,
  padding: { top: 30, bottom: 30, left: 30, right: 30 },
  pswpModule: PhotoSwipe 
});

const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
  // Plugins options, for example:
  type: 'auto',
  captionContent: '.caption',
});
lightbox.on('uiRegister', function() {
  lightbox.pswp.ui.registerElement({
    name: 'download-button',
    order: 8,
    isButton: true,
    tagName: 'a',
    html: {
      isCustomSVG: true,
      inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
      outlineID: 'pswp__icn-download'
    },
    onInit: (el, pswp) => {
      el.setAttribute('download', '');
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');

      pswp.on('change', () => {
        console.log('change');
        el.href = pswp.currSlide.data.src;
      });
    }
  });
});
lightbox.init(); 

// =========================
// COMPATIBILITY / FIXES FOR
// WINDOW RESIZING ETC
// =========================

$(window).resize(function() {
    setTimeout(function() {
        //restorePosition();
        resizeEmbed();
    }, 400);
});

function restorePosition() {
  var contentWidth = $(".content").width();
  var siblingsBefore = $(".content.active").prevAll();
  var toScroll = 0;
  $( siblingsBefore ).each(function() {
    toScroll += contentWidth;
  });
  $(".wrapper").scrollLeft( toScroll );
}

// =========================
// IFRAME RESIZING
// =========================


function resizeEmbed() {
  const minScale = 0.8;
  const maxScale = 1;
  const embedMargin = 80;

  var embedHeight = $(".game-container .window-container .window").height();
  var embedWidth = $(".game-container .window-container .window").width();

  var scale = $(window).height() / ( embedHeight + embedMargin );
  var scaleWidth = $(window).width() / ( embedWidth + embedMargin );


  scale = Math.min(maxScale, Math.max(minScale, scale));
  scaleWidth = Math.min(maxScale, Math.max(minScale, scaleWidth));
  scale = Math.min(scale, scaleWidth);
  
  document.documentElement.style.setProperty("--embedScale", scale);
}