<template>
  <div class="notes">
    <AddEditNote
      placeholder="Add a new note"
      v-model="newNote"
      ref="addEditNoteRef"
      charactersCountColor="body-tertiary"
    >
      <template #buttons>
        <button
          class="btn btn-outline-light"
          type="button"
          :disabled="newNote == ''"
          @click="addNoteClick"
        >
          Add New Note
        </button>
      </template>
    </AddEditNote>

    <div
      v-if="!storeNotes.notesLoaded"
      class="container-sm text-center notes-spinner"
    >
      <div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <template
      v-else
    >
      <Notes
      v-for="note in storeNotes.notes"
      :key="note.id"
      :note = "note"
    >

      </Notes>

      <div
        v-if="storeNotes.notes.length === 0"
        class="container-sm text-center"
      >
        <h3><small class="text-body-secondary font-monospace"> No notes here yet... </small></h3>
      </div>
    </template>

  </div>
</template>

<script setup>
//
// import
//

  import { ref } from "vue";

  // components
  import Notes from "@/components/Notes/Note.vue";
  import AddEditNote from "@/components/Notes/AddEditNote.vue";

  // store
  import { useStoreNotes } from "@/stores/storeNotes"

  // composable
  import { useWatchCharacters } from '@/use/useWatchCharacters'

// 
// store
// 

  const storeNotes = useStoreNotes()

//
// notes
//

  const newNote = ref('');
  const addEditNoteRef = ref(null);

  const addNoteClick = () => {
    storeNotes.addNote(newNote.value)
    newNote.value = '';
    addEditNoteRef.value.focusTextArea();
  };

  // watch characters
  useWatchCharacters(newNote, 100)

</script>

<style>

</style>
