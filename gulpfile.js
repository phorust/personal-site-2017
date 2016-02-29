var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var rename      = require('gulp-rename');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var frontMatter = require('gulp-front-matter');

var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll-build', (done) => {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
           .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], _ => {
  browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'jekyll-build'], _ => {
  browserSync.init({
    server: {
      baseDir: '_site'
    }
  });
});

gulp.task('sass', _ => {
  gulp.src('./css/*.scss')
      .pipe(frontMatter())
      .pipe(sass({ includePaths: ['_sass']}).on('error', sass.logError))
      // .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
      .pipe(gulp.dest('_site/css'))
      .pipe(browserSync.stream());
  return gulp.src('./_scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    // .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', _ => {
  gulp.watch(['_sass/*.scss', 'css/*.scss'], ['sass']);
  gulp.watch([
    '*.html',
    '_layouts/*.html',
    '_includes/*.html',
    '_posts/*',
    'src/*.js'
  ], ['jekyll-rebuild']);
});

gulp.task('build', _ => {
  return gulp.src('index.html')
             .pipe(rename('software.html'))
             .pipe(gulp.dest('./'))
             .pipe(rename('visual.html'))
             .pipe(gulp.dest('./'))
             .pipe(rename('index.html'))
             .pipe(gulp.dest('./blog/'));
});

gulp.task('default', ['browser-sync', 'watch']);
