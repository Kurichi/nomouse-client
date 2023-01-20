<script setup lang="ts">
// ログイン後に元のページへ戻る
const signIn = async () => {
  const { signIn } = useAuth();
  await signIn();
  const to = useRoute().redirectedFrom?.fullPath || '/';
  navigateTo(to, { redirectCode: 302 });
};
</script>
<template>
  <button @click="signIn()">Login</button>
</template>
