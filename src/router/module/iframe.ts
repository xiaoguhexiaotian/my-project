const IFrame = () => import('/@/components/iframeComp/index.vue')

const iframeDemo = () => import('/@/views/iframeDemo/index.vue')

const ifarme = [
  {
    path: '/iframe',
    name: 'iFrame',
    redirect: '/frame/docs',
    component: null,
    meta: {
      title: '外部页面',
      icon: 'chen-naika',
      sort: 4
    },
    pid: '-1',
    id: 'iframe'
  },
  {
    path: '/iframeDemo',
    name: 'iframeDemo',
    meta: {
      title: 'iframe通信方法',
      icon: 'chen-naika',
      isIframe: true,
      frameSrc: 'https://www.naiveadmin.com'
    },
    component: iframeDemo,
    pid: 'iframe',
    id: 'iframeDemo'
  },
  {
    path: '/naive-admin',
    name: 'naive-admin',
    meta: {
      title: 'NaiveAdmin',
      icon: 'chen-naika',
      isIframe: true,
      frameSrc: 'https://www.naiveadmin.com'
    },
    component: IFrame,
    pid: 'iframe',
    id: 'naive-admin'
  },
  {
    path: '/docs',
    name: 'frame-docs',
    meta: {
      title: '项目文档(内嵌)',
      icon: 'chen-naika',
      isIframe: true,
      frameSrc: 'https://jekip.github.io/docs'
    },
    component: IFrame,
    pid: 'iframe',
    id: 'frame-docs'
  },
  {
    path: '/naive',
    name: 'frame-naive',
    meta: {
      title: 'NaiveUi(内嵌)',
      icon: 'chen-naika',
      isIframe: true,
      frameSrc: 'https://www.naiveui.com'
    },
    component: IFrame,
    pid: 'iframe',
    id: 'frame-naive'
  }
]

export default ifarme
