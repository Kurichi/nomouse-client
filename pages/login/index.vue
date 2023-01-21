<script setup lang="ts">
import { getAuth } from '@firebase/auth';

onMounted(async () => {
  const { checkAuthState } = useAuth();
  await checkAuthState();
  const auth = getAuth();
  if (auth.currentUser !== null) {
    const router = useRouter();
    router.push('/');
  }
});
// ログイン後に元のページへ戻る
const signIn = async () => {
  const { signIn } = useAuth();
  await signIn();
  const to = useRoute().redirectedFrom?.fullPath || '/';
  navigateTo(to, { redirectCode: 302 });
};
</script>
<template>
  <div
    class="w-full h-[var(--top-h)] bg-slate-100 relative"
    style="--top-h: calc(100vh - var(--header-h))"
  >
    <div
      class="google-signin absolute top-[50%] left-1/2 -translate-x-1/2"
      @click="signIn()"
    />
  </div>
</template>

<style lang="scss">
.google-signin {
  background-image: url('@/assets/image/btn_google_signin_light_normal_web.png');
  width: 191px;
  height: 46px;

  &:hover {
    background-image: url('@/assets/image/btn_google_signin_light_focus_web.png');
    cursor: pointer;
  }
  &:active {
    background-image: url('@/assets/image/btn_google_signin_light_pressed_web.png');
  }

  &.is-disabled {
    background-image: url('@/assets/image/btn_google_signin_light_disabled_web.png');
  }
}
</style>
