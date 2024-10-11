<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  image: {
    type: String,
    required: true,
    default: ''
  },
  name: {
    type: String,
    required: true
  }
})

const backgroundColor = computed(() => getRandomColor())
const initials = computed(() => {
  return props.name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase()
})

function getRandomColor(): string {
  const letters = '0123456789ABCDEF'
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }

  return color
}
</script>

<template>
  <div>
    <img
      v-if="image.length"
      :src="image"
      alt="Logo"
      class="me-2"
      style="width: 30px; height: 30px"
    />
    <div
      v-else
      class="d-flex justify-content-center align-items-center rounded profile-initials"
      :style="{ backgroundColor: backgroundColor }"
    >
      {{ initials }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-initials {
  width: 30px;
  height: 30px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 4px;
}
</style>
