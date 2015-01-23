var gulp       = require( 'gulp' ),
    to5        = require( 'gulp-6to5' ),
    concat     = require( 'gulp-concat' ),
    stylus     = require( 'gulp-stylus' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    livereload = require( 'gulp-livereload' ),

    paths = {
        src: {
            scripts: 'assets/js/*.js',
            styles : 'assets/styles/*.styl'
        },

        build: {
            scripts: 'build/js/',
            styles : 'build/css/'
        }
    }

gulp.task( 'scripts', function() {
    gulp.src( paths.src.scripts )
        .pipe( sourcemaps.init() )
        .pipe( to5() )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( paths.build.scripts ) )
        .pipe( livereload() )
})


gulp.task( 'stylus', function() {
    gulp.src( paths.src.styles )
        .pipe( sourcemaps.init() )
        .pipe( stylus() )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( paths.build.styles ) )
        .pipe( livereload() )
})

gulp.task( 'watch', function() {
    livereload.listen()
    gulp.watch( paths.src.scripts, [ 'scripts' ] )
    gulp.watch( paths.src.styles, [ 'stylus' ] )
    gulp.watch( 'index.html', [ 'default' ] )
})

gulp.task( 'default', [ 'watch', 'scripts', 'stylus' ] )
