var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var plumber = require('gulp-plumber');  // 错误自启动
var browserify = require('browserify');
var del = require('del');
var watchify = require('watchify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
// var stylish = require('jshint-stylish');
var buffer = require('vinyl-buffer');
var _ = require('lodash');
var TARGET = process.env.npm_lifecycle_event;
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var api = require('./api/api');
var srcRoot = './src';
var dist = './dist';
var client ='./dist/html'

gulp.task('clean', function(cb) {
  return del([
    'app/tmp'
  ], cb);
});

gulp.task('html', function() {
  return gulp.src(srcRoot+'/html/**')
    .pipe(plumber())
    .pipe(gulp.dest(dist + '/html'));
});

gulp.task('styles', function() {
  return gulp.src(srcRoot+'/scss/**/*.scss')
    .pipe(sass())
    .pipe($.autoprefixer())
    .pipe(gulp.dest(dist+'/css'))
    .pipe(reload({stream: true}));
});

var handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);
  delete args[0].stream;
  $.util.log.apply(null, args);
  this.emit('end');
};

gulp.task('scripts', function() {
   return gulp.src(srcRoot + '/js/**/*.js')
              .on('error', handleErrors)
              .pipe(gulp.dest(dist+'/js'))
              // .on('end',cb)
              .pipe(reload({stream: true}));
});

gulp.task('common-script',function(){
  return gulp.src(srcRoot + '/html/common/*.js')
            .on('error', handleErrors)
            .pipe(gulp.dest(dist + '/html/common'))
            .pipe(reload({stream: true}));
});

gulp.task('js-watch',['scripts'],reload);
gulp.task('js-common',['common-script'],reload);

gulp.task('build', [
  'clean',
  'html',
  'common-script',
  'styles',
  'scripts'
]);

gulp.task('watch', ['build'], function() {
  
  browserSync.init({
    server: {
      baseDir: dist,
      middleware: function(req, res, next) {
        api(req, res, next);
      }
    }
  });
  
  gulp.watch(['src/js/**/*.js'], ['js-watch','js-common']);
  gulp.watch(['src/scss/**/*.scss'], ['styles']);
  gulp.watch(['src/html/*.html'], ['html']).on('change',reload);
});

gulp.task('default', ['watch']);
