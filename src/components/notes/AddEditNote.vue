<template>
  <div 
    class="card text-center mb-4 "
    :class="`bg-${bgColor}`"
  >

    <div class="card-body pb-1 text-start">
      <h6
        v-if="subtitle"
        class="card-subtitle mb-2 text-light"
      > {{ subtitle }}</h6>
      <div class="mb-3">
        <textarea
          :placeholder="placeholder"
          @input="$emit('update:modelValue', $event.target.value)"
          class="form-control"
          maxlength="100"
          ref="textAreaRef"
          rows="3"
          v-autofocus
          v-bind:value="modelValue"
        ></textarea>
        <p class="card-text text-end"><small :class="`text-${charactersCountColor}`"> {{ `${charsCount} characters` }} </small></p>
      </div>
    </div>
    <div class="card-body border-top-0 text-end pt-0">
        <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script setup>
// 
// import
// 

  import { ref, computed } from 'vue';
  // directives
  import { vAutofocus } from '@/directives/vAutofocus'

// 
// props
// 

  const props = defineProps({
      modelValue: {
          type: String,
          required: true
      },
      bgColor: {
          type: String,
          default: 'info'
      },
      placeholder: {
        type: String,
        default: 'Type something...'
      },
      subtitle: {
        type: String
      },
      charactersCountColor:{
        type: String,
        default: 'body-tertiary'
      }
  })

// 
// emit

  const emit = defineEmits(['update:modelValue'])

// 
// focus on text area after click
// 
  const textAreaRef = ref(false)

  const focusTextArea = () => {
      textAreaRef.value.focus()
  }

  defineExpose({
      focusTextArea
  })

// 
// update characters count
// 

  const charsCount = computed(() => props.modelValue.length)

</script>