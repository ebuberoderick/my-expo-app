import AsyncStorage from '@react-native-async-storage/async-storage';

export function SignInAuth(data, dispatch) {
  dispatch(data?.data)
  AsyncStorage.setItem("APPTOKEN", data?.data?.bearer_token)
}


export async function SignOut(userStore, appDefault) {
  userStore({})
  appDefault({ location: "", getStarted: false })
  AsyncStorage.removeItem("APPTOKEN")
}


export function Session(user) {
  const session = {
    status: '',
    user
  }

  if (Object?.keys(user).length !== 0) {
    session.status = verifyJWT(user?.bearer_token)
  } else {
    session.status = 'unauthenticated'
  }
  return session
}

export function verifyJWT(jwtToken) {
  if (jwtToken) {
    return 'authenticated'
  } else {
    return 'unauthenticated'
  }
}






