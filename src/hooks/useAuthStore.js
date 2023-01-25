import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async({email, password}) => {
    dispatch(onChecking());
    try {
        const { data } = await calendarApi.post('/auth', {email, password});
        localStorage.setItem('token-calendar', data.token);
        localStorage.setItem('token-init-date-calendar', new Date().getTime());
        dispatch(onLogin({ name:data.name, uid:data.uid }))
    } catch (error) {
        dispatch( onLogout('Credenciales incorrectas') );
        setTimeout(() => {
            dispatch(clearErrorMessage());
        }, 10);
    }
  }

  const startRegister = async({name, email, password}) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth/new', {name, email, password});
      localStorage.setItem('token-calendar', data.token);
      localStorage.setItem('token-init-date-calendar', new Date().getTime());
      dispatch(onLogin({ name:data.name, uid:data.uid }))
      
    } catch (error) {
      dispatch( onLogout(error.response.data?.msg || '--') );
        setTimeout(() => {
            dispatch(clearErrorMessage());
      }, 10);
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token-calendar');
    if( !token ) return dispatch( onLogout() );
    
    try {
      const { data } = await calendarApi.get('auth/renew');
      console.log(data);
      localStorage.setItem('token-calendar', data.token);
      localStorage.setItem('token-init-date-calendar', new Date().getTime());
      dispatch(onLogin({ name:data.name, uid:data.uid }))
    } catch (error) {
      localStorage.clear();
      dispatch( onLogout() );
    }
  }

  const startLogut = () => {
    localStorage.clear();
    dispatch(onLogout());
  }

  return {
    //* Propiedades
    errorMessage,
    status,
    user,

    //* Métodos
    checkAuthToken,
    startLogin,
    startLogut,
    startRegister,
  };
};