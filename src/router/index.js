import Vue from "vue";
import VueRouter from "vue-router";

import SearchPage from "@/pages/SearchPage";
import WatchListPage from "@/pages/WatchListPage";
import WatchHistoryPage from "@/pages/WatchHistoryPage";
import DetailsPage from "@/pages/DetailsPage";
import AccountPage from "@/pages/AccountPage";

// gives us the <router-view>, <router-links>, etc
Vue.use(VueRouter);

// map url to components
let routes = [
    {path: '/', component: AccountPage},
    {path: '/account', name: 'accountPage', component: AccountPage},
    {path: '/search', name: 'search', component: SearchPage},
    {path: '/details/:media_type/:id/:vote_average', name: 'details', component: DetailsPage, props: true},
    {path: '/watch-list', component: WatchListPage},
    {path: '/watch-history', component: WatchHistoryPage},
];

// create/configure the router
let router = new VueRouter({
    routes // same as saying routes: routes
});

export default router;