import { FunctionComponent, useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";

const FirebaseAuthConfig = {
  signInFlow: "popup",
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    }
  ],
  signInSuccessUrl: "/"
};

const FirebaseAuth: FunctionComponent = () => {
  //trick to make sure this will be rendered in the browser, and not the server-side-rendering!!!
  // useEffect hook makes sure it will be in braowser as useEffect runs in browser
  const [renderAuth, setRenderAuth] = useState(false)

  useEffect(() => {
    setRenderAuth(true)
  }, [])


  return (
    <div className="mt-16">
      {renderAuth ?
        <StyledFirebaseAuth
          uiConfig={FirebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
        : null}

    </div>
  )
}

export default FirebaseAuth