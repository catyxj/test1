var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-clean-css');



//合并压缩css
gulp.task('minCss',function(){
	gulp.src(['css/bootstrap.min.css','js/scripts/ladda/ladda-themeless.min.css','css/components-rounded.min.css',
	'js/asset/angular-ui-select/select.css','js/asset/angular-bootstrap-switch/bootstrap-switch.min.css',
	'js/lib/sweetalert2/dist/sweetalert2.min.css','css/spinner.css'])
	.pipe(concat('base.min.css'))
	.pipe(cssmin())
	.pipe(gulp.dest('css'));
})

//合并压缩js插件
gulp.task('js', function () {
   gulp.src(['js/asset/jquery.min.js','js/asset/bootstrap.min.js',
   'js/asset/angular.min.js',
   'js/asset/ui-bootstrap-tpls-2.5.0.min.js',
   'js/scripts/ladda/spin.min.js',
   'js/scripts/ladda/ladda.min.js',
   'js/asset/lib/*.min.js',
   'js/asset/lib/*.js'])
      .pipe(concat('base.js')) 
      .pipe(uglify())
      .pipe(gulp.dest('js'));
});


gulp.task('concatmoment', function () {
   gulp.src(['js/asset/moment/moment.js','js/asset/moment/lacale/zh-cn.js',
   'js/asset/angular-moment/angular-moment.min.js'])
      .pipe(concat('moment.min.js')) 
      .pipe(uglify())
      .pipe(gulp.dest('js/asset'));
});





