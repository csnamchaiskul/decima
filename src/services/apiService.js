import axios from 'axios';
import qs from 'qs';


const getAxios = (accessToken,contentType) => {
  const config = {
    validateStatus: function (status) {
      return (status === 200) || (status === 422);
    },
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    }

  };
  (contentType) && (config.headers['Content-type'] = contentType)
  return axios.create(config)
};


export const postApi = ({url,accessToken,contentType,body}) => {

  return getAxios(accessToken, contentType).post(url, body
      ).then((res) => (res.data))

};

export const putApi = ({url,accessToken,contentType,body}) => {

  return getAxios(accessToken, contentType).put(url, body
  ).then((res) => (res.data))

};

export const getApi = ({accessToken,url, ...params}) => {

  return getAxios(accessToken).get(
    url,
    {params: {...params}}
  ).then((res) => (res.data))

};

export const deleteApi = ({accessToken,url, ...params}) => {

  return getAxios(accessToken).delete(
    url,
    {params: {...params}}
  ).then((res) => (res.data))

};

export default {postApi,putApi,getApi,deleteApi};