// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

 /** @type {import('@docusaurus/types').Config} */
const config = {
   title: 'Learn To HomeLab',
  // tagline: 'Information Technology Teaching and Reviews',
  favicon: 'img/favicon.ico',

  // Future flags
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Production URL and base URL
  url: 'http://learntohomelab.com',
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'LearnToHomeLab', // Usually GitHub org/user name.
  projectName: 'LearnToHomeLabDocumentation', // Usually repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Internationalization
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // editUrl removed to disable "Edit this page"
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // editUrl removed to disable "Edit this page"
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Learn To HomeLab',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorials',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/LearnToHomeLab',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorials',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/@learntohomelab',
              },
              {
                label: 'Discord',
                href: 'https://discord.com/invite/6MsHSJWZpH',
              },
              {
                label: 'Patreon',
                href: 'https://www.patreon.com/c/learntohomelab',
              },
              {
                label: 'Reddit',
                href: 'https://www.reddit.com/r/learntohomelab/',
              },
              {
                label: 'Rumble',
                href: 'https://rumble.com/c/c-7585051',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/LearnToHomeLab',
              },
              {
                label: 'The Data Center Project',
                href: 'https://thedatacenterproject.com/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Property of Learn To HomeLab`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
      },
    ],
  ],
};

export default config;