import { createRouter, createWebHistory } from 'vue-router';

import Etape1 from '@/pages/page1.vue';
import Etape2 from '@/pages/page2.vue';
import Etape3NonPro from '@/pages/Page3/nonProfessionnel.vue';
import Etape3Pro from '@/pages/Page3/Professionnel.vue';
import Etape4 from '@/pages/page4.vue';
import Etape5 from '@/pages/page5.vue';
import Etape6 from '@/pages/page6.vue';
import Etape7 from '@/pages/page7.vue';
import Etape8 from '@/pages/page8.vue';
import Etape9 from '@/pages/page9.vue';
import Etape6fin from '@/pages/page6fin.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/page1' },
    { path: '/page1', component: Etape1 },
    { path: '/page2', component: Etape2 },
    { path: '/page3', component: Etape3NonPro },
    { path: '/page3pro', component: Etape3Pro },
    { path: '/page4', component: Etape4 },
    { path: '/page5', component: Etape5 },
    { path: '/page6', component: Etape6 },
    { path: '/page7', component: Etape7 },
    { path: '/page8', component: Etape8 },
    { path: '/page9', component: Etape9 },
    { path: '/page6fin', component: Etape6fin },
  ],
});

export default router;

