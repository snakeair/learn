var gulp            = require('gulp');
var concat          = require('gulp-concat');
var sass            = require('gulp-ruby-sass');
var watch           = require('gulp-watch');
var autoprefixer    = require('gulp-autoprefixer');
var csscombo        = require(('gulp-css-combo'));
var convertEncoding = require('fd-gulp-convert-encoding');
var post            = require('gulp-postCSS');

gulp.task('watch', function () {
    gulp.watch('../gbicom/css/common/*.css', ['concatcss']);
    gulp.watch('../gbicom/css/pages/*.css', ['concatcss']);
});

gulp.task('sass', function() {
    return sass('sass/') 
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(gulp.dest('dist/css'))
});

gulp.task('post', function () {
  var processors = [
  ];
  return gulp.src('./src/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dest'));
});

gulp.task('combo', function () {
    return gulp.src('../gbicom/css/base.css')
        .pipe(csscombo())
        .pipe(convertEncoding('utf-8'))
        .pipe(gulp.dest('../gbicom/css/base.min.css'));
});

gulp.task('default', ['post']);
