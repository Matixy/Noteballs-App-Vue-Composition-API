<template>
  <div
    class="toast show"
  >
  <div  
      :class="`bg-${bgColor}`"
      class="toast-header"
    >
      <strong class="me-auto text-dark">Alert</strong>
      <small class="text-body">{{ alertTime }}</small>
      <button
        @click="$emit('hideAlert')"
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div
      class="toast-body"
      :class="`text-${textColor}`"
    >{{ content }}</div>
  </div>
</template>

<script setup>
//
// import
//

  import { ref, onMounted, onBeforeUnmount } from "vue";

//
// props
//
  const props = defineProps({
    createTime: {
      type: Date,
      default: new Date
    },
    bgColor: {
      type: String,
      default: 'body-secondary'
    },
    textColor: {
      type: String,
    },
    content: {
      type: String,
      required: true
    }
  });

// 
// emit
// 

  const emit = defineEmits(['hideAlert'])


// 
// getTime
// 

  const alertTime = ref(false)

  const getTimeBetween = (createTime) => {
    let curentTime = new Date
    let timeBetween = new Date(curentTime - createTime).getMinutes()

    timeBetween <= 1 ? timeBetween = 'just now' : timeBetween = `${timeBetween} mins ago`

    return timeBetween
  }

// 
// watches
// 

  let intervalId

  onMounted(() => {
    alertTime.value = getTimeBetween(props.createTime)
    intervalId = setInterval(() => alertTime.value = getTimeBetween(props.createTime), 60000)
  })
  onBeforeUnmount(() => {
    clearInterval(intervalId)
  })

</script>

<style scoped>

  .btn-close:focus, .btn-close:hover, .btn-close:active {
    box-shadow: none;
  }

  @media (max-width: 991.98px) {
    .btn-close:focus, .btn-close:hover, .btn-close:active {
      box-shadow: none;
    }
  }

</style>