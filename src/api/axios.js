import axios from 'axios';

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "b68ccf77b71c3d8cabf678e544f54ab4",
    language: "ko-KR",
  },
});

export default instance;