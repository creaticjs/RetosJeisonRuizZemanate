var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var webserver = require('gulp-webserver');
var htmlmin = require('gulp-htmlmin');

var scripts = [
  'js/jquery.min.js',
  'js/analytics.js',
  'js/main.js'
];
gulp.task('scripts', function() {
  gulp.src(scripts)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public'));
});


var stylesheets = ['scss/*.scss'];
gulp.task('stylesheets', function () {
  gulp.src('scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: 'last 20 versions'}))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('public'));
});

gulp.task('minify-html', function () {
  return gulp.src('index_dev.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('.'));
});

gulp.task('dev', ['scripts', 'stylesheets', 'minify-html'], function () {
  gulp.watch(scripts, ['scripts']);
  gulp.watch(stylesheets, ['stylesheets'])
  gulp.watch('index_dev.html', ['minify-html'])
  gulp.src('.').pipe(webserver({host: '0.0.0.0'}));
});

gulp.task('default', ['scripts', 'stylesheets', 'minify-html']);
