;(function() {
    
    
    var $bTime = $('#bTime');
    var $eTime = $('#eTime');
    $('.time-input').each(function () {
        var d = new Date();
        if (this.id == "bTime") {
            d.setDate(d.getDate()-7)
        }
        this.value = util.formatDate(d, "yyyy/MM/dd");
        $(this).mobiscroll().date({
            theme: "android-ics light",
            mode: "scroller",
            display: "bottom",
            lang: "zh",
            dateFormat: 'yy/mm/dd',
            dateOrder: 'yymmdd',
            onBeforeClose: function (valueText, btn, inst) {
                console.log(valueText, btn, inst)
            },
            onCancel: function (valueText, inst) {
                    console.log(valueText, inst)
            },
            onChange: function (valueText, inst) {
                    console.log(valueText, inst)
            },
            onSelect: function (valueText, inst) {
                setTimeout(function() {
                    if ($bTime.val() >= $eTime.val()) {
                        util.toast.show('开始日期 不能大于 结束日期');
                        inst.show();
                    }
                }, 500);
            },
            onClosed: function (valueText, inst) {
                    console.log(valueText, inst)
                    return false;
            }
        })
    })

    $('.time-input').on('click', function () {
        $(this).mobiscroll('show');
    })
})();