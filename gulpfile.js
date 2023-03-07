var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    cleanCss = require('gulp-clean-css'),
    inlineCss = require('gulp-inline-css'),
    gulpTemplate = require('gulp-template')
    stripComments = require('gulp-strip-comments')
    replace = require('gulp-replace')
    htmlAccents = require('gulp-html-accents');
const dayjs = require('dayjs')


var data = require('./data.json')
var date = dayjs().format("YYYYMMDD-HH[h]mm")

var htmlSrc = ['./src/emmanuelcuenod.html','./src/paolagazzini']
const cleanScss = function(){
    return gulp.src('./src/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename(function(path){
            path.extname = ".css"
        }))
        .pipe(gulp.dest('./dist/'))
}

const html = function(){
        return gulp.src(['./src/emmanuelcuenod.html','./src/paolagazzani.html'])
        .pipe(inlineCss({
            removeLinkTags: true,
            removeStyleTags: false 
        }))
        //.pipe(gulpTemplate({nom:d.nom, fonction:d.fonction}))
        // .pipe(rename(function(path){
        //     path.basename = d.nom
        //     path.extname = ".html"
        // })
        // )
        .pipe(stripComments())
      .pipe(replace('<link rel="stylesheet" href="main.css">',''))
        .pipe(htmlAccents())
        .pipe(rename(function(path){
            path.basename += date
        }))
        .pipe(gulp.dest("./dist/"))
}
exports.default = gulp.series(cleanScss,html);
