import { useReducer } from 'react';

const initialState = {
  error: null,
  notification: null,
  showModal: false,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_NOTIFICATION':
      return { ...state, notification: action.payload };
    case 'SHOW_MODAL':
      return { ...state, showModal: true };
    case 'HIDE_MODAL':
      return { ...state, showModal: false };
    case 'CLEAR_MESSAGES':
      return { ...state, error: null, notification: null };
    default:
      return state;
  }
};

const useCommonReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setError = (error: any) => dispatch({ type: 'SET_ERROR', payload: error });
  const setNotification = (notification: any) => dispatch({ type: 'SET_NOTIFICATION', payload: notification });
  const showModal = () => dispatch({ type: 'SHOW_MODAL' });
  const hideModal = () => dispatch({ type: 'HIDE_MODAL' });
  const clearMessages = () => dispatch({ type: 'CLEAR_MESSAGES' });

  return {
    state,
    setError,
    setNotification,
    showModal,
    hideModal,
    clearMessages,
  };
};

export default useCommonReducer;
