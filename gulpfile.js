var gulp = require('gulp'),
	clean = require('gulp-clean'), // 清理文件
	concat = require('gulp-concat'),// 合并文件
	jsHint = require('gulp-jshint'),// 检查js
	gulpImagemin = require('gulp-imagemin'),// 压缩图片
	gulpMinifycss = require('gulp-minify-css'),// 压缩css
	gulpUglify = require('gulp-uglify'),// 压缩js
	gulpHtmlmin = require('gulp-htmlmin')// 压缩html


// 每次发布都清理一次
gulp.task('clean',function(){
	return gulp.src(['./dist/controller/*','./dist/libs/*','./dist/mocks/*','./dist/res/*','./dist/tpl/*','./dist/index.html','./dist/main.js'],{read:false})
    .pipe(clean({force:true}));
}); 

// HTML处理
gulp.task('html', function() {
    var htmlSrc = './src/tpl/*.html',
        htmlDst = './dist/tpl';

    gulp.src(htmlSrc)
        .pipe(gulpHtmlmin())
        .pipe(gulp.dest(htmlDst))
});

// js处理
gulp.task('js', function () {
    var jsSrc = './src/controller/*.js',
        jsDst ='./dist/controller';

    gulp.src(jsSrc)
        .pipe(gulpUglify())
        .pipe(gulp.dest(jsDst));
});
// js库处理
gulp.task('libs', function () {
    var jsSrc = './src/libs/*.js',
        jsDst ='./dist/libs';

    gulp.src(jsSrc)
        .pipe(gulpUglify())
        .pipe(gulp.dest(jsDst));
});
// data
gulp.task('data', function () {
    var jsSrc = './src/mocks/*.js',
        jsDst ='./dist/mocks';

    gulp.src(jsSrc)
        .pipe(gulpUglify())
        .pipe(gulp.dest(jsDst));
});

// 样式处理
gulp.task('css', function () {
    var cssSrc = './src/res/css/*',
        cssDst = './dist/res/css';

    gulp.src(cssSrc)
        .pipe(gulp.dest(cssDst))
        .pipe(gulpMinifycss())
        .pipe(gulp.dest(cssDst));
});

// 图片处理
gulp.task('images', function(){
    var imgSrc = './src/res/img/*',
        imgDst = './dist/res/img';
    gulp.src(imgSrc)
        .pipe(gulpImagemin())
        .pipe(gulp.dest(imgDst));
});

// index.html 压缩
gulp.task('index', function(){
    var indexSrc = './src/index.html',
        indexDst = './dist';
    gulp.src(indexSrc)
        .pipe(gulpHtmlmin())
        .pipe(gulp.dest(indexDst));
});
// main.js压缩
gulp.task('main', function(){
    var mainSrc = './src/main.js',
        mainDst = './dist';
    gulp.src(mainSrc)
        .pipe(gulpUglify())
        .pipe(gulp.dest(mainDst));
});


// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
    gulp.start('html','css','images','js','index','main','libs','data');
});
