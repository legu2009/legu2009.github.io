;(function(undefine) {
    var $content = $('.bond-detail .content');
    $('.bond-detail .tab').on('click', 'div', function () {
        var $elm = $(this);
        $elm.addClass('sel').siblings().removeClass('sel');
        var index = $elm.index();
        $content.eq(index).addClass('show').siblings('.content').removeClass('show');
    })
})();