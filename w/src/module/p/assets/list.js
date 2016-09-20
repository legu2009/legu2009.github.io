;(function() {
    $('.time-input').on('focus', function () {
        $(this).val('')
            .scroller('destroy')
            .scroller({
                preset: "date",
                theme: "android-ics light",
                mode: "scroller",
                display: "bottom",
                lang: "zh",
                dateFormat: 'yy/mm/dd',
                dateOrder: 'yymmdd'
            }); 
    })
})();