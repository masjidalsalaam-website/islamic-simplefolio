const git = require('git-rev-sync');
require('dotenv').config();

const pack = require('./package.json');

module.exports = {
  siteMetadata: {
    title: pack.author,
    lang: 'en',
    description: pack.description,
    author: pack.author,
    siteUrl: pack.homepage,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    'gatsby-source-local-git',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `src/images`,
      },
    },
    {
      resolve: '@sentry/gatsby',
      options: {
        dsn: process.env.SENTRY_DSN,
        tags: { git_commit: git.short() },
        release: git.long(),
        environment: process.env.NODE_ENV,
        enabled: process.env.NODE_ENV === 'production',
      },
    },
    {
      resolve: `gatsby-plugin-segment-js`,
      options: {
        // your segment write key for your production environment
        // when process.env.NODE_ENV === 'production'
        // required; non-empty string
        prodKey: process.env.SEGMENT_PROD_KEY,

        // if you have a development env for your segment account, paste that key here
        // when process.env.NODE_ENV === 'development'
        // optional; non-empty string
        devKey: process.env.SEGMENT_DEV_KEY,

        // boolean (defaults to false) on whether you want
        // to include analytics.page() automatically
        // if false, see below on how to track pageviews manually
        trackPage: true,

        // boolean (defaults to false); whether to delay load Segment
        // ADVANCED FEATURE: only use if you leverage client-side routing (ie, Gatsby <Link>)
        // This feature will force Segment to load _after_ either a page routing change
        // or user scroll, whichever comes first. This delay time is controlled by
        // `delayLoadTime` setting. This feature is used to help improve your website's
        // TTI (for SEO, UX, etc).  See links below for more info.
        // NOTE: But if you are using server-side routing and enable this feature,
        // Segment will never load (because although client-side routing does not do
        // a full page refresh, server-side routing does, thereby preventing Segment
        // from ever loading).
        // See here for more context:
        // GIF: https://github.com/benjaminhoffman/gatsby-plugin-segment-js/pull/19#issuecomment-559569483
        // TTI: https://github.com/GoogleChrome/lighthouse/blob/master/docs/scoring.md#performance
        // Problem/solution: https://marketingexamples.com/seo/performance
        delayLoad: false,

        // number (default to 1000); time to wait after scroll or route change
        // To be used when `delayLoad` is set to `true`
        delayLoadTime: 1000,
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        // https://www.gatsbyjs.org/packages/gatsby-plugin-mailchimp/
        endpoint: process.env.MAILCHIMP_ENDPOINT, // should be something like https://dar-as-sahaba.a10.list-manage.com/subscribe/post?u=abcd&amp;id=1234
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    {
      resolve: `gatsby-plugin-chatwoot`,
      options: {
        baseUrl: 'https://app.chatwoot.com', // Required
        websiteToken: process.env.CHATWOOT_TOKEN, // Required
        includeInDevelopment: true, // Optional
        chatwootSettings: {}, // Optional
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: pack.description,
        short_name: pack.author,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#02aab0`,
        display: `standalone`,
        icon: 'src/images/favicon.png',
      },
    },
    `gatsby-plugin-preact`,
  ],
};
