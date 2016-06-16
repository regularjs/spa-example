
module.exports = {

  GLOBAL_DATA: '__GLOBAL_DATA__',
  
  LIMIT: 20,

  PANES:  [
    {
      title:'首页',
      menus: [
        {
          title:'首页',
          icon: 'home',
          url: '/',
          test: /\/|/
        }
      ]
    },
    {
      title: '平台', 
      menus: [
        {
          title:'博客',
          icon: 'book',
          url: '/blog',
          test: /\/blog/
        },
        {
          title:'聊天室',
          icon: 'comment',
          url: '/chat',
          test: /\/chat/
        }
      ]
    }
  ]

}