import { createRouter, createWebHistory } from 'vue-router'
import '../../src/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css'
import'../../src/assets/vendor/line-awesome/dist/line-awesome/css/line-awesome.min.css'
import '../../src/assets/vendor/remixicon/fonts/remixicon.css'
const childRoutes = (prop, mode) => [
  {
    path: '',
    name: prop + '.list',
    meta: { auth: true, name: 'Social App' },
    // component: () => import('../views/Apps/Social/a')
    component: () => import('../views/Apps/Social/SocialApp')
  },
  // {
  //   path: 'test',
  //   name: prop + '.test',
  //   meta: { auth: true, name: 'Social Test' },
  //   component: () => import('../views/Apps/Social/Test.vue')
  // },
  {
    path: 'privacypolicy',
    name: prop + '.privacy',
    meta: { auth: true, name: 'Privacy Policy' },
    component: () => import('../views/Pages/PrivacyPolicy')
  },
  {
    path: 'termofservice',
    name: prop + '.termofservice',
    meta: { auth: true, name: 'Terms Of Use' },
    component: () => import('../views/Pages/TermsOfService')
  },
  {
    path: 'profilebadges',
    name: prop + '.profilebadges',
    meta: { auth: true, name: 'Profile Badges' },
    component: () => import('../views/SocailMain/Profile/ProfileBadges')
  },
  {
    path: 'notification',
    name: prop + '.notification',
    meta: { auth: true, name: 'Notification' },
    component: () => import('../views/SocailMain/Notifications/Notification')
  },
  {
    path: 'market1',
    name: prop + '.market1',
    meta: { auth: true, name: 'Market1' },
    component: () => import('../views/Market/market1')
  },
  {
    path: 'market2',
    name: prop + '.market2',
    meta: { auth: true, name: 'Market2' },
    component: () => import('../views/Market/market2')
  },
  {
    path: 'myprofile',
    name: prop + '.myprofile',
    meta: { auth: true, name: 'myprofile' },
    component: () => import('../views/Profile/myprofile')
  },
  {
    path: 'myarticles',
    name: prop + '.myarticles',
    meta: { auth: true, name: 'myarticles' },
    component: () => import('../views/Apps/Social/Components/MyArticles')
  },

  {
    path: 'profile2/:userId?',
    name: prop + '.profile2',
    props: true,
    meta: { auth: true, name: 'Profile2'},
    component: () => import('../views/Profile/profile2')
  },
  {
    path: 'financepage',
    name: prop + '.financepage',
    meta: { auth: true, name: 'Finance Page' },
    component: () => import('../views/SocailMain/Profile/FinancePage')
  },
  {
    path: 'sportspage',
    name: prop + '.sportspage',
    meta: { auth: true, name: 'Sports Page' },
    component: () => import('../views/SocailMain/Profile/SportsPage')
  }
]

const nologChildRoutes = (prop, mode = false) => [
  {
    path: 'a',
    name: prop + '.a',
    component: () => import('../views/Apps/Social/a')
  }
]
const pagesChildRoutes = (prop, mode = false) => [
  {
    path: 'error/:code',
    name: prop + '.error',
    component: () => import('../views/Pages/ErrorPage')
  },
  {
    path: 'error404',
    name: prop + '.error404',
    component: () => import('../views/Pages/Error404')
  },
  {
    path: 'error500',
    name: prop + '.error500',
    component: () => import('../views/Pages/Error500')
  },
  {
    path: 'coming-soon',
    name: prop + '.coming-soon',
    component: () => import('../views/Pages/ComingSoon')
  },
  {
    path: 'maintenance',
    name: prop + '.maintenance',
    component: () => import('../views/Pages/Maintenance')
  }
]
const blogchildRoutes = (prop, mode = false) => [
  {
    path: 'blog-detail',
    name: prop + '.blog-detail',
    meta: { auth: true, name: 'blog-detail' },
    component: () => import('../views/SocailMain/Blog/BlogDetail')
  },
  {
    path: 'verified-article',
    name: prop + '.verified-article',
    meta: { auth: true, name: 'Verified Article' },
    component: () => import('../views/SocailMain/Blog/VerifiedRrticle')
  },
  {
    path: 'blog-detail2',
    name: prop + '.blog-detail2',
    meta: { auth: true, name: 'blog-detail2' },
    component: () => import('../views/SocailMain/Blog/BlogDetail_no')
  },
  {
    path: 'blog-list',
    name: prop + '.blog-list',
    meta: { auth: true, name: 'blog-list' },
    component: () => import('../views/SocailMain/Blog/BlogList')
  }
]
const iconChildRoute = (prop, mode = false) => [
  {
    path: 'fontawesome-5',
    name: prop + '.fontawesome-5',
    meta: { auth: true, name: 'Font Awsome' },
    component: () => import('../views/Icons/IconFontawesome5')
  },
  {
    path: 'lineawesome',
    name: prop + '.lineawesome',
    meta: { auth: true, name: 'Line Awsome' },
    component: () => import('../views/Icons/IconLineAwesome')
  },
  {
    path: 'remixicon',
    name: prop + '.remixicon',
    meta: { auth: true, name: 'Remixicon' },
    component: () => import('../views/Icons/IconRemixicon')
  },
  {
    path: 'material',
    name: prop + '.material',
    meta: { auth: true, name: 'Material' },
    component: () => import('../views/Icons/IconMaterial')
  }
]
const blankchildRoutes = (prop, mode) => [
  {
    path: 'signin',
    name: prop + '.sign-in',
    component: () => import('../views/AuthPages/Default/SignIn')
  },
  {
    path: 'signup',
    name: prop + '.sign-up',
    component: () => import('../views/AuthPages/Default/SignUp')
  },
  {
    path: 'recoverpassword',
    name: prop + '.recoverpassword1',
    component: () => import('../views/AuthPages/Default/RecoverPassword1')
  },
  {
    path: 'lockscreen',
    name: prop + '.lockscreen1',
    component: () => import('../views/AuthPages/Default/LockScreen1')
  },
  {
    path: 'confirmmail',
    name: prop + '.confirmmail1',
    component: () => import('../views/AuthPages/Default/ConfirmMail1')
  }
]
const appChildRoute = (prop, mode = false) => [
  {
    path: 'composebody-remark',
    name: prop + '.composebody',
    meta: { auth: true, name: 'ComposeBody' },
    component: () => import('../views/Apps/Email/EmailCompose')
  },
  {
    path: 'smartContractPage', // 這裡是相對於 /app 的子路徑
    name: 'app.smartContractPage', // 父級路由名稱作為前綴
    meta: { auth: true, name: 'smartContractPage' },
    component: () => import('../views/Apps/Contract/smartContract')
  }
]
const defaultlayout = (prop, mode = false) => [
  {
    path: 'admin',
    name: prop + '.admin',
    meta: { auth: true, name: 'Admin' },
    component: () => import('../views/Pages/Admin')
  },
  {
    path: 'timelines',
    name: prop + '.timelines',
    meta: { auth: true, name: 'Timelines' },
    component: () => import('../views/Pages/TimeLines')
  },
  {
    path: 'invoice',
    name: prop + '.invoice',
    meta: { auth: true, name: 'Invoice' },
    component: () => import('../views/Pages/Invoice')
  },
  {
    path: 'blank-page',
    name: prop + '.blank-page',
    meta: { auth: true, name: 'Blank Page' },
    component: () => import('../views/Pages/BlankPage')
  },
  {
    path: 'pricing-1',
    name: prop + '.pricing-1',
    meta: { auth: true, name: 'Pricing 1' },
    component: () => import('../views/Pages/Pricing')
  },
  {
    path: 'pricing-2',
    name: prop + '.pricing-2',
    meta: { auth: true, name: 'Pricing 2' },
    component: () => import('../views/Pages/Pricing1')
  },
  {
    path: 'faq',
    name: prop + '.faq',
    meta: { auth: true, name: 'Faq' },
    component: () => import('../views/Pages/FAQ')
  }
]

const userChildRoute = (prop, mode = false) => [
  {
    path: 'profile-edit',
    name: prop + '.profile-edit',
    meta: { auth: true, name: 'Edit Profile' },
    component: () => import('../views/User/ProfileEdit')
  }
]

const verifyChildRoute = (prop, mode = false) => [
  {
    path: 'verify-article',
    name: prop + '.verify-article',
    meta: { auth: true, name: 'Verify Article' },
    component: () => import('../views/Verify/VerifyArticle')
  },
]
const routes = [
  {
    path: '/',
    name: 'social',
    component: () => import('../layouts/Default'),
    children: childRoutes('social')
  },
  {
    path: '/pages',
    name: 'pages',
    component: () => import('../layouts/Empty'),
    children: pagesChildRoutes('default')
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../layouts/Default'),
    children: blogchildRoutes('blog')
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../layouts/Empty'),
    children: blankchildRoutes('auth')
  },
  {
    path: '/icon',
    name: 'icon',
    component: () => import('../layouts/Default'),
    children: iconChildRoute('icon')
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('../layouts/Default'),
    meta: { auth: true },
    children: appChildRoute('app')
  },
  {
    path: '/extra-pages',
    name: 'extra-pages',
    component: () => import('../layouts/Default'),
    meta: { auth: true },
    children: defaultlayout('extra-pages')
  },
  {
    path: '/nolog',
    name: 'nolog',
    component: () => import('../layouts/Default2'),
    meta: { auth: true },
    children: nologChildRoutes('nolog')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../layouts/Default'),
    meta: { auth: true },
    children: userChildRoute('user')
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import('../layouts/Default'),
    meta: { auth: true },
    children: verifyChildRoute('verify')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes
})

export default router
