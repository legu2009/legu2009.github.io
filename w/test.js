var chokidar = require('chokidar');
var images = require("images");
var fs = require("fs");
var Handlebars = require('handlebars');
var pathN = require('path');

var path = './v3-mobile-snail-com/qnk/';
var makeImageWatch = function (flies, done) {
	var _cache = {};
	var _isdone = false;
	var watcher = chokidar.watch(flies, {
		ignored: /[\/\\]\./,
		persistent: true
	});
	watcher.on('add', path => {
		_cache[path] = images(path).size();
		if (_isdone) {
			done(_cache);
		}
	}).on('change', path => {
		_cache[path] = images(path).size();
		done(_cache);
	}).on('unlink', path => {
		_cache[path] = null;
		delete _cache[path]
		done(_cache);
	}).on('ready', function() {
		_isdone = true;
		done(_cache);
	})
	return watcher;
};
var cssDir = path + 'css/';
var imagesDir = path + 'images/';
makeImageWatch([path + 'images/**/*'], function (cache) {
	var data = {map: []};
	var map = data.map, obj;
	for (var key in cache) {
		obj = cache[key];
		map.push({
			name: pathN.relative(imagesDir, key).replace(/\\/g, '$'),
			url: pathN.relative(cssDir, key).replace(/\\/g, '/'),
			width: obj.width, 
			height: obj.height
		})
	}
	fs.readFile(__dirname + "/_mobile_imgs.tmpl", (err, str) => {
		var template = Handlebars.compile(str.toString());
		fs.writeFile(cssDir + 'images.styl', template(data), (err) => {
			if (err) throw err;
		});
	})
})



