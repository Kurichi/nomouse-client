<script setup lang="ts">
import Card from '@/components/Card.vue';
import NewCard from '@/components/NewCard.vue';

definePageMeta({
  middleware: ['auth'],
});

const { token } = useAuth();
const { data } = await useFetch('/api/v1/slides', {
  baseURL: 'https://markup-slide.ddns.net',
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
});
const cards = data.value as Slide[];
</script>

<template>
  <div
    class="py-20 bg-slate-200 h-[var(--slide-editor-h)]"
    style="--slide-editor-h: calc(100vh - var(--header-h))"
  >
    <div class="card-grid max-w-[1210px] mx-auto">
      <NewCard />
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :id="card.id"
        :title="card.title"
        :created-at="card.created_at"
        :image-url="`https://markup-slide.ddns.net/assets/${card.google_uid}/${card.id}.png`"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-grid {
  --card-w: clamp(210px, 28vw, 280px);
  --card-h: clamp(150px, 20vw, 200px);
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--card-w));
  grid-row-gap: 30px;
  row-gap: 30px;
  grid-column-gap: 30px;
  -moz-column-gap: 30px;
  column-gap: 30px;
  justify-content: center;
}
</style>
