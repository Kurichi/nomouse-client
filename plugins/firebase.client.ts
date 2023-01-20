import { initializeApp } from 'firebase/app';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: 'AIzaSyBml_dJxMHIk_-pPQ8ebgEwvg-RdzR1ujk',
    authDomain: 'hackzhackathon-nokogiri.firebaseapp.com',
    projectId: 'hackzhackathon-nokogiri',
    storageBucket: 'hackzhackathon-nokogiri.appspot.com',
    messagingSenderId: '962011674620',
    appId: '1:962011674620:web:5f12615a2dad26d68da479',
  };
  initializeApp(firebaseConfig);
});
// initializeAuth(app, {
//   persistence: browserSessionPersistence,
//   popupRedirectResolver: browserPopupRedirectResolver,
// });
