import { GoogleAuthProvider } from 'firebase/auth'

export const onSignIn = (googleUser) => {
  console.log('Google Auth Response', googleUser)
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    unsubscribe()
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      const credential = GoogleAuthProvider.credential(
        googleUser.getAuthResponse().id_token,
      )

      // Sign in with credential from the Google user.
      signInWithCredential(auth, credential).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The credential that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
    } else {
      console.log('User already signed-in Firebase.')
    }
  })
}

export const isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    const providerData = firebaseUser.providerData
    for (let i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId === GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true
      }
    }
  }
  return false
}
