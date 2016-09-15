;(function(undefine) {
    var $win = $(window);
    var $doc = $(document);
    var $body = $('body');

    var $bottom = $('.nav-bottom');
    $('.fixed-nav').on('click', '.nav-item', function () {
        $('.nav-item').removeClass('sel');
        var index = $(this).addClass('sel').index();
        $bottom.css('left', index * 25 + '%');
        query.q(index);
    })

    $('.bond-list').on('click', '.bond-item', function () {
        window.location.href = 'detail.html?id=' + this.getAttribute('bondId'); 
    })
    
    var query = (function () {
        var tpl = util.template($('#bondItemTpl').html());
        var _params = {Rows: 10};
        var _isEnd = false;
        var _isLoadingMore = false;
        var map = ['', 'QSCPXX', 'TZQX', 'PMLL'];
        var $box = $('.bond-list');
        var winHeight = $win.height();
        $win.on('scroll', function () {
            if (!_isEnd && !_isLoadingMore) {
                if ($doc.height() - ($doc.scrollTop() + winHeight) <= 80) {
                    query.more();
                }
            }
        })
        var ck = function () {
            _isLoadingMore = false;
        }
        return {
            q: function (index) {
                if (index !== undefine) {
                    var sort = map[index] || '';
                    if (_params.Sort !== sort) {
                        _params.Page = 1;
                        _params.Sort = sort;
                        _isLoadingMore = false;
                        _isEnd = false;
                        $box.html('');
                        //加载中
                    }
                }
                var p = $.extend({}, _params);
                _params = p;
                return $.post('http://120.132.55.17:3402/api/info/getPIPEsList', p).done(function (data) {
                    if (_params == p) {
                        $box.append(tpl({list: data.Data.rows}));
                        if (p.Rows * p.Page >= data.Data.total) {//无下一页
                            _isEnd = true;
                        }
                    }
                })
            },
            more: function () {
                if (!_isEnd && !_isLoadingMore) {
                    _params.Page++;
                    _isLoadingMore = true;
                    this.q().done(function () {
                        setTimeout(ck, 2000)
                    });
                }
            }
        }
    })();

    query.q(0);
})();