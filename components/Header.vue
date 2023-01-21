<script setup lang="ts">
import BaseUser from '@/components/BaseUser.vue'
import { getAuth, onAuthStateChanged } from '@firebase/auth'

const auth = getAuth()
const avatar = ref(auth.currentUser?.photoURL)
const userName = ref(auth.currentUser?.displayName)

onAuthStateChanged(auth, (user) => {
  avatar.value = user?.photoURL
  userName.value = user?.displayName
})
</script>

<template>
  <div
    class="w-full h-[var(--header-h)] flex items-center px-10 bg-slate-100 justify-between"
  >
    <BaseIconButton name="home" size="2xl" @click="$router.push('/me')" />
    <BaseUser
      v-if="avatar"
      size="large"
      :user-icon-url="avatar ?? ''"
      user-name="userName"
    />
  </div>
</template>
