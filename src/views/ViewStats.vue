<template>
  <div class="stats">
    <table class="table table-light table-striped">
      <thead>
        <tr>
          <th scope="col">Stat</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"> Number of Notes </th>
          <td> {{ numberOfNotes }} </td>
        </tr>
        <tr>
          <th scope="row">Number of Characters (of all notes)</th>
          <td> {{ numberOfCharactes }} </td>
        </tr>
      </tbody>
    </table>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Do you love noteballs?</span>
      <input
        v-model="feedbackInput"
        v-autofocus
        maxlength="50"
        aria-describedby="basic-addon1"
        aria-label="Feedback"
        class="form-control"
        placeholder="Give a feedback!!!"
        type="text"
      >
    </div>
  </div>
</template>

<script setup>

// 
// import
// 

  import { ref } from "vue";
  // directives
  import { vAutofocus} from '@/directives/vAutofocus'
  // store
  import { useStoreNotes } from '@/stores/storeNotes'
  // composables
  import { useWatchCharacters } from '@/use/useWatchCharacters'

// 
// store
// 

  const storeNotes = useStoreNotes()

// 
// feedback input
// 

  const feedbackInput = ref('')

// 
// stats
//
  const numberOfNotes = ref('')
  numberOfNotes.value = storeNotes.totalNotesCount

  const numberOfCharactes = ref('')
  numberOfCharactes.value = storeNotes.totalCharactesCount

// 
// watches
// 

  useWatchCharacters(feedbackInput, 50)

</script>