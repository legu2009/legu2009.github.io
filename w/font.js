var fontCarrier = require('font-carrier')
var font = fontCarrier.create();
var chokidar = require('chokidar');
var pathN = require('path');
var fs = require('fs');

var path = './v3-mobile-snail-com/qnk/';
var makeImageWatch = function (flies, done) {
	var files = [];
	var _isdone = -1;
	var watcher = chokidar.watch(flies, {
		ignored: /[\/\\]\./,
		persistent: true
	});
	watcher.on('add', path => {
		if (_isdone == -1) {
			files.push(path);
		} else if (_isdone == 1) {
			done('add', path);
		}
	}).on('change', path => {
		if (_isdone == 1) {
			done('change', path);
		}
	}).on('unlink', path => {
		if (_isdone == 1) {
			done('remove', path);
		}
	}).on('ready', function() {
		_isdone = 0;
		setTimeout(function () {
			done('load', files);
			files = [];
			_isdone = 1;
		}, 1000);
	})
	return watcher;
};
var cssDir = path + 'css/';
var imagesDir = path + 'images/';
var beginNum = 0xe001;
makeImageWatch([path + 'font/svg/*.svg'], function (action, flies) {
	if (action == 'ready') {
		console.log('ready')
		var dirname = path + 'font/svg/';
		var tab = [];
		flies.forEach((f, index) => {
			var fileName = pathN.basename(f, '.svg');
			var match = fileName.match(/_(0xe.+)$/);
			if (match) {
				var num = parseInt(match[1], 16);
				if (num > beginNum) {
					beginNum = num + 1;
				}
			} else {
				tab.push(index);
			}
		})
		tab.forEach(index => {
			var f = flies[index];
			var fileName = pathN.basename(f, '.svg');
			fileName += '_0x' + beginNum.toString(16);
			fs.renameSync(f, dirname + fileName + '.svg');
			flies[index] = dirname + fileName + '.svg';
			beginNum++;
		})
	} else if (action == 'load') {
		flies.forEach(function (f) {
			var fileName = pathN.basename(f, '.svg');
			font.setSvg('&#' + fileName.match(/_0(xe.{3})/)[1] + ';', fs.readFileSync(f).toString())
		})
		font.output({
			path: path + 'font/iconfont'
		})
	} else if (action == 'change' || action == 'add') {
		var fileName = pathN.basename(flies, '.svg');
		var match = fileName.match(/_(0xe.+)$/);
		if (match) {
			var num = parseInt(match[1], 16);
			if (num > beginNum) {
				beginNum = num + 1;
			}
		} else {
			fileName += '_0x' + beginNum.toString(16);
			fs.renameSync(flies, dirname + fileName + '.svg');
			flies = dirname + fileName + '.svg';
			beginNum++;
		}
		font.setSvg('&#' + fileName.match(/_0(xe.{3})/)[1] + ';', fs.readFileSync(flies).toString());
		font.output({
			path: path + 'font/iconfont'
		})
	}
})



