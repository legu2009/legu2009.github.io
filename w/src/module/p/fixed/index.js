;(function(undefine) {
    var $bottom = $('.nav-bottom');
    $('.fixed-nav').on('click', '.nav-item', function () {
        $('.nav-item').removeClass('sel');
        var index = $(this).addClass('sel').index();
        $bottom.css('left', index * 25 + '%');
        query.q(index);
    })
    var tpl = util.template($('#bondItemTpl').html());
    var query = (function () {
        var _params = {};
        var _isEnd = false;
        var map = ['', 'QSCPXX', 'TZQX', 'PMLL'];
        return {
            q: function (index) {
                if (index !== undefine) {
                    var sort = map[index] || '';
                    if (_params.Sort !== sort) {
                        _params.Page = 1;
                        _params.Sort = sort;
                        _isEnd = false;
                    }
                }
                $.post('http://120.132.55.17:3402/api/info/getPIPEsList', _params).done(function (res) {
                    console.log(res);
                })
            },
            more: function () {
                if (!_isEnd) {
                    _params.Page++;
                    this.q();
                }
            }
        }
    })();

    query.q(0);
})();