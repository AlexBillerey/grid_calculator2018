module.exports = function (grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            files: ['dev/css/*.css', 'dev/**/*.html', 'dev/js/**/*.js'],
            tasks: ['concat', 'purifycss', 'postcss', 'cssmin','modernizr','processhtml']
        },
        concat: {
            css: {
                src: ['dev/css/normalize.css', /*'dev/css/main.css'*/ 'dev/css/style.css'],
                dest: 'dev/css/production.css'
            }/*,
            js: {
                src: [/!*'js/libs/jquery-1.7.1.min.js',*!/ 'js/plugins.js','js/script.js'],
                dest: 'prod/js/production.js'
            },*/
        },
        purifycss: {
            options: {},
            target: {
                src: ['dev/**/*.html', 'dev/js/main.js'],
                //css: ['dev/css/normalize.css','dev/css/main.css'],
                css: ['dev/css/production.css'],
                dest: 'dev/css/production_pure.css'
            }
        },


        postcss: {
            options: {
                map: {
                    inline: false // save all sourcemaps as separate files...
                    //annotation: 'dist/css/maps/' // ...to the specified directory
                }
            },


            options: {
                /*map: {
                    inline: false // save all sourcemaps as separate files...
                    //annotation: 'dist/css/maps/' // ...to the specified directory
                },*/
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 30 versions']
                    }),
                    require('postcss-merge-rules')()
                ]
            },
            dist: {
                src: 'dev/css/production_pure.css',
                dest: 'dev/css/production_pure_pf.css'
            }

        },


        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'prod/css/styles.min.css': ['dev/css/production_pure_pf.css']
                }
            }
        },
        modernizr: {
            dist: {
                "parseFiles": true,
                "customTests": [],
                "devFile": "dev/js/libs/modernizr-2.5.3.min.js",
                /* "devFile": "/dev/js/libs/modernizr-2.5.3.min.js",C:\Users\alex_\Documents\grid_caculator\dev\js\libs\modernizr-2.5.3.min.js dev/js/libs/modernizr-2.5.3.min.js */
                "dest": "prod/js/libs/modernizr-lean.js",
                "tests": [
                    // Tests
                ],
                "options": [
                    "setClasses"
                ],
                "uglify": true
            }
        },
        processhtml: {
            options: {
                strip: true
            },
            dist: {
                files: {
                    'prod/index.html': ['dev/index.html']
                }
            }
        },

        browserSync: {
            bsFiles: {
                src: ['prod/**/*.css', 'prod/**/*.html', 'prod/**/*.js']
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: ["prod"]
                },
                browser: ["chrome", "firefox"/*, "opera", "iexplore", "ms edge"*/]
            }
        }
        /*




         copy: {
         main: {
         expand: true,
         cwd: 'src',
         src: ["prod/img/!*.*", "prod/js/!**!/!*.js"],
         dest: 'prod/'
         }
         },

         cssmin: {
         options: {
         shorthandCompacting: false,
         roundingPrecision: -1
         },
         target: {
         files: {
         'dest/css/cleaned.min.css': ['prod/css/cleaned.css']
         }
         }
         },
         uncss: {
         dist: {
         options: {
         ignore: ['.hero_container section.openHero', '.no-touch']
         },
         files: {
         'prod/css/cleaned.css': ['prod/index.html']
         }
         }
         },
         processhtml: {
         dist: {
         files: {
         'dest/index.html': ['prod/index.html']
         }
         }
         },*/


    });

    // 3. Where we tell Grunt we plan to use this plug-in.

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-purifycss');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-modernizr");

    /* See http://blog.ponyfoo.com/2013/11/13/grunt-tips-and-tricks */

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    //grunt.registerTask('default', ['concat','purifycss', 'postcss']);
    grunt.registerTask('default', ['browserSync', 'watch']);
};