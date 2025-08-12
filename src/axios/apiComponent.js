import axios from "axios";

axios.defaults.baseURL = `https://api.themoviedb.org/3`;
axios.defaults.headers = {
  accept: 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGRiNWJkN2U5YWExY2M0MzBhZjAwYzVhMDU2ZDAxMCIsInN1YiI6IjY1MTJjM2YyOGUyYmE2MDEwMTlmZjg5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7zJPhqUXyDij87cKqpJpgtQnm376t0iMEdo8YRFnUG4',
}

export class ApiComponent {
  limit = 20;

  baseSearchParams = {
    include_adult:false,
  };

  #details = {
    trending: '/trending/all/week',
    credits: '/credit/credit_id',
    details:'movie'
  }

  async fetchTrending(page) {
    const searchParams = new URLSearchParams({
      ...this.baseSearchParams,
      page: page,
    });

    const resp = await axios.get(`${this.#details.trending}?${searchParams.toString()}`);
    return resp.data;
  }

  async fetchDetails(id,param="") {

    const resp = await axios.get(`${this.#details.details}/${id}${param}`)
    return resp.data;
  }

}
