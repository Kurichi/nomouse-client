<script setup lang="ts">
import Card from '@/components/Card.vue'
import NewCard from '@/components/NewCard.vue'
const cards = [
  {
    id: 'id1',
    title: 'title1',
    created_at: '2022/12/21 12:32:12',
    image_url: '@/assets/test.png',
  },
  {
    id: 'id2',
    title: 'title2',
    created_at: '2022/12/21 12:32:12',
    image_url: '@/assets/test.png',
  },
  {
    id: 'id3',
    title: 'title3',
    created_at: '2022/12/21 12:32:12',
    image_url: '@/assets/test.png',
  },
  {
    id: 'id4',
    title: 'title4',
    created_at: '2022/12/21 12:32:12',
    image_url: '@/assets/test.png',
  },
  {
    id: 'id5',
    title: 'title5',
    created_at: '2022/12/21 12:32:12',
    image_url: '@/assets/test.png',
  },
]
</script>

<template>
  <div class="py-20">
    <div class="card-grid max-w-[1210px] mx-auto">
      <NewCard />
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :id="card.id"
        :title="card.title"
        :created-at="card.created_at"
        :image-url="card.image_url"
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
