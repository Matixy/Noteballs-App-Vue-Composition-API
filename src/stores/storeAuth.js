// stores/counter.js
import { defineStore } from 'pinia'
// auth
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged  } from 'firebase/auth';

// storeNotes
import { useStoreNotes } from '@/stores/storeNotes';



export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    init () {
      const storeNotes = useStoreNotes()

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          this.router.push({
            name: 'notes'
          })
          storeNotes.init()
        } else {
          this.user = {}
          this.router.replace({
            name: 'auth'
          })
          storeNotes.clearNotes()
        }
      });
    },
    registerUser (credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('User: ', user);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    loginUser (credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User login: ', user);
      })
      .catch((error) => {
        console.log(error.message);
      });
    },
    logoutUser () {
      signOut(auth).then(() => {
        console.log('User logout');
      }).catch((error) => {
        console.log(error.message);
      });
    },
  },
})