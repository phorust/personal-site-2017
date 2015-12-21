var gulp             = require('gulp');
var browserSync      = require('browser-sync').create();
var sass             = require('gulp-sass');
// webpack requires - webpack and gulp aren't used
var webpack          = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig    = require("./webpack.config.js");
var gutil            = require("gulp-util");

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

// webpack, which is unused
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

gulp.task("build-dev", ["webpack:build-dev"], _ => {
	gulp.watch(["src/**/*", "css/**/*"], ["webpack:build-dev"]);
});

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", callback => {
	devCompiler.run((err, stats) => {
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));
		callback();
	});
});
