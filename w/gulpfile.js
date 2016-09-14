var gulp = require('gulp');
var injectfile = require("gulp-inject-file");
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var images = require("images");
var pathN = require('path');
var fs = require('fs');

var path = './';
var glob = require('glob')



gulp.task('jade', function() {
  gulp.src(path + '*.jade')
    .pipe(jade({pretty: true}))
    .on('error', gutil.log)
    .pipe(gulp.dest(path))
 gulp.src(path + 'p/**/*.jade')
    .pipe(jade({pretty: true}))
    .on('error', gutil.log)
    .pipe(gulp.dest(path + 'p/'))
});

gulp.task('stylus', function() {
  gulp.src(path + 'src/css/*.styl')
    .pipe(stylus())
    .on('error', gutil.log)
    .pipe(gulp.dest(path + 'src/css/'));
});

gulp.task('develop', function() {
    gulp.run(['jade', 'stylus']);
    watch([path + '*.jade', path + 'p/**/*.jade'], batch(function (events, done) {
        gulp.start('jade', done);
    }));
    watch(path + 'src/css/*.styl', batch(function (events, done) {
        gulp.start('stylus', done);
    }));
});