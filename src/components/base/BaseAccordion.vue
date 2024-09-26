<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: false
  },
  index: {
    type: Number,
    required: false
  },
  parentId: {
    type: String,
    requiered: false
  }
})

const headerId = `heading${props.index}`
const collapseId = `collapse${props.index}`
</script>

<template>
  <div class="accordion-item">
    <h2 class="accordion-header" :id="headerId">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#' + collapseId"
        aria-expanded="false"
        :aria-controls="collapseId"
      >
        {{ title }}
      </button>
    </h2>
    <div
      :id="collapseId"
      class="accordion-collapse collapse"
      :aria-labelledby="headerId"
      :data-bs-parent="parentId"
    >
      <div class="accordion-body">
        <slot />
      </div>
    </div>
  </div>
</template>
