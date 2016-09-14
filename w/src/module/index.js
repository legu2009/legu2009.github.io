(function() {
    $('#leftMenu').mmenu({
        extensions: [ 'effect-slide-menu', 'shadow-page', 'shadow-panels' ],
        counters: true,
        navbar: {
            title: 'Advanced menu'
        },
        navbars: [
            {
                position: 'top',
                content: [ 'searchfield' ]
            }, {
                position: 'top',
                content: [
                    'prev',
                    'title',
                    'close'
                ]
            }, {
                position: 'bottom',
                content: [
                    '<a href="http://mmenu.frebsite.nl/wordpress-plugin.html" target="_blank">WordPress plugin</a>'
                ]
            }
        ]
    });

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
