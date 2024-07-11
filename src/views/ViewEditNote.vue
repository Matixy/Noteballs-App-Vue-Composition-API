<template>
  <div class="edit-note">
    <AddEditNote
      bgColor="dark"
      placeholder="Edit a note"
      charactersCountColor="light-emphasis"
      subtitle="Edit a note"
      v-model="noteContent"
      ref="addEditNoteRef"
    >
      <template #buttons>
        <button
          @click="$router.back()"
          class="btn btn-outline-danger slot-buttons mx-1"
          type="button"
        >
          Cancel
        </button>

        <button
          @click="saveNote"
          class="btn btn-outline-light mx-1"
          :disabled="noteContent === ''"
          type="button"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
// 
// import
// 
  // components
  import AddEditNote from "@/components/Notes/AddEditNote.vue";

  import { ref } from "vue";
  import { useRoute, useRouter } from 'vue-router';

  // store
  import { useStoreNotes } from '@/stores/storeNotes'

  // composable
  import { useWatchCharacters } from '@/use/useWatchCharacters'

// 
// route & router
// 

  const route = useRoute()
  const router = useRouter()

// 
// storeNotes
// 

  const storeNotes = useStoreNotes()

// 
// note
// 

  const noteContent = ref('')

  noteContent.value = storeNotes.getNoteContent(route.params.id)

  const saveNote = () => {
    storeNotes.updateNote(route.params.id, noteContent.value)
    router.push('/')
  }

// 
// watches
// 

  useWatchCharacters(noteContent, 100)

</script>

