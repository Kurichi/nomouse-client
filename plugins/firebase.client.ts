import { initializeApp } from "firebase/app";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyBml_dJxMHIk_-pPQ8ebgEwvg-RdzR1ujk",
    authDomain: "hackzhackathon-nokogiri.firebaseapp.com",
    projectId: "hackzhackathon-nokogiri",
  };
  initializeApp(firebaseConfig);
});
// initializeAuth(app, {
//   persistence: browserSessionPersistence,
//   popupRedirectResolver: browserPopupRedirectResolver,
// });
