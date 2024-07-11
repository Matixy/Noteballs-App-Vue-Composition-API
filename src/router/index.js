import { createRouter, createWebHashHistory } from 'vue-router'

// authStore
import { useStoreAuth } from '@/stores/storeAuth'

// components
import ViewNotes from '@/views/ViewNotes.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import ViewAuth from '@/views/ViewAuth.vue'

const routes = [
    {
        path: '/',
        name: 'notes',
        component: ViewNotes
    },
    {
        path: '/stats',
        name: 'stats',
        component: ViewStats
    },
    {
        path: '/editNote/:id',
        name: 'edit-note',
        component: ViewEditNote
    },
    {
        path: '/auth',
        name: 'auth',
        component: ViewAuth
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

// navigation guards
router.beforeEach(async (to, from) => {
    const storeAuth = useStoreAuth()

    if (!storeAuth.user.id && to.name !== 'auth' ) {
        return { name: 'auth'}
    }

    if (storeAuth.user.id && to.name === 'auth') {
        return false
    }
  })

export default router