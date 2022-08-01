import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import MyLogin from "../views/MyLogin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/",
    name: "MyLogin",
    component: MyLogin,
  },
];

const router = new VueRouter({
  routes,
});
//权限管理
router.beforeEach(function (to, from, next) {
  // 如果打开界面跳转的是My就让他跳转
  if (to.name == "MyLogin") {
    next()
  } else {
    // 如果没有token的话就跳转到MyLogin 
    // 有token直接跳转
    let token = localStorage.getItem("token")
    if (!token) next({
      name: "MyLogin"
    })
    if (token) {
      next()
    }
  }
})
export default router;
