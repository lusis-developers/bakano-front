<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'

import { SpinnerSize } from '@/enum/components/shared/SpinnerLoader.enum'

const props = defineProps({
  size: {
    type: String as PropType<SpinnerSize>,
    required: false,
    default: SpinnerSize.SMALL
  }
})

const spinnerClass = computed(() => {
  const sizeClass = {
    small: 'spinner-border-sm small',
    medium: 'medium',
    large: 'spinner-border-lg large'
  }

  return ['spinner-border text-primary', sizeClass[props.size]].join(' ')
})
</script>

<template>
  <div :class="spinnerClass" role="status">
    <span class="visually-hidden"> loading...</span>
  </div>
</template>

<style lang="scss" scoped>
.small {
  width: 32px;
  height: 32px;
}
.medium {
  width: 64px;
  height: 64px;
}
.large {
  width: 128px;
  height: 128px;
}
</style>
