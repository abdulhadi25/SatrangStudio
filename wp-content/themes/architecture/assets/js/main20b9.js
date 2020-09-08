;(function ($) {

    "use strict";

    /* ===================
     Page reload
     ===================== */

    $(window).on('load', function () {
        $(".loader2").fadeOut("slow");
        arctecture_col_offset();
        arctecture_header_sticky();
        arctecture_menu_mobile();
        arctecture_rtl();
        arctecture_scroll_to_top();
        arctecture_item_sameheight();
    });
    $(window).on('resize', function () {
        arctecture_col_offset();
        arctecture_header_sticky();
        arctecture_menu_mobile();
        arctecture_item_sameheight();
    });

    var scroll_top;
    var window_height;
    var scroll_status = '';
    var lastScrollTop = 0;
    $(window).on('scroll', function () {
        scroll_top = $(window).scrollTop();
        window_height = $(window).height();
        if (scroll_top < lastScrollTop) {
            scroll_status = 'up';
        } else {
            scroll_status = 'down';
        }
        lastScrollTop = scroll_top;
        arctecture_header_sticky();
        arctecture_scroll_to_top();
    });

    $(document).ready(function () {

        /* =================
         Menu Dropdown
         =================== */
        var $menu = $('.main-navigation');
        $menu.find('ul.sub-menu > li').each(function () {
            var $submenu = $(this).find('>ul');
            if ($submenu.length == 1) {
                $(this).hover(function () {
                    if ($submenu.offset().left + $submenu.width() > $(window).width()) {
                        $submenu.addClass('back');
                    } else if ($submenu.offset().left < 0) {
                        $submenu.addClass('back');
                    }
                }, function () {
                    $submenu.removeClass('back');
                });
            }
        });
        $('#pagetitle').parent().find('.header-layout1 .site-header-main').addClass('offset-down-on');
        /* =================
         Menu Mobile
         =================== */
        $("#main-menu-mobile .open-menu").on('click', function () {
            $(this).toggleClass('opened');
            $('#site-navigation').toggleClass('navigation-open');
        })

        /* ===================
         Search Toggle
         ===================== */
        $('.h-btn-search').click(function (e) {
            e.preventDefault();
            $('.cms-search-popup').removeClass('remove').toggleClass('open').find('.search-field').focus();
        });
        $('.btn-sign-up').click(function (e) {
            e.preventDefault();
            $('.cms-register-popup').removeClass('remove').toggleClass('open');
            $('.cms-login-popup').removeClass('open');
        });
        $('.btn-sign-in').click(function (e) {
            e.preventDefault();
            $('.cms-login-popup').removeClass('remove').toggleClass('open');
            $('.cms-register-popup').removeClass('open');
        });
        $('.cms-close').click(function (e) {
            e.preventDefault();
            $(this).parent().addClass('remove').removeClass('open');
            $(this).parents('.cms-modal').addClass('remove').removeClass('open');
        });
        $(document).on('click', function (e) {
            if (e.target.className == 'cms-modal cms-search-popup open')
                $('.cms-search-popup').removeClass('open').addClass('remove');
            if (e.target.className == 'cms-modal cms-login-popup open')
                $('.cms-login-popup').removeClass('open').addClass('remove');
            if (e.target.className == 'cms-modal cms-register-popup open')
                $('.cms-register-popup').removeClass('open').addClass('remove');
        });

        /* ===================
         Cart Toggle
         ===================== */
        $('#header-cart .cart-toggle').click(function (e) {
            e.preventDefault();
            $('#header-search .searchform').removeClass('active');
            $('#header-cart .cartform').toggleClass('active');
        });

        /* ====================
         Scroll To Top
         ====================== */
        $('.scroll-top').click(function () {
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        });

        /* Video 16:9 */
        $('.entry-video iframe').each(function () {
            var v_width = $(this).width();

            v_width = v_width / (16 / 9);
            $(this).attr('height', v_width + 35);
        });
        /* Images Light Box - Gallery:True */
        $('.images-light-box').each(function () {
            $(this).magnificPopup({
                delegate: 'a.light-box',
                type: 'image',
                gallery: {
                    enabled: true
                },
                mainClass: 'mfp-fade',
            });
        });
        /* Video Light Box */
        $('.cms-video-button, .btn-video').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,

            fixedContentPos: false
        });

        /* ===================
        Accordion Toggle
        ===================== */
        $('div.card-header').on('click', function () {
            var _this = $(this).next(),
                _parent = $(this);
            if (_this.css('display') === 'block') {
                _this.slideToggle();
                _parent.removeClass('cms-active');
            } else {
                $('.collapse').hide('fast');
                _this.slideToggle();
                _parent.addClass('cms-active');
            }
        });

        $( ".cms-accordion-heading span" ).each(function() {
            $(this).on("click", function(){
                $(this).parents('.cms-accordion-inner').find('.cms-accordion-items .collapse').each(function () {
                   var _this = $(this);
                   if (_this.css('display') === 'none'){
                       _this.toggle('slow');
                       _this.prev().addClass('cms-active');
                   }
                });
            });
        });

        /* ===================
        Theia Sticky Sidebar
        ===================== */
        var sidebarOffset = 90;
        $(".sidebar-fixed").theiaStickySidebar({
            "containerSelector": "",
            "additionalMarginTop": sidebarOffset,
            "additionalMarginBottom": "0",
            "updateSidebarHeight": false,
            "minWidth": "768",
            "sidebarBehavior": "modern"
        });
        /* =================
         Onepage
         =================== */
        if (typeof(one_page_options) != "undefined") {
            one_page_options.speed = parseInt(one_page_options.speed);
            $('ul.menu').singlePageNav(one_page_options);
        }
        /* =================
         ACM Title
         =================== */
        $(".acm-title-line").each(function () {
            var w_t_acm = $(this).find('span').width() + 26;
            $(this).find('hr').css('left', w_t_acm + 'px');
        });
        /* =================
         Add Class
         =================== */
        $('.wpcf7-select').parent().addClass('wpcf7-menu');
        /* =================
         Row & VC Column Animation
         =================== */
        $('.vc_row.wpb_row.vc_row-fluid').each(function(){
            var vctime = 100;
            var vc_inner = $(this).children().length;
            var _vci = vc_inner - 1;
            $(this).find('> .wpb_animate_when_almost_visible').each(function (index,obj) {
                $(this).css('animation-delay', vctime + 'ms');
                if(_vci === index){
                    vctime = 100;
                    _vci = _vci + vc_inner;
                }else{
                    vctime = vctime + 100;
                }
            })
        });
        /* CMS Grid Animation */
        var time = 100;
        var _i = 2;
        $('.cms-grid').find('.grid-item-inner').each(function (index,obj) {
            $(this).css('animation-delay', time + 'ms');
            if(_i === index){
                time = 100;
                _i = _i + 3;
            }else{
                time = time + 100;
            }
        })

        $('.rm-padding-lg').parent().addClass('row-rm-padding-lg');
        $('.rm-padding-md').parent().addClass('row-rm-padding-md');
        $('.rm-padding-sm').parent().addClass('row-rm-padding-sm');
        $('.rm-padding-xs').parent().addClass('row-rm-padding-xs');
        /* =================
        WooCommerce
        =================== */
        $('.widget_product_search .search-field').find("input[type='text']").each(function (ev) {
            if (!$(this).val()) {
                $(this).attr("placeholder", "Search and Press Enter");
            }
        });
        $('.tnp-field-email').find(".tnp-email").each(function (ev) {
            if (!$(this).val()) {
                $(this).attr("placeholder", "Subscribe Our Newsletter");
            }
        });
        $('.woocommerce-cart-meta').on('click', function(){
            $(this).parent().find('.widget_shopping_cart').toggleClass('cart-open');
        });
        $('.cms-select form').append('<i class="fa fa-chevron-down"></i>');
        $('.variations select').parent().addClass('cms-select');
        $('.variations .cms-select').append('<i class="fa fa-chevron-down"></i>');

        var htmlWoo = $(".cms-shop-carousel .woocommerce ul.products").html();
        $(".cms-shop-carousel div.woocommerce").remove();
        $(".cms-shop-carousel").append(htmlWoo);

    });
    

    /* CMS Image Popup */
    $('.cms-images-zoom').magnificPopup({
      delegate: 'a.z-view', // child items selector, by clicking on it popup will open
      type: 'image',
      gallery: {
         enabled: true
      },
      mainClass: 'mfp-fade',
      // other options
    });

    $('.cms-image-zoom').magnificPopup({
      delegate: 'a.z-view', // child items selector, by clicking on it popup will open
      type: 'image',
      gallery: {
         enabled: false
      },
      mainClass: 'mfp-fade',
      // other options
    });

    $('.cshero-product-images').magnificPopup({
      delegate: 'a.zoom', // child items selector, by clicking on it popup will open
      type: 'image',
      gallery: {
         enabled: false
      },
      mainClass: 'mfp-fade',
      // other options
    });


    /* =================
     Column Absolute
     =================== */
    function arctecture_col_offset() {
        var w_vc_row_lg = ($('#content').width() - 1230) / 2;
        var w_vc_row_md = ($('#content').width() - 1140) / 2;
        if($(window).width() > 1260) {
            $('.col-offset-right > .vc_column-inner').css('padding-right', w_vc_row_lg + 'px');
            $('.col-offset-left > .vc_column-inner').css('padding-left', w_vc_row_lg + 'px');
        }
        if($(window).width() < 1260 && $(window).width() > 1200) {
            $('.col-offset-right > .vc_column-inner').css('padding-right', w_vc_row_md + 'px');
            $('.col-offset-left > .vc_column-inner').css('padding-left', w_vc_row_md + 'px');
        }
    }
    function arctecture_header_sticky() {
        var offsetTop = $('#site-header-wrap').outerHeight();
        var offsetTopAnimation = offsetTop + 200;
        if (scroll_status == 'down' && scroll_top > offsetTopAnimation) {
            $('#headroom').addClass('headroom--down').removeClass('headroom--up');
        } 
        if (scroll_status == 'up' && scroll_top > offsetTopAnimation) {
            $('#headroom').addClass('headroom--up').removeClass('headroom--down');
        } else if (scroll_status == 'up' && scroll_top < offsetTopAnimation) {
            $('#headroom').removeClass('headroom--up');
        }
    }
    function arctecture_menu_mobile() {
        if ($(window).width() < 991) {
            $('.main-navigation li.menu-item-has-children').append('<span class="main-menu-toggle"></span>');
            $('.main-menu-toggle').on('click', function () {
                $(this).parent().find('> .sub-menu').toggleClass('submenu-open');
                $(this).parent().find('> .sub-menu').slideToggle();
            });
        }
    }

    function arctecture_item_sameheight() {
        $('.cms-carousel-item div.entry-box').matchHeight();
        $('.woocommerce li.product').matchHeight();
        $('.cms-pricing-wrapper').matchHeight();
        $('.archive .content-full-width article.post').matchHeight();
        $('.owl-carousel .inner-item').matchHeight();
        
    }

    function arctecture_rtl() {
        /* =================
        RTL
        =================== */
        if( $('html').attr('dir') == 'rtl' ){
            $('[data-vc-full-width="true"]').each( function(i,v){
                $(this).css('right' , $(this).css('left') ).css( 'left' , 'auto');
            });
            $( '.acm-title-line hr' ).each( function(){
                $( this ).css( 'right' , $( this ).css( 'left' ) ).css( 'left' , '0px' );
            });
        }
    }
    /* ====================
    Scroll To Top
    ====================== */
    function arctecture_scroll_to_top() {
        if (scroll_top < window_height) {
            $('.scroll-top').addClass('off').removeClass('on');
        } else {
            $('.scroll-top').removeClass('off').addClass('on');
        }
    }
    

   $('.change-section').on('click',function (e) {
           var _link = $(this).attr('href');
           var _id_data = e.currentTarget.hash;
           if($(_id_data).length === 1){
               var _target = $(_id_data);
               $('html, body').animate({
                   'scrollTop': _target.offset().top-100
               }, 1000, function () {
                   window.location.hash = _id_data;
               });
               return false;
           }else{
               window.location.href = _link;
           }

        });

})(jQuery);
