'use strict'
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var SOURCE_PATH = './src/**/*.js';


// gulp.task('build', function () {
//   return gulp.src(SOURCE_PATH)
//     .pipe(babel())
//     .pipe(concat('util.js'))
//     .pipe(gulp.dest('dist'));
// });
// gulp.task('watch', function(callback) { gulp.watch(SOURCE_PATH, ['build']) });



gulp.task('lint', function() {
  return gulp.src(SOURCE_PATH)
    .pipe(eslint())
    .pipe(eslint.format());
});


// ----------------------------------------------------------------------------
// gulp.task('default', ['build', 'watch']);
gulp.task('default', ['lint']);
