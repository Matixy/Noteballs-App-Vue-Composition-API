<template>
  <div
    class="card text-center mb-4"
  >
    <div class="card-body text-start card-text">
      <p>
        {{ note.content }}
      </p>
      <div class="d-flex justify-content-between">
        <p class="card-text mx-1"><small class="text-body-secondary"> {{ dateFormated }} </small></p>
        <p class="card-text mx-1"><small class="text-body-secondary"> {{ characterLength }} </small></p>
      </div>
    </div>
    <div class="card-footer text-body-secondary">
      <div class="container text-center">
        <div class="row align-items-start">
          <div class="col">
            <a
              class="text-primary"
              @click.prevent="goToEditPage(note.id)"
              href=""
            >
              Edit
            </a>
          </div>
          <div class="col">
            <a
              @click.prevent = "modals.deleteNote = true"
              class="text-danger"
              href=""
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    </div>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId = "note.id"
    >
    </ModalDeleteNote>
  </div>
</template>

<script setup>

// 
// import
// 

  import { computed, reactive } from 'vue';
  import { useRouter } from 'vue-router'
  // composables
  import { useDateFormat } from '@vueuse/core';
  // components
  import ModalDeleteNote from '@/components/notes/ModalDeleteNote.vue';

// 
// router
// 

  const router = useRouter()

// 
// props
// 

  const props = defineProps({
      note: {
          type: Object,
          required: true
      }
  })

// 
// date formated
// 

  const dateFormated = computed(() => {
    let date = new Date(parseInt(props.note.date))
    let formatedDate = useDateFormat(date, 'YYYY-MM-DD @ HH:mm', { locales: 'en-US' })
    return formatedDate.value
  })

// 
// character length
// 

  const characterLength = computed(() => props.note.content.length === 1 ? `${ props.note.content.length} character` : `${props.note.content.length} characters`)

// 
// router to edit page
// 

  const goToEditPage = (noteId) => {
    router.push({
      name: 'edit-note',
      params: {
        id: noteId
      }
    })
  }

// 
// modals
// 

  const modals = reactive({
    deleteNote: false
  })

</script>

<style>
@import "bootstrap/dist/css/bootstrap.css";

</style>
