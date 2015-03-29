var fs         = require( 'fs' ),
    gulp       = require( 'gulp' ),
    to5        = require( 'gulp-babel' ),
    prefixer   = require( 'gulp-autoprefixer' ),
    concat     = require( 'gulp-concat' ),
    data       = require( 'gulp-data' ),
    inject     = require( 'gulp-inject' ),
    jade       = require( 'gulp-jade' ),
    juice      = require( 'gulp-juice' ),
    livereload = require( 'gulp-livereload' ),
    markdown   = require( 'gulp-markdown' ),
    minifyCSS  = require( 'gulp-minify-css' ),
    rename     = require( 'gulp-rename' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    stylus     = require( 'gulp-stylus' ),
    uglify     = require( 'gulp-uglify' ),
    dateExtend = require( 'date-extended' ),
    bower      = require( 'main-bower-files' ),

    date   = new Date,// need manual edit
    mdName = dateExtend.format( date, 'yyyy-MM-dd' ),

    paths = {
        src: {
            lib: 'assets/lib/',
            jslib: 'assets/lib/*.js',
            scripts: 'assets/js/*.js',
            styles : [ 'assets/lib/*.styl', 'assets/styles/*.styl' ],
            markdown: 'contents/source/' + mdName + '.md'
        },

        indeterminate: {
            markdown: 'contents/indeterminate/'
        },

        build: {
            lib: 'build/lib/',
            scripts: 'build/js/',
            styles : 'build/css/',
            email: 'contents/email/'
        }
    }

gulp.task( 'lib', function() {
    gulp.src( paths.src.jslib )
        .pipe( concat( 'index.js' ) )
        .pipe( gulp.dest( paths.build.lib ) )
})

gulp.task( 'scripts', function() {
    gulp.src( paths.src.scripts )
        .pipe( to5() )
        .pipe( concat( 'index.js' ) )
        .pipe( gulp.dest( paths.build.scripts ) )
        .pipe( livereload() )
})

gulp.task( 'stylus', function() {
    gulp.src( paths.src.styles )
        .pipe( stylus() )
        .pipe( gulp.dest( paths.build.styles ) )
        .pipe( livereload() )
})

gulp.task( 'inject', function() {
    var destName = global.DEBUG ? 'index' : 'index.' + 'min'

    gulp.src( 'index.src.html' )
        .pipe( rename( 'index.html' ) )
        .pipe( inject( gulp.src(
            paths.build.styles + destName + '.css', { read: false }),
            { addRootSlash: false }))
        .pipe( inject(
            gulp.src( [
                paths.build.lib + destName + '.js',
                paths.build.scripts + destName + '.js'
            ], { read: false }), { addRootSlash: false }))
        .pipe( gulp.dest( '.' ) )
})

gulp.task( 'watch', function() {
    global.DEBUG = true

    livereload.listen()
    gulp.watch( paths.src.scripts, [ 'scripts' ] )
    gulp.watch( paths.src.styles, [ 'stylus' ] )
    gulp.watch( 'index.html', [ 'default' ] )
})

gulp.task( 'minJS', function() {
    var libDestPath     = paths.build.lib,
        scriptsDestPath = paths.build.scripts

    global.DEBUG = false

    gulp.src( libDestPath + '*.js' )
        .pipe( rename( 'index.min.js' ) )
        .pipe( sourcemaps.init() )
        .pipe( uglify() )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( libDestPath ) )

    gulp.src( scriptsDestPath + '*.js' )
        .pipe( rename( 'index.min.js' ) )
        .pipe( sourcemaps.init() )
        .pipe( uglify() )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( scriptsDestPath ) )
})

gulp.task( 'minCSS', [ 'inject' ], function() {
    var stylsDestPath = paths.build.styles

    global.DEBUG = false

    gulp.src( stylsDestPath + 'index.css' )
        .pipe( rename( 'index.min.css' ) )
        .pipe( prefixer( {
            browsers: [ '> 5%', 'ios 7' ]
        } ))
        .pipe( sourcemaps.init() )
        .pipe( minifyCSS() )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( stylsDestPath ) )
})

gulp.task( 'convert', function() {
    return gulp.src( paths.src.markdown )
        .pipe( markdown() )
        .pipe( gulp.dest( paths.indeterminate.markdown ) )
})

gulp.task( 'email', [ 'convert' ], function() {
    var mdFile = mdName + '.html'

    return gulp.src( 'assets/tmpl/email.jade' )
        .pipe( data(function() {
            return {
                pageTitle: 'Web Weekly',
                date: mdName,
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

gulp.task( 'bower', function() {
    gulp.src( bower() )
        .pipe( gulp.dest( paths.src.lib ) )
})

gulp.task( 'min', [ 'lib', 'minJS', 'minCSS', 'inject' ])

gulp.task( 'default', [ 'watch', 'scripts', 'stylus', 'inject' ] )
