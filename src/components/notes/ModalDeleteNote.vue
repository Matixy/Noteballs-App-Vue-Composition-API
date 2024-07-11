<template>
  <div
    class="modal fade show"
    style="display: block;"
    tabindex="-1"
  >
    <div
      ref="modalRef"
      class="modal-dialog modal-dialog-centered"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Note?</h5>
          <button
            @click="closeModal"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this note?</p>
        </div>
        <div class="modal-footer">
          <button
            @click="closeModal"
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            @click="storeNotes.deleteNote(noteId)"
            class="btn btn-outline-danger"
            type="button"
          >Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup> 
// 
// import
// 

  import { ref, onMounted, onUnmounted } from 'vue';
  import { onClickOutside } from '@vueuse/core'
  // store
  import { useStoreNotes } from '@/stores/storeNotes';

// 
// props
// 

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    noteId: {
      type: String,
      required: true
    }
  })

// 
// emit
// 

  const emit = defineEmits(['update:modelValue'])

// 
// useStore
// 

  const storeNotes = useStoreNotes()

// 
// close modal
// 

  const closeModal = () => {
    emit('update:modelValue', false)
  }

// 
// click outside to close
// 

  const modalRef = ref(null)

  onClickOutside(modalRef, closeModal)


// 
// keybord control
// 

  const keyCheck = e => {
    if (e.key === "Escape") closeModal()
  }

  onMounted(() => {
    document.addEventListener('keyup', keyCheck)
  })

  onUnmounted(() => {
    document.removeEventListener('keyup', keyCheck)
  })

</script>


<style >
@import "bootstrap/dist/css/bootstrap.css";

</style>
