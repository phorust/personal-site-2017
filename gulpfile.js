var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

gulp.task('sass', _ => {
  return gulp.src('./css/**/*.scss')
           .pipe(sass().on('error', sass.logError))
           .pipe(gulp.dest('./css/compiled'))
           .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], _ => {
    browserSync.init({
      server: {
        baseDir: "./"
        // middleware: [
        //   function (req, res, next) {
        //     res.setHeader('cache-control', 'max-age=600');
        //     next();
        //   }
        // ]
      }
    });

    gulp.watch("./css/**/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('watch', _ => {
  gulp.watch(['./css/**/*.scss'], ['sass']);
});

gulp.task('default', ['serve']);
