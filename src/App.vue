<template>
  <NavBar>
  </NavBar>

  <div class="container-xl px-2 mt-4">
    <router-view> </router-view>
  </div>

  <div class="toast-container-sm p-2 fixed-top d-flex flex-column align-items-end">
    <Alert
      v-if="showAlertNoteLength"
      bgColor="danger"
      textColor="danger"
      :content = "`Only ${maxCharsInAlertContent} characters is allowed!`"
      :createTime = "alertCreationTime"
      @hideAlert = "showAlertNoteLength = false"
    />
  </div>
</template>

<script setup>
//
// import
//
  import { ref, provide, watch, onMounted } from "vue";
  import { useRoute } from "vue-router";
  // components
  import NavBar from "@/components/layout/navbar.vue";
  import Alert from "@/components/layout/Alert.vue"
  // store
  import { useStoreAuth } from "./stores/storeAuth";

// 
// route
// 

  const route = useRoute()

// 
// store
// 

  const storeAuth = useStoreAuth()

// 
// showMobileNav
// 

  const showMobileNav = ref(false)
  provide('showMobileNav', showMobileNav)

// 
// alert note is over 100 chars
// 

  const showAlertNoteLength = ref(false)
  const alertCreationTime = ref(new Date)
  const maxCharsInAlertContent = ref(100)

  provide('showAlertNoteLength', showAlertNoteLength)
  provide('alertCreationTime', alertCreationTime)
  provide('maxCharsInAlertContent', maxCharsInAlertContent)

// 
// watches
// 

  watch(() => route.fullPath, () =>  {
    showAlertNoteLength.value = false
    showMobileNav.value = false
  })

// 
// mounted
// 

  onMounted(()=> {
    storeAuth.init()
  })

</script>

<style>
@import "bootstrap/dist/css/bootstrap.css";

a {
  text-decoration: none;
}

.card,
table {
  box-shadow: 0px 1px 6px #2b303550;
}
</style>
