import {
  getAuth,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

export const useAuth = () => {
  const token = useState<string | null>('token', () => null);

  async function signIn() {
    return await new Promise<void>((resolve, reject) => {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider)
        .then((userCredential) => {
          userCredential.user
            .getIdToken()
            .then((idToken) => {
              token.value = idToken;

              const runtimeConfig = useRuntimeConfig();
              console.log(runtimeConfig.baseURL);
              // API サーバー問い合わせ
              useFetch('/api/v1/users', {
                method: 'GET',
                baseURL: 'http://markup-slide.ddns.net',
                // baseURL: runtimeConfig.baseURL,
                headers: {
                  Authorization: `Bearer ${token.value}`,
                },
              })
                .then((result) => {
                  console.log(result);
                  resolve();
                })
                .catch(async (error) => {
                  const uid = await auth.currentUser?.uid;
                  console.error(error);
                  useFetch('/api/v1/users', {
                    method: 'POST',
                    baseURL: 'http://markup-slide.ddns.net',
                    // baseURL: runtimeConfig.baseURL,
                    headers: {
                      Authorization: `Bearer ${token.value}`,
                    },
                    body: {
                      google_uid: uid,
                    },
                  })
                    .then((result) => {
                      console.log(result);
                      resolve();
                    })
                    .catch(reject);
                });
              resolve();
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  async function signOut() {
    return await new Promise<void>((resolve, reject) => {
      const auth = getAuth();
      firebaseSignOut(auth)
        .then(() => {
          token.value = null;
          resolve();

          const router = useRouter();
          router.push('/');
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async function checkAuthState() {
    return await new Promise<void>((resolve, reject) => {
      // client only
      if (process.server) return resolve();
      const auth = getAuth();
      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            user
              .getIdToken()
              .then((idtoken) => {
                token.value = idtoken;
                resolve();
              })
              .catch(reject);
          } else {
            token.value = null;
            resolve();
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  return {
    signIn,
    signOut,
    token,
    checkAuthState,
  };
};
