import axios from "axios";

axios.defaults.headers = {
  "Accept-Version": "v1",
};

axios.defaults.baseURL = `https://api.unsplash.com`;

export class ApiComponent {
  #accessKey = "IjDvYHmww1mX0Xy7Qm4q6H0CWxq6BmjQW3pGp7WUh_o";
  limit = 10;

  baseSearchParams = {
    client_id: this.#accessKey,
    count: this.limit,
    orientation: "landscape",
    content_filter: "high"
  };

  async fetchPhotos(topic,page) {
    if (!topic.trim()) return;
    const searchParams = new URLSearchParams({
      ...this.baseSearchParams,
      query: topic,
      page: page,
    });

    const resp = await axios.get(`/search/photos/?${searchParams.toString()}`);
    return resp.data;
  }
}
