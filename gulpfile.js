var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var rename      = require('gulp-rename');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var frontMatter = require('gulp-front-matter');
var preprocess  = require('gulp-preprocess');

var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// rest parameter was canceled
function build_layout() {
  var images = [];
  for (var i = 0; i < arguments.length; i++) { images.concat(arguments[i]); }
  console.log(arguments);
  var markup = `<div class='fullbleed'>
                  <div class='img-grid grid-layout-1'>`;
  for (var image of images) {
    if (image.indexOf(',') === -1) {
      markup += `<img src="${image}"/>`;
    } else {
      // Array, render multiple
      image = image.split(',');
      markup += `<div class='grid-layout1-${image.length}'>`
      for (var i of image) {
        markup += `<img src="${i}"/>`
      }
      markup += `</div>`;
    }
  }

  markup += `  </div>
             </div>`;
  return markup;
}

gulp.task('build-posts', _ => {
  gulp.src('./_post_drafts/*.md')
      .pipe(preprocess({
        context: {
          BUILD_LAYOUT: build_layout,
        },
        extension: 'html'
      }))
      .pipe(gulp.dest('./_posts'));
});

gulp.task('jekyll-build', (done) => {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
           .on('close', done);
});

gulp.task('jekyll-rebuild', ['build-posts', 'jekyll-build'], _ => {
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
    '_post_drafts/*',
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
