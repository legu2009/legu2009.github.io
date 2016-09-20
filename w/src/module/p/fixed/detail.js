;(function(undefine) {
    $('#investBtn').on('click', function () {
        location = 'confirm.html'
    })

    var $content = $('.bond-detail .content');
    $('.bond-detail .tab').on('click', 'div', function () {
        var $elm = $(this);
        $elm.addClass('sel').siblings().removeClass('sel');
        var index = $elm.index();
        $content.eq(index).addClass('show').siblings('.content').removeClass('show');
    })
    $('.ui-collect').on('click', function () {
        $(this).toggleClass('sel');
    });
    var numComponent = (function () {
        var $box = $('.num-component');
        var min = parseInt($box.attr('min') || 0, 10);
        var max = parseInt($box.attr('max') || -1, 10);
        var step = parseInt($box.attr('step') || 1, 10);
        var $ipt = $box.find('input');
        var val = parseInt($ipt.val() || 0, 10);
        var $info = $('.bond-invest .info');
        var transform = function (num) {
            var t1 = '零,壹,贰,叁,肆,伍,陆,柒,捌,玖'.split(',');
            var t2 = '元,拾,佰,仟,萬,拾萬,佰萬,仟萬,億'.split(',');
            var nt = ('' + num).split('.');
            var res = '';
            var r1 = nt[0];
            if(parseInt(r1, 10)) {
                for (var i = 0, len = r1.length; i < len; i++) {
                    if (r1[i]) {
                        res += t1[r1[i]] + t2[len-i-1]
                    }
                }
            }
            var r1 = nt[1] || '0';
            if(parseInt(r1, 10)) {
                if (r1[0])
                    res += t1[r1[0]] + '角'
                if (r1[1])
                    res += t1[r1[1]] + '分'
            }
            return res + '整';
        }
        return {
            add: function (n) {
                n = n || step;
                val += n;
                this.check();
            },
            del: function (n) {
                n = n || step;
                val -= n;
                this.check();
            },
            check: function () {
                if (val < min) {
                    val = min;
                }
                if (max != -1 && val > max) {
                    val = max;
                }
                $ipt.val(val.toFixed(2))
                $info.html(transform(val));
            },
            init: function () {
                var self = this;
                $box.on('click', '.del', function () {
                    self.del();
                }).on('click', '.add', function () {
                    self.add();
                })
                $ipt.on('change', function () {
                    val = parseFloat($ipt.val() || 0, 10);
                    self.check();
                })
                this.check();
                return this;
            }
        }
    })().init();
    

})();