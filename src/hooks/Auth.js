import AsyncStorage from '@react-native-async-storage/async-storage';
import { addData } from '../Store/reducers/UsersReducer';
import { updateAppState } from '../Store/reducers/AppDefault';

export function SignInAuth(data, dispatch) {
  dispatch(addData(data?.data));
  AsyncStorage.setItem("APPTOKEN", data?.data?.bearer_token)
}


export async function  SignOut(dispatch) {
  dispatch(addData({}))
  dispatch(updateAppState({
    location: "",
    getStarted: false
}))
  AsyncStorage.removeItem("APPTOKEN")
}


export function Session(user) {
  const session = {
    status: '',
    user
  }
  
  if (Object?.keys(user).length !== 0) {
    session.status = verifyJWT(user?.value?.bearer_token)
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






