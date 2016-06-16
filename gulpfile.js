var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var spawn = require('child_process').spawn;
var shell = require('gulp-shell');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var through = require('through2');
var gulpif = require('gulp-if');
var pkg;


var webpackConfig = require('./webpack.config.js');


gulp.task('eslint', shell.task([ 'eslint app']));
 
gulp.task('webpack', ['eslint'], function() {


  gulp.src("./app/client/index.js")
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./public'))
    .on("error", function(err){
      throw err
    })
});





gulp.task('mcss', shell.task(['mcss -c app/client/mcss/mcss.json']) )


gulp.task('build', ['mcss', 'webpack']);

gulp.task('watch', [ "build"], function(){

  gulp.watch(['app/**/*.js'], ['eslint']);
  gulp.watch(['app/client/mcss/**/*.mcss'], ['mcss']);

})

gulp.task('start', shell.task('npm run dev'))

gulp.task('default', ['watch', 'start'])
