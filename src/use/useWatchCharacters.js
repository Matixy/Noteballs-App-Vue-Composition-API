import { watch, inject } from "vue"

export function useWatchCharacters (valueToWatch, maxChars = 100) {
  const showAlertNoteLength = inject('showAlertNoteLength')
  const alertCreationTime = inject('alertCreationTime')
  const maxCharsInAlertContent = inject('maxCharsInAlertContent')

  maxCharsInAlertContent.value = maxChars

  watch(valueToWatch, (newValue) => {
    if (newValue.length === maxChars) {
      showAlertNoteLength.value = true 
      alertCreationTime.value = new Date
    } else {
      showAlertNoteLength.value = false 
    }
  })
}