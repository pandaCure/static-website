module.exports = {
  title: '钟繇',
  description: 'JavaScript知识点',
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#3eaf7c'
      }
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/icons/msapplication-icon-144x144.png'
      }
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ], // 配置.ico,
  configureWebpack: {}, // webpack配置
  themeConfig: {
    sidebar: {
      '/topics/': [
        {
          title: '知识点',
          collapsable: false,
          children: ['']
        }
      ],
      '/just-javascript/': [
        {
          title: 'Just Javascript',
          collapsable: false,
          children: ['1']
        }
      ],
      '/interview/': [
        {
          title: '面试题',
          collapsable: false,
          children: ['1', '2', '3', '4']
        }
      ],
      '/origin/': [
        {
          title: 'dva源码',
          collapsable: false,
          children: ['dva-1']
        },
        {
          title: 'react源码',
          collapsable: false,
          children: ['react-1']
        }
      ],
      '/': [
        {
          title: '主页',
          collapsable: false,
          children: ['', 'oop', 'bnf']
        }
      ]
    }, // 侧边栏
    nav: [
      { text: '主页', link: '/' },
      { text: '知识点', link: '/topics/' },
      { text: 'Just Javascript对照翻译', link: '/just-javascript/' },
      { text: '面试题', link: '/interview/' },
      { text: '源码系列', link: '/origin/' }
    ] // 导航
  },
  base: '/static-website/'
}
