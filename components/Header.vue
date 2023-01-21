<script setup lang="ts">
import BaseUser from '@/components/BaseUser.vue';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

const auth = getAuth();
const avatar = ref(auth.currentUser?.photoURL);
const userName = ref(auth.currentUser?.displayName);

onAuthStateChanged(auth, (user) => {
  avatar.value = user?.photoURL;
  userName.value = user?.displayName;
});
</script>

<template>
  <div
    class="w-full h-[var(--header-h)] flex items-center justify-end px-10 bg-slate-100"
  >
    <BaseUser :user-icon-url="avatar ?? ''" user-name="userName" />
  </div>
</template>
