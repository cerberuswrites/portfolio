$( "a.navtab" ).on( "click", function() {
  $( "a.navtab" ).removeClass("active");
  $(".navbar").removeClass("scrolled");
  $(this).addClass("active");
  $('.content-scroll').scrollTop(0);
});

$(function() {
  var url = window.location.href;
  if ( url.toLowerCase().indexOf("illustration") >= 0 ) {
    $( "a.navtab[href*='illustration']" ).addClass("active");
  } else if ( url.toLowerCase().indexOf("gamedev") >= 0 ) {
    $( "a.navtab[href*='gamedev']" ).addClass("active");
  } else {
    $( "a.navtab[href*='home']" ).addClass("active");
  }
});

$( "button.opengame" ).on( "click", function() {
  $( ".embed-overlay" ).addClass("open");
  $( this ).siblings( ".window-container" ).addClass("open");
});

$( ".embed-overlay" ).on( "click", function() {
  $( ".embed-overlay" ).removeClass("open");
  $( ".game-container .window-container" ).removeClass("open");
});
 	

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

var lightbox = new PhotoSwipeLightbox({
  gallery: '#gallery',
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

var $grid = $('.pswp-gallery').masonry({
  // options
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  gutter: '.gutter-sizer',
  horizontalOrder: false,
  percentPosition: true
});

// layout Masonry after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry('layout');
});

$('.pswp-gallery').imagesLoaded().done( function( instance ) {
  console.log('DONE  - all images have been successfully loaded');
  //setTimeout(changeHeight, 500);
});


function changeHeight() {
  var galleryHeight = $( ".pswp-gallery" ).height();
  var gutterSize = $(".gutter-sizer").width();
  $( ".pswp-gallery" ).height( galleryHeight - gutterSize );
}

$(window).resize(function(){
  $grid.masonry();
  // need to figure this out again
  // also properly resize the grids lmfao
});