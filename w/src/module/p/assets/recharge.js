;(function() {
    util.msgCode($('.msg-code .btn'), {
        getCode: function () {
            var dtd = $.Deferred();
            var tasks = function(){
    　　　　　　dtd.resolve(); 
    　　　　};
            setTimeout(tasks, 3000);
            return dtd
            /*
            上面只是例子，正常写成下面的ajax就行
            return $.post(url, params);
             */
        }
    });
     
})();