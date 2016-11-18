'use strict'
//引入模块
var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

//注册任务
//复制文件
gulp.task('copy', function() {
    gulp.src('src/index.html') //取文件
        .pipe(gulp.dest('dist/')); //流入管道pipe(dist输入文件)
})
//监视文件改动
gulp.task('dist', function() {
    gulp.watch('src/index.html', ['copy'])
        //gulp.watch('src/style/*.less',['style'])
    gulp.watch('src/style/*.scss', ['stylesass'])
})
//less编译
gulp.task('styleless', function() {
    gulp.src('src/style/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css/'))
})
//sass编译
gulp.task('stylesass', function() {
    gulp.src('src/style/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css/'))
        .pipe(cssnano())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest('dist/css/'))
        .pipe(reload({ stream: true }))
})

//browser-sync浏览器同步
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
    gulp.watch('src/style/*.scss', ['stylesass'])
    gulp.watch("dist/*.html").on('change', reload);
});

//默认任务调用
gulp.task('default', ['serve']);
