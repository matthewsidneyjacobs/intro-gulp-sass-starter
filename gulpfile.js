var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    print = require('gulp-print'),
    babel = require('gulp-babel');
    //babel-preset-es2015


var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('sayhello', function() {
  console.log('hello dm16')
});

gulp.task('saybye', function() {
  console.log('bye dm16')
});

gulp.task('clean', function (cb) {
    del([
        'dist'
    ], cb);
});

gulp.task('build-css', function() {
  gulp.src('./styles/*')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(cachebust.resources())
  .pipe(concat('styles.css'))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./dist'));
});

// you can pass in an array of multiple tasks
gulp.task('build', ['build-js','build-css'], function() {
  return gulp.src('index.html')
    .pipe(cachebust.references())
    .pipe(gulp.dest('dist'));
})


// gulp watch first array is something for gulp to watch, second array is tasks to run
gulp.task('watch', function() {
    return gulp.watch(['./index.html','./partials/*.html', './styles/*.*css', './js/**/*.js'], ['build']);
});

gulp.task('build-js', function() {
   return gulp.src('js/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(print())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('bundle.js'))
      // .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/js'));
});
