<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>

<template>
  <div>room/[id]/booking</div>
  <p>Room ID: {{ id }}</p>
</template>

<style scoped></style>