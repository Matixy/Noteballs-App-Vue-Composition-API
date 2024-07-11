<template>
<nav
    ref="navbarRef"
    class="navbar navbar-expand-lg bg-info px-2 py-0"
  >
    <div class="container-xl px-0">
      <div class="d-inline-flex my-2">
        <h2 class="m-0 text-white font-monospace me-5">Noteballs</h2>
        <button
          v-if="storeAuth.user.id"
          @click="logout"
          :class="{'d-none' : mobileNav}"
          class="btn btn-outline-light"
          type="button"
        >Log out  {{ storeAuth.user.email }}</button>
      </div>
      <button
        @click="showMobileNav = !showMobileNav"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        ref="navbarBurgerRef"
        aria-label="Toggle navigation"
      >
        <span
          class="navbar-toggler-icon"
        ></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarNav"
        ref="mobileNavbarRef"
        :class="{ show: showMobileNav }"
      >
        <ul class="navbar-nav bg-info">
          <li
            class="nav-item "
            :class="{'d-none' : !showMobileNav}"
          >
            <button
              v-if="storeAuth.user.id"
              @click="logout"
              class="btn btn-outline-light mx-2"
              type="button"
            >Log out {{ storeAuth.user.email }}</button>
          </li>
          <li class="nav-item">
            <a class="nav-link px-2">
              <router-link
                class="nav-link text-white"
                to="/"
                active-class="active"
                >Notes
              </router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link px-2">
              <router-link
                class="nav-link text-white"
                to="/stats"
                active-class="active"
                >Stats
              </router-link>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
// 
// imports
// 

  import { ref, inject, onMounted, onBeforeUnmount } from "vue";
  import { onClickOutside } from '@vueuse/core'
  // auth store
  import { useStoreAuth } from '@/stores/storeAuth';

// 
// store
// 

  const storeAuth = useStoreAuth()

// 
// showMobileNav
// 

  const showMobileNav = inject('showMobileNav')

// 
// click outside to close 
// 

  const mobileNavbarRef = ref(null)
  const navbarBurgerRef = ref(null)

  onClickOutside(mobileNavbarRef, () => showMobileNav.value = false, {
    ignore: [navbarBurgerRef]
  })

// 
// logout function
// 

  const logout = () => {
    showMobileNav.value = false
    storeAuth.logoutUser()
  }


// 
// lougout mobile
// 

  const mobileNav = ref(null)

  const resizePage = () => window.innerWidth < 992 ? mobileNav.value = true : mobileNav.value = false



// 
// lifecycle hooks
// 

 onMounted(() => {
  resizePage()
  window.addEventListener('resize', resizePage);
 })

 onBeforeUnmount(() => {
  window.removeEventListener('resize', resizePage);
 })

</script>

<style scoped>

.navbar-toggler{
    border: none;
}
li:has(> a >.active){
    background-color: #2b303550;
}
@media (max-width: 991.98px) {
  .navbar-toggler:focus {
    box-shadow: none;
  }
  .navbar-nav {
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 1;
  }
}
</style>
