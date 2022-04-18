const mix = require('laravel-mix');
require('laravel-mix-bundle-analyzer');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/ts/index.tsx', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        require('tailwindcss')
    ])
    .extract([
        'react',
        'three',
        'react-dom',
        '@react-three',
        '@react-three/fiber',
        '@react-three/drei',
        '@react-spring',
        'zustand',
        'valtio',
        'underscore',
        'pusher-js',
        'echo',
        '@headlessui'
    ])

if(!mix.inProduction()){
    mix.sourceMaps()
    //mix.bundleAnalyzer()
}
