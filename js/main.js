/* ===================================================================
 * Infinity - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {

    "use strict";

    var cfg = {
            defAnimation: "fadeInUp",    // default css animation
            scrollDuration: 800,           // smoothscroll duration
            mailChimpURL: 'http://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e65110b38d'
        },

        $WIN = $(window);

    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


    /* Preloader
     * -------------------------------------------------- */
    var ssPreloader = function () {

        $WIN.on('load', function () {

            // force page scroll position to top at page refresh
            $('html, body').animate({scrollTop: 0}, 'normal');

            $("#loader").fadeOut("slow", function () {

                $("#preloader").delay(300).fadeOut("slow");

            });
        });
    };


    // /* FitVids
    // ------------------------------------------------------ */
    // var ssFitVids = function() {
    // 	$(".fluid-video-wrapper").fitVids();
    // };


    /*	Masonry
    // ------------------------------------------------------ */
    // var ssMasonryFolio = function() {
    //
    // 	var containerBricks = $('.bricks-wrapper');
    //
    // 	containerBricks.imagesLoaded( function() {
    // 		containerBricks.masonry( {
    // 		  	itemSelector: '.brick',
    // 		  	resize: true
    // 		});
    // 	});
    // };


    // /*	Light Gallery
    // ------------------------------------------------------- */
    // var ssLightGallery = function() {
    //
    // 	$('#folio-wrap').lightGallery({
    // 		showThumbByDefault: false,
    // 		hash: false,
    // 		selector: ".item-wrap"
    // 	});
    // };


    /* Flexslider
      * ------------------------------------------------------ */
    var ssFlexSlider = function () {

        $WIN.on('load', function () {

            $('#testimonial-slider').flexslider({
                namespace: "flex-",
                controlsContainer: "",
                animation: 'slide',
                controlNav: true,
                directionNav: false,
                smoothHeight: true,
                slideshowSpeed: 7000,
                animationSpeed: 600,
                randomize: false,
                touch: true,
            });

        });

    };


    /* Carousel
  * ------------------------------------------------------ */
    var ssOwlCarousel = function () {

        $(".owl-carousel").owlCarousel({
            nav: false,
            loop: true,
            margin: 50,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 2,
                    margin: 20
                },
                400: {
                    items: 3,
                    margin: 30
                },
                600: {
                    items: 4,
                    margin: 40
                },
                1000: {
                    items: 6
                }
            }
        });

    };


    /* Menu on Scrolldown
   * ------------------------------------------------------ */
    var ssMenuOnScrolldown = function () {

        var menuTrigger = $('#header-menu-trigger');

        $WIN.on('scroll', function () {

            if ($WIN.scrollTop() > 150) {
                menuTrigger.addClass('opaque');
            } else {
                menuTrigger.removeClass('opaque');
            }

        });
    };


    /* OffCanvas Menu
   * ------------------------------------------------------ */
    var ssOffCanvas = function () {

        var menuTrigger = $('#header-menu-trigger'),
            nav = $('#menu-nav-wrap'),
            closeButton = nav.find('.close-button'),
            siteBody = $('body'),
            mainContents = $('section, footer');

        // open-close menu by clicking on the menu icon
        menuTrigger.on('click', function (e) {
            e.preventDefault();
            menuTrigger.toggleClass('is-clicked');
            siteBody.toggleClass('menu-is-open');
        });

        // close menu by clicking the close button
        closeButton.on('click', function (e) {
            e.preventDefault();
            menuTrigger.trigger('click');
        });

        // close menu clicking outside the menu itself
        siteBody.on('click', function (e) {
            if (!$(e.target).is('#menu-nav-wrap, #header-menu-trigger, #header-menu-trigger span')) {
                menuTrigger.removeClass('is-clicked');
                siteBody.removeClass('menu-is-open');
            }
        });

    };


    /* Smooth Scrolling
      * ------------------------------------------------------ */
    var ssSmoothScroll = function () {

        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
                $target = $(target);

            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('#header-menu-trigger').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


    /* Placeholder Plugin Settings
      * ------------------------------------------------------ */
    var ssPlaceholder = function () {
        $('input, textarea, select').placeholder();
    };


    /* Alert Boxes
    ------------------------------------------------------- */
    var ssAlertBoxes = function () {

        $('.alert-box').on('click', '.close', function () {
            $(this).parent().fadeOut(500);
        });

    };


    /* Animations
      * ------------------------------------------------------- */
    var ssAnimations = function () {

        if (!$("html").hasClass('no-cssanimations')) {
            $('.animate-this').waypoint({
                handler: function (direction) {

                    var defAnimationEfx = cfg.defAnimation;

                    if (direction === 'down' && !$(this.element).hasClass('animated')) {
                        $(this.element).addClass('item-animate');

                        setTimeout(function () {
                            $('body .animate-this.item-animate').each(function (ctr) {
                                var el = $(this),
                                    animationEfx = el.data('animate') || null;

                                if (!animationEfx) {
                                    animationEfx = defAnimationEfx;
                                }

                                setTimeout(function () {
                                    el.addClass(animationEfx + ' animated');
                                    el.removeClass('item-animate');
                                }, ctr * 30);

                            });
                        }, 100);
                    }

                    // trigger once only
                    this.destroy();
                },
                offset: '95%'
            });
        }

    };


    /* Intro Animation
      * ------------------------------------------------------- */
    var ssIntroAnimation = function () {

        $WIN.on('load', function () {

            if (!$("html").hasClass('no-cssanimations')) {
                setTimeout(function () {
                    $('.animate-intro').each(function (ctr) {
                        var el = $(this),
                            animationEfx = el.data('animate') || null;

                        if (!animationEfx) {
                            animationEfx = cfg.defAnimation;
                        }

                        setTimeout(function () {
                            el.addClass(animationEfx + ' animated');
                        }, ctr * 300);
                    });
                }, 100);
            }
        });

    };

    try {
        $('#contact_usBtn').click(() => {
                let email = $('#contact_us[name="email"]').val();
                let message = $('#contact_us[name="message"]').val();
                $.post("/service/contact_us",
                    {
                        "email": email,
                        "message": message
                    }
                    , (data, status) => {
						if (data.error) {
							$("#success_modal").text("You have successful subscribed");
							$("#success_modal").show().delay(2500).fadeOut();
						} else {
							$("#unsuccessful_modal").text("unsuccessful subscribed please enter valid email");
							$("#unsuccessful_modal").show().delay(2500).fadeOut();
						}
                    }).fail((xhr,status,error) => {
					$("#unsuccessful_modal").text("There was a error processing this request");
					$("#unsuccessful_modal").show().delay(2500).fadeOut();
				})
            }
        )


    } catch (e) {
		$("#unsuccessful_modal").text("There was a error processing this request").show().delay(5000).fadeOut();;
		console.log(e)
    }

    try {
        $('#subscribeBtn').click(() => {
            let email = $('#subscribe_email').val();
            $.post("/service/subscribe",
                {
                    "email": email,
                }
                , (data, status) => {
                    if (data.error) {
                        $("#success_modal").text("You have successful subscribed");
                        $("#success_modal").show().delay(2500).fadeOut();
                    } else {
                        $("#unsuccessful_modal").text("unsuccessful subscribed please enter valid email");
                        $("#unsuccessful_modal").show().delay(2500).fadeOut();
                    }
                }).fail((xhr,status,error) => {
				$("#unsuccessful_modal").text("There was a error processing this request");
				$("#unsuccessful_modal").show().delay(2500).fadeOut();
			})
        })

    } catch (e){
    $("#unsuccessful_modal").text("There was a error processing this request");
    $("#unsuccessful_modal").show().delay(2500).fadeOut();
    console.log(e)
}




//
// /* Contact Form
//  * ------------------------------------------------------ */
//  var ssContactForm = function() {
//
//  	/* local validation */
// 	$('#contactForm').validate({
//
// 		/* submit via ajax */
// 		submitHandler: function(form) {
// 			var sLoader = $('#submit-loader');
//
// 			$.ajax({
// 		      type: "POST",
// 		      url: "inc/sendEmail.php",
// 		      data: $(form).serialize(),
//
// 		      beforeSend: function() {
// 		      	sLoader.fadeIn();
// 		      },
// 		      success: function(msg) {
// 	            // Message was sent
// 	            if (msg == 'OK') {
// 	            	sLoader.fadeOut();
// 	               $('#message-warning').hide();
// 	               $('#contactForm').fadeOut();
// 	               $('#message-success').fadeIn();
// 	            }
// 	            // There was an error
// 	            else {
// 	            	sLoader.fadeOut();
// 	               $('#message-warning').html(msg);
// 		            $('#message-warning').fadeIn();
// 	            }
// 		      },
// 		      error: function() {
// 		      	sLoader.fadeOut();
// 		      	$('#message-warning').html("Something went wrong. Please try again.");
// 		         $('#message-warning').fadeIn();
// 		      }
// 	      });
//   		}
//
// 	});
//  };
//

// /* AjaxChimp
// * ------------------------------------------------------ */
// var ssAjaxChimp = function() {
//
// 	$('#mc-form').ajaxChimp({
// 		language: 'es',
// 	   url: cfg.mailChimpURL
// 	});
//
// 	// Mailchimp translation
// 	//
// 	//  Defaults:
// 	//	 'submit': 'Submitting...',
// 	//  0: 'We have sent you a confirmation email',
// 	//  1: 'Please enter a value',
// 	//  2: 'An email address must contain a single @',
// 	//  3: 'The domain portion of the email address is invalid (the portion after the @: )',
// 	//  4: 'The username portion of the email address is invalid (the portion before the @: )',
// 	//  5: 'This email address looks fake or invalid. Please enter a real email address'
//
// 	$.ajaxChimp.translations.es = {
// 	  'submit': 'Submitting...',
// 	  0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
// 	  1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
// 	  2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
// 	  3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
// 	  4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
// 	  5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
// 	}
//
// };


/* Back to Top
  * ------------------------------------------------------ */
var ssBackToTop = function () {

    var pxShow = 500,         // height on which the button will show
        fadeInTime = 400,         // how slow/fast you want the button to show
        fadeOutTime = 400,         // how slow/fast you want the button to hide
        scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
        goTopButton = $("#go-top")

    // Show or hide the sticky footer button
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= pxShow) {
            goTopButton.fadeIn(fadeInTime);
        } else {
            goTopButton.fadeOut(fadeOutTime);
        }
    });
};


/* Initialize
  * ------------------------------------------------------ */
(function ssInit() {

    ssPreloader();
    // ssFitVids();
    // ssMasonryFolio();
    // ssLightGallery();
    ssFlexSlider();
    ssOwlCarousel();
    ssMenuOnScrolldown();
    ssOffCanvas();
    ssSmoothScroll();
    ssPlaceholder();
    ssAlertBoxes();
    ssAnimations();
    ssIntroAnimation();
    // ssContactForm();
    // ssAjaxChimp();
    ssBackToTop();

})();


})
(jQuery);
