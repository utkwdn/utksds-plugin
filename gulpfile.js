// Load plugins
var gulp      = require('gulp');


// Create a distribution version
// ===============================================================

// copy the dist directoy
gulp.task('distdist', function () {
      return gulp.src('dist/**')
      .pipe( gulp.dest('packaged/utksds-plugin/dist') );
});
// copy the plugin-update-checker directoy
gulp.task('distchecker', function () {
      return gulp.src('plugin-update-checker/**')
      .pipe( gulp.dest('packaged/utksds-plugin/plugin-update-checker') );
});
// copy the readme
gulp.task('distread', function () {
      return gulp.src('README.txt')
      .pipe( gulp.dest('packaged/utksds-plugin') );
});
// copy the plugin.php
gulp.task('distplugin', function () {
      return gulp.src('plugin.php')
      .pipe( gulp.dest('packaged/utksds-plugin') );
});



gulp.task('package', gulp.series('distdist','distchecker', 'distread', 'distplugin'));
