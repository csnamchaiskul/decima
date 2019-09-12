import axios from 'axios';
import qs from 'qs';

const TOKEN_ENDPOINT = process.env.REACT_APP_OAUTH2_URL+"/oauth/token";
//const TOKEN_ENDPOINT = "http://127.0.0.1:99"+"/oauth/token";

const getAxiosForOauth = () =>
  axios.create({
    validateStatus: function(status){
      return (status >=200) && (status<299);
    },
    headers: {
      'Authorization':'Basic ' +btoa(process.env.REACT_APP_CLIENT_ID+':'+process.env.REACT_APP_CLIENT_PASS),
      'Content-type': 'application/x-www-form-urlencoded'
    }

  });



export const getClientToken = () =>
  getAxiosForOauth().post(
          TOKEN_ENDPOINT,
          qs.stringify({'grant_type':'client_credentials'})
        ).then((res)=>({  accessToken:res.data.access_token,
                          expiresIn:res.data.expires_in}));





export const getUserToken = (username,password) =>
   getAxiosForOauth().post(
            TOKEN_ENDPOINT,
            qs.stringify({grant_type:'password',username:username,password:password})
          ).then((res)=>({  accessToken:res.data.access_token,
                            expiresIn:res.data.expires_in}));



export default {getClientToken,getUserToken};