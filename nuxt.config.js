import colors from 'vuetify/es5/util/colors'
import verified from './middleware/verified';
// for now mdi are removed for better performance...check everywhere mdi close and see how to implement those icons
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'Dateswiper',
    title: 'Dateswiper',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
 loading: {
  color: 'white',
},
  /*
  ** Global CSS
  */
  css: [
    '@/assets/style/main.scss',
    '@/assets/style/media.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    { src: '~plugins/googleSignIn.js' , mode: 'client' },
    '~/plugins/vue-inject.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
 
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-purgecss',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-webfontloader',
    '@nuxtjs/pwa',
    ['nuxt-i18n', {
      lazy:true,
      locales: [
        // {
        //   name: 'Eesti',
        //   code: 'ee',
        //   iso: 'et-ET',
        //   file: 'et-ET.js'
        // },
        {
          name: 'English',
          code: 'en',
          iso: 'en-US',
          file: 'en-US.js'
        }, 
        // {
        //   name: 'Русский',
        //   code: 'ru',
        //   iso: 'ru-RU',
        //   file: 'ru-RU.js'
        // },
      ],
      langDir: 'lang/',
      defaultLocale: 'en',
    }]
  ],
  purgeCSS: {
    mode: 'postcss',
    paths: [
      'node_modules/vuetify/src/**/*.ts'
    ],
    whitelistPatternsChildren: [ /^col\-/ ]
  },
  // Axios
  axios: {
    prefix: '/api',
    proxy: true,
    proxyHeaders: true,
    proxyHeadersIgnore: ['host', 'accept', 'cf-ray', 'cf-connecting-ip', 'content-length'],
  }, 
  proxy: {
    '/api/': {
      target: 'https://api.stage.dateswiper.com/v1',
      secure: false,
      pathRewrite: {
        '^/api/': ''
      }
    }
  },
  // Auth
  auth: {
    plugins: [ 
      { src: '~plugins/auth.js' , mode: 'client' },
      // { src: '@/plugins/auth-lang-redirect.js' , mode: 'client' },
      '~/plugins/i18n',
    ],
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'access_token' },
          user: { url: 'user/profile', method: 'get', propertyName: false },
          logout: false,
        }
      }
    }
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
 vuetify: {
  treeShake: true
},

pwa: {
  icon: {
    sizes: [48, 72, 96, 144, 192, 256, 384, 512]
  }
},
 render: {
  bundleRenderer: {
    shouldPreload: (file, type) => {
    // type is inferred based on the file extension.
    // https://fetch.spec.whatwg.org/#concept-request-destination
    if (type === 'script' || type === 'style') {
      return true
    }
    if(type === 'text/css') {
      // return /\.materialdesignicons.min$/.test(file)
      return true
    }
    if (type === 'font') {
      // only preload woff2 fonts
      return /\.woff2$/.test(file)
    }
    if (type === 'image') {
      // only preload important images
      return file === 'hero.jpg'
    }
  }
  }
},
  /*
  ** Build configuration
  */
 buildModules: [
  ['@nuxtjs/vuetify', {
    treeShake: true,
    defaultAssets: {
      icons: false
    }
  }]
  ],
  build: {
    analyze: true,
    optimization: {
      runtimeChunk: {
        name: 'manifest'
      }
    },
    plugins: [
      // new webpack.IgnorePlugin(/^\.\/interact$/, /pusher-js$/)
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, { isClient }) {
    }
  }
}
