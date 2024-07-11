// stores/counter.js
import { defineStore, acceptHMRUpdate } from 'pinia'
import { 
  collection, onSnapshot, 
  doc, addDoc, deleteDoc, updateDoc, 
  query, orderBy 
} from 'firebase/firestore';

// authStore
import { useStoreAuth } from '@/stores/storeAuth';

// database
import { db } from '@/js/firebase'

let notesCollectionRef
let notesCollectionQuery

let getNotesSnapshot = null

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return { 
        notes: [],
        notesLoaded: false
    }
  },
  actions: {
    init () {
      const storeAuth = useStoreAuth()

      // initialize our database refs
      notesCollectionRef = collection(db, 'Users', storeAuth.user.id, 'notes')
      notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))
      this.getNotes()
    },
    async getNotes() {
      this.notesLoaded = false

      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          notes.push(this.createNote(doc.data().content, doc.data().date ,doc.id))
        })

        this.notes = notes
        this.notesLoaded = true
      }, error => {
        console.log(error.message);
      })
    },
    clearNotes () {
      this.notes = []
      if (getNotesSnapshot) getNotesSnapshot() // unsubscribe from any active listener
    },
    createNote (noteContent, noteDate = new Date().getTime().toString(), noteId = undefined) {
        let note = {
          id: noteId,
          date: noteDate,
          content: noteContent,
        };
        
        return note;
    },
    async addNote (noteContent) {
      let note = this.createNote(noteContent)

      await addDoc(notesCollectionRef, {
        date: note.date,
        content: note.content
      })
    },
    async deleteNote (idToDelete) {
        await deleteDoc(doc(notesCollectionRef, idToDelete))
    },
    async updateNote (idToUpdate, contentToUpdate) {
      await updateDoc(doc(notesCollectionRef, idToUpdate), {
        content: contentToUpdate
      });
    }
  },
  getters: {
    getNoteContent: state => noteId => {
      let newNotes = JSON.parse(JSON.stringify(state.notes))
      let note = newNotes.filter(note => note.id === noteId)[0]

      return note.content
    },
    totalNotesCount: state => state.notes.length,
    totalCharactesCount: state => {
      let sumOfCharacters = 0

      for (const note of state.notes) {
        sumOfCharacters += note.content.length
      }

      return sumOfCharacters
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreNotes, import.meta.hot))
}