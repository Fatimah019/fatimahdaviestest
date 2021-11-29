import { apiCall } from "./api.js";

let news_id = JSON.parse(localStorage.getItem("news_id"));
const news_page = document.querySelector("#news-page");

// get news by its id
const getNewsById = async () => {
  const author_details = document.createElement("div");
  const author_name = document.createElement("h2");
  const author_title = document.createElement("p");
  const author_image = document.createElement("img");

  news_page.appendChild(author_details);

  author_details.appendChild(author_image);
  author_details.appendChild(author_name);
  author_details.appendChild(author_title);

  await apiCall.getRequest(`news/${news_id}`, (res) => {
    author_name.textContent = res.author;
    author_title.textContent = res.title;
    author_image.src = res.avatar;
  });
};

// get news images by id
const getNewsImages = async () => {
  await apiCall.getRequest(`news/${news_id}/images`, (res) => {
    return res.map((data) => {
      const news_images_card = document.createElement("div");
      news_images_card.setAttribute("class", "news-images");

      const news_image = document.createElement("img");
      news_image.src = data.image;

      news_page.appendChild(news_images_card);

      news_images_card.appendChild(news_image);
    });
  });
};

getNewsById();
getNewsImages();
