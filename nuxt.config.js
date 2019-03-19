import pkg from './package';
import axios from 'axios';

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: "Melissa's Blog",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Finacial Tips' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Lato:400,700"'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      'storyblok-nuxt',
      {
        accessToken:
          process.env.Node_ENV == 'production'
            ? 'XOGiaQ51bFWh42bsIBX7iQtt'
            : '535eKppMa800anEHcJYuaAtt',
        cacheProvider: 'memory'
      }
    ]
  ],

  generate: {
    routes: function() {
      return axios
        .get(
          'https://api.storyblok.com/v1/cdn/stories?&version=published&token=XOGiaQ51bFWh42bsIBX7iQtt&starts_with=blog&cv=' +
            Math.floor(Date.now() / 1e3)
        )
        .then(res => {
          const blogPosts = res.data.stories.map(bp => bp.full_slug);
          return ['/', '/blog', '/about', ...blogPosts];
        });
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
