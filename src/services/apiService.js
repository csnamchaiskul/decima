import axios from 'axios';
import qs from 'qs';
import { store } from '../config/configStore'

const genURL = (url) => (window.decimaSetting.nonaUrl+url);

function loading(){
  store.dispatch({type:'APP:doLoading',loadingMessage:'Loading...'});
  return true;
}

function loaded(){
  store.dispatch({type:'APP:setLoading',loading:false});
  return true;
}




const getAxios = (accessToken,contentType) => {
  const config = {
    validateStatus: function (status) {
      return (status === 200);
    },
    headers: {}

  };

  //console.log(accessToken);

  (accessToken) && Object.assign(config,{
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    }
  });


  config.headers['Content-type'] = contentType || 'application/json';



  return axios.create(config);
};


export const postApi = ({url,accessToken,contentType,body}) => {
  loading();

    return getAxios(accessToken, contentType).post(genURL(url), body
    ).then((res) => (loaded() && res.data)).catch((e) =>
      {
        loaded();
        throw e;
      });

};

export const putApi = ({url,accessToken,contentType,body}) => {
  loading();

  return getAxios(accessToken, contentType).put(genURL(url), body
  ).then((res) => (loaded() && res.data)).catch(e => {

    loaded();
    throw e;

  });
};

export const getApi = ({accessToken,url, ...params}) => {
  loading();
  return getAxios(accessToken).get(
    genURL(url),
    {params: {...params}}
  ).then((res) => (loaded() && res.data)).catch(e => {

    loaded();
    throw e;

  });

};

export const deleteApi = ({accessToken,url, ...params}) => {
  loading();
  return getAxios(accessToken).delete(
    genURL(url),
    {params: {...params}}
  ).then((res) => (loaded() && res.data)).catch(e => {

    loaded();
    throw e;

  });

};

export default {postApi,putApi,getApi,deleteApi};