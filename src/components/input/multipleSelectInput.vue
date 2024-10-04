<script setup>
const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  label: {
    type: String,
    default: 'Seleccione una o más opciones'
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  options: {
    type: Array,
    required: true
  }
})

const selectedOptions = ref([...props.modelValue])

function toggleOption(option) {
  if (selectedOptions.value.includes(option)) {
    selectedOptions.value = selectedOptions.value.filter((o) => o !== option)
  } else {
    selectedOptions.value.push(option)
  }
  emits('update:modelValue', selectedOptions.value)
}

function removeOption(option) {
  selectedOptions.value = selectedOptions.value.filter((o) => o !== option)
  emits('update:modelValue', selectedOptions.value)
}

watch(
  () => props.modelValue,
  (newValue) => {
    selectedOptions.value = [...newValue]
  }
)
</script>

<template>
  <div class="mb-3 d-flex flex-column">
    <label class="form-label">{{ label }}</label>
    <small v-if="selectedOptions.length === 0" class="text-danger">
      Escoge los rangos que consideres son tu objetivo.
    </small>
    <div class="d-flex flex-wrap gap-2">
      <div
        v-for="option in selectedOptions"
        :key="option"
        class="badge bg-primary rounded-pill p-2"
        style="display: flex; align-items: center; cursor: pointer"
      >
        {{ option }}
        <span @click="removeOption(option)" class="ms-2" style="cursor: pointer">&times;</span>
      </div>
    </div>
    <div class="dropdown mt-2">
      <button
        class="btn btn-outline-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Seleccionar opciones
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li v-for="option in options" :key="option">
          <a
            class="dropdown-item"
            href="#"
            @click.prevent="toggleOption(option)"
            :class="{ active: selectedOptions.includes(option) }"
          >
            <input
              type="checkbox"
              class="form-check-input me-2"
              :checked="selectedOptions.includes(option)"
            />
            {{ option }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
