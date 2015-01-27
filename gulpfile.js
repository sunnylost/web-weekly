var fs         = require( 'fs' ),
    gulp       = require( 'gulp' ),
    to5        = require( 'gulp-6to5' ),
    concat     = require( 'gulp-concat' ),
    data       = require( 'gulp-data' ),
    jade       = require( 'gulp-jade' ),
    juice      = require( 'gulp-juice' ),
    livereload = require( 'gulp-livereload' ),
    markdown   = require( 'gulp-markdown' ),
    rename     = require( 'gulp-rename' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    stylus     = require( 'gulp-stylus' ),
    dateExtend = require( 'date-extended' ),

    date   = new Date( 2015, 0, 25 ),// need manual edit
    mdName = dateExtend.format( date, 'yyyy-MM-dd' ),

    paths = {
        src: {
            scripts: 'assets/js/*.js',
            styles : 'assets/styles/*.styl',
            markdown: 'contents/source/' + mdName + '.md'
        },

        indeterminate: {
            markdown: 'contents/indeterminate/'
        },

        build: {
            scripts: 'build/js/',
            styles : 'build/css/',
            email: 'contents/email/'
        }
    }

gulp.task( 'scripts', function() {
    gulp.src( paths.src.scripts )
        .pipe( sourcemaps.init() )
        .pipe( to5() )
        .pipe( concat( 'index.js' ) )
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

gulp.task( 'convert', function() {
    gulp.src( paths.src.markdown )
        .pipe( markdown() )
        .pipe( gulp.dest( paths.indeterminate.markdown ) )
})

gulp.task( 'email', function() {
    var mdFile = mdName + '.html'

    gulp.src( 'assets/tmpl/email.jade' )
        .pipe( data(function() {
            return {
                pageTitle: 'Web Weekly',
                content: String( fs.readFileSync( paths.indeterminate.markdown + mdFile ))
            }
        }))
        .pipe( rename( mdFile ) )
        .pipe( jade({
            pretty: true
        }) )
        .pipe( juice() )
        .pipe( gulp.dest( paths.build.email ) )
})

gulp.task( 'default', [ 'watch', 'scripts', 'stylus' ] )
