import axios from "axios";

const APY_KEY = '38641862-6e3c32f7e92ada91c695f5ab6';

const instance = axios.create({
    baseURL: 'https://pixabay.com/api/',

    params: {
        orientation: 'landscape',
        per_page: 12,
        key: APY_KEY,
    },
});


export const getImages = async (query, page) => {
  const { data } = await instance.get(`/?q=${query}&page=${page}`);

  return data;
};