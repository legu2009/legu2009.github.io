(function() {
    var isOpen = false;
    var menu = function () {
        $('.ui-left-menu')[isOpen?'addClass':'removeClass']('left-menu-open');
    }
    $('header .menu').on('click', function () {
        isOpen = !isOpen;
        menu();
    })
    $('.top-left-menu').on('click', '.menu a', function () {
        var href = this.getAttribute('data-href');
        setTimeout(function() {
            location.href = href;
        }, 200);
        isOpen = false;
        menu();
    })
    $('.mask-left-menu').on('touchstart', function () {
        isOpen = false;
        menu();
        return false;
    })

    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: 3000,
        pagination: '.swiper-pagination',
        paginationType: 'bullets',
        autoplayDisableOnInteraction: false,  
    })

    var popMenu = (function () {
        var state = "hide";
        var $box = $('.pop-menu');
        return {
            init: function () {
                var self = this;
                $box.on('click', '.pop-item', function () {
                    setTimeout(self.hide, 300)
                });
                $('header .more').on('click', function () {
                    self.toggle();
                })
                $(document).on('click', function (e) {
                    var $target = $(e.target);
                    if ($target.hasClass('more') || $target.hasClass('pop-item')|| $target.hasClass('pop-menu')) {
                    } else {
                        self.hide();
                    }
                })
                return this;
            },
            toggle: function () {
                if (state == 'show') {
                    this.hide();
                } else {
                    this.show();
                }
            },
            hide: function () {
                state = "hide";
                $box.hide();
            },
            show: function () {
                state = "show";
                $box.show();
            }
        }
    })().init();

})();
