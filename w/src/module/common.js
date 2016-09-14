;(function() {
    
    (function ($) {
        var pluses = /\+/g;
 
        function encode(s) {
            return config.raw ? s : encodeURIComponent(s);
        }
 
        function decode(s) {
            return config.raw ? s : decodeURIComponent(s);
        }
 
        function stringifyCookieValue(value) {
            return encode(config.json ? JSON.stringify(value) : String(value));
        }
 
        function parseCookieValue(s) {
            if (s.indexOf('"') === 0) {
                // This is a quoted cookie as according to RFC2068, unescape...
                s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            }
            try {
                // Replace server-side written pluses with spaces.
                // If we can't decode the cookie, ignore it, it's unusable.
                s = decodeURIComponent(s.replace(pluses, ' '));
            } catch (e) {
                return;
            }
            try {
                // If we can't parse the cookie, ignore it, it's unusable.
                return config.json ? JSON.parse(s) : s;
            } catch (e) {}
        }
 
        function read(s, converter) {
            var value = config.raw ? s : parseCookieValue(s);
            return $.isFunction(converter) ? converter(value) : value;
        }
 
        var config = $.cookie = function (key, value, options) {
            if (value !== undefined && !$.isFunction(value)) {
                options = $.extend({}, config.defaults, options);
                if (typeof options.expires === 'number') {
                    var days = options.expires,
                        t = options.expires = new Date();
                    t.setDate(t.getDate() + days);
                }
                return (document.cookie = [
                    encode(key), '=', stringifyCookieValue(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
 
                    options.path ? '; path=' + options.path : '',
                    options.domain ? '; domain=' + options.domain : '',
                    options.secure ? '; secure' : ''
                ].join(''));
            }
            var result = key ? undefined : {};
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            for (var i = 0, l = cookies.length; i < l; i++) {
                var parts = cookies[i].split('=');
                var name = decode(parts.shift());
                var cookie = parts.join('=');
                if (key && key === name) {
                    result = read(cookie, value);
                    break;
                }
                if (!key && (cookie = read(cookie)) !== undefined) {
                    result[name] = cookie;
                }
            }
            return result;
        };
        config.defaults = {};
        $.removeCookie = function (key, options) {
            if ($.cookie(key) !== undefined) {
                $.cookie(key, '', $.extend({}, options, {
                    expires: -1
                }));
                return true;
            }
            return false;
        };
    })($);

    var template = (function () {
        var noMatch = /(.)^/;
        var escapes = {
            "'": "'",
            '\\': '\\',
            '\r': 'r',
            '\n': 'n',
            '\t': 't',
            '\u2028': 'u2028',
            '\u2029': 'u2029'
        };
        var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        var settings = {
            evaluate: /<@([\s\S]+?)@>/g,
            interpolate: /<@=([\s\S]+?)@>/g,
            escape: /<@-([\s\S]+?)@>/g
        };
 
        var matcher = new RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (
                settings.evaluate || noMatch).source].join('|') + '|$', 'g');
 
        return function (text, data) {
            var render;
            var index = 0;
            var source = "__p+='";
            text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
                source += text.slice(index, offset).replace(escaper, function (match) {
                    return '\\' + escapes[match];
                });
                if (escape) {
                    source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
                }
                if (interpolate) {
                    source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
                }
                if (evaluate) {
                    source += "';\n" + evaluate + "\n__p+='";
                }
                index = offset + match.length;
                return match;
            });
            source += "';\n";
            if (!settings.variable)
                source = 'with(obj||{}){\n' + source + '}\n';
            source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" +
                source + "return __p;\n";
 
            try {
                render = new Function(settings.variable || 'obj', source);
            } catch (e) {
                e.source = source;
                throw e;
            }
 
            if (data)
                return render(data);
            var template = function (data) {
                return render.call(this, data);
            };
            template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';
            return template;
        };
    })();

    $('header .back').on('click', function () {
        history.back();
    })
    window.util = {
        template: template
    }
})();