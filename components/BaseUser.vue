<script setup lang="ts">
import { ref } from 'vue';
const showModal = ref(false);
const props = defineProps({
  size: {
    type: String,
    default: 'base',
  },
  userIconUrl: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});
const getUserIconWidth = (): string => {
  switch (props.size) {
    case 'small':
      return '20px';
    case 'base':
      return '30px';
    case 'large':
      return '40px';
    default:
      return '30px';
  }
};

const { signOut } = useAuth();
</script>

<template>
  <div class="min-w-fit min-h-fit relative">
    <div
      class="rounded-full w-[var(--user-icon-w)] h-[var(--user-icon-w)] overflow-hidden relative cursor-pointer z-20"
      :style="`--user-icon-w: ${getUserIconWidth()};`"
      @click="showModal = !showModal"
    >
      <img
        :src="userIconUrl"
        :alt="userName"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
    <div
      v-if="showModal"
      class="w-36 absolute top-10 right-0 bg-gray-100 rounded-lg shadow py-5 flex flex-col items-center z-30"
    >
      <span class="w-fit text-sm cursor-pointer select-none" @click="signOut()"
        >ログアウト</span
      >
    </div>
  </div>
  <div
    v-if="showModal"
    class="w-screen h-screen absolute top-0 left-0 z-10"
    @click="showModal = false"
  />
</template>
