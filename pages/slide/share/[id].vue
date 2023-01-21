<script setup lang="ts">
const { token } = useAuth();
const route = useRoute();
const { data } = await useFetch('/api/v1/share', {
  method: 'GET',
  baseURL: 'http://markup-slide.ddns.net',
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
  query: {
    shared_id: route.params.id,
  },
});
console.log(data.value);
</script>

<template>
  <div>
    <div class="text-red-500">share</div>
    <div>{{ $route.params.id }}</div>
  </div>
</template>

<style scoped lang="scss"></style>
