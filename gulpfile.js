var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
    



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
