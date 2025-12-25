<script setup lang="ts">
import { ref } from 'vue'
const url = ref(import.meta.env.RENDERER_VITE_BASE_PAGE)
</script>

<template>
  <webview :src="url" style="width: 100%; height: 100%; border: none" />
</template>
