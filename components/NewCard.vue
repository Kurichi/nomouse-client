<script setup lang="ts">
const newCard = async () => {
  const { token } = useAuth();
  const { data } = await useFetch('/api/v1/slides', {
    method: 'POST',
    baseURL: 'https://markup-slide.ddns.net',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: {
      code: '',
      compiled_data: '[]',
      thumbnail: '',
      title: '',
    },
  });

  const router = useRouter();
  router.push(`/slide/edit/${(data.value as Slide)?.id}`);
};
</script>

<template>
  <div
    @click="newCard()"
    class="card block rounded-xl max-w-fit cursor-pointer"
  >
    <div
      class="relative w-[var(--card-w)] h-[var(--card-h)] m-0 rounded-xl border-2 border-gray-200 box-border overflow-hidden hover:shadow-md bg-white"
    >
      <span
        class="material-symbols-outlined text-8xl text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        add
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  &__title {
    font-size: clamp(20px, 2vw, 26px);
  }
  &__updated {
    font-size: clamp(14px, 1.4vw, 18px);
  }
}
</style>
