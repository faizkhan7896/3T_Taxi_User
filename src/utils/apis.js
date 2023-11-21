import {ID, USERDATA} from '../redux/ActionTypes';
import store from '../redux/store';
import {baseUrl, ShowToast} from './constance';

export const apis = {
  post_api: async (api_name, body) => {
    try {
      const response = await fetch(baseUrl + api_name, {
        method: 'POST',
        body: body,
        headers: {'content-type': 'multipart/form-data'},
      });
      const res = await response.json();
      // console.log(res);
      return res;
    } catch (error) {
      console.log('post njbn', error);
    }
  },
  numberVerify: async ({number, setLoading}) => {
    try {
      setLoading(true);
      const url = baseUrl + 'sendOtp';
      const body = new FormData();
      body.append('mobile', number);
      const res = await fetch(url, {
        method: 'POST',
        body: body,
        headers: {'content-type': 'multipart/form-data'},
      });
      const result = await res.json();
      console.log(result);

      if (result.status == '1') {
        store.dispatch({type: ID, payload: result.result.id});
        store.dispatch({type: USERDATA, payload: result.result});
        setLoading(false);
        return;
      } else {
        ShowToast(result.message || 'Unknown error', 'error');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  },
  otp: async ({id, otp, setLoading}) => {
    try {
      setLoading(true);
      const url = baseUrl + 'check_otp';
      const body = new FormData();
      body.append('user_id', id);
      body.append('otp', otp);
      const res = await fetch(url, {
        method: 'POST',
        body: body,
        headers: {'content-type': 'multipart/form-data'},
      });
      const result = await res.json();
      console.log(result);
      if (result.status == '1') {
        setLoading(false);
        return result.result;
      } else {
        ShowToast(result.message || 'Unknown error', 'error');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  },
  signUp: async ({id, fname, lname, email, uname, setLoading}) => {
    try {
      setLoading(true);
      const url = baseUrl + 'userSignUp';
      const body = new FormData();
      body.append('user_id', id);
      body.append('first_name', fname);
      body.append('last_name', lname);
      body.append('email', email);
      body.append('user_name', uname);
      const res = await fetch(url, {
        method: 'POST',
        body: body,
        headers: {'content-type': 'multipart/form-data'},
      });
      const result = await res.json();
      console.log(result);
      if (result.status == '1') {
        store.dispatch({type: USERDATA, payload: result.result});
        setLoading(false);
        return result.result;
      } else {
        ShowToast(result.message || 'Unknown error', 'error');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  },
  update_profile: async function ({
    id,
    fname,
    lname,
    email,
    uname,
    add,
    city,
    country,
    mobile,
    setLoading,
  }) {
    try {
      setLoading(true);
      const url = baseUrl + 'update_profile';
      const body = new FormData();
      body.append('user_id', id);
      body.append('first_name', fname);
      body.append('last_name', lname);
      body.append('email', email);
      body.append('mobile', mobile);
      body.append('user_name', uname);
      body.append('address', add);
      body.append('city', city);
      body.append('country', country);
      body.append('lat', '1234');
      body.append('lon', '1234');
      const res = await fetch(url, {
        method: 'POST',
        body: body,
        headers: {'content-type': 'multipart/form-data'},
      });
      const result = await res.json();
      console.log(result);
      if (result.status == '1') {
        store.dispatch({type: USERDATA, payload: result.result});
        setLoading(false);
        return result.result;
      } else {
        ShowToast(result.message || 'Unknown error', 'error');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  },
  social_login: async ({s_id, mobile, u_name, email, r_id, setLoading}) => {
    try {
      setLoading(true);
      const url = baseUrl + 'social_login';
      const body = new FormData();
      body.append('social_id', s_id);
      body.append('mobile', mobile);
      body.append('user_name', u_name);
      body.append('type', 'USER');
      body.append('email', email);
      body.append('register_id', r_id);
      body.append('lat', '1234');
      body.append('lon', '123456');
      const res = await fetch(url, {
        method: 'POST',
        body: body,
        headers: {'content-type': 'multipart/form-data'},
      });
      const result = await res.json();
      console.log(result);
      if (result.status == '1') {
        setLoading(false);
        return result.result;
      } else {
        ShowToast(result.message || 'Unknown error', 'error');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  },
};
