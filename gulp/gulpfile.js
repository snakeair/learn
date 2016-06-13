var gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    postcss      = require('gulp-postcss'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'), 
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    cssmin       = require('gulp-minify-css'),
    notify       = require('gulp-notify'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin');

//监听文件的是否修改以便执行相应的任务
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('./sass/**/*', ['sass']);
  // Watch image files
  gulp.watch('src/images/**/*', ['images']);
});


//样式处理 sass编译，autoprefixer添加前缀，
gulp.task('sass', () =>
    sass('./sass/base.scss', {sourcemap: true})
        .on('error', sass.logError)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: true,  //美化属性
            remove:true     //是否去掉不必要的前缀 默认：true 
            }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'))
);

//样式压缩后重命名输出 
gulp.task('cssmin', function () {
    gulp.src('./dist/base.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'))
        .pipe(notify({ message: 'Styles task complete' }));

});

//图片压缩
gulp.task('images', function() {
  return gulp.src('./images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

//清除之前生成的文件
gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});


gulp.task('default', ['watch' ]);
