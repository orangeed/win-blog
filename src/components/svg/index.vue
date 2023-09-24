<!-- svg -->
<template>
  <svg class="icon" aria-hidden="true" :height="height" :width="width">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps<{ name: string; height: number; width: number }>()
</script>

<style lang="scss" scoped></style>
