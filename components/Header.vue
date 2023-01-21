<script setup lang="ts">
import BaseUser from '@/components/BaseUser.vue'
import { getAuth } from '@firebase/auth'

const auth = getAuth()
const avatar = auth.currentUser?.photoURL
</script>

<template>
  <div
    class="w-full h-[var(--header-h)] flex items-center justify-end px-10 bg-slate-100"
  >
    <BaseUser :user-icon-url="avatar ?? ''" user-name="test" />
  </div>
</template>
