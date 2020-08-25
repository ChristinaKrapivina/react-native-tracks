import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return { token: action.payload, errorMessage: '' };
    case 'signout':
      return { token: null, errorMessage: '' };
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'clear_error':
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};

const autoSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('TrackList');
  } else {
    navigate('loginFlow');
  }
};

const clearError = dispatch => () => {
  dispatch({ type: 'clear_error' });
};

const signup = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signin', payload: response.data.token });
    navigate('TrackList');
  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign up'});
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signin', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signin', payload: response.data.token });
    navigate('TrackList');
  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign in'});
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({type: 'signout'});
  navigate('loginFlow');
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signin, signup, signout, clearError, autoSignin },
  { token: null, errorMessage: '' }
); 