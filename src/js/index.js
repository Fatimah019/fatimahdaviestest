import { apiCall } from "./api.js";
import { newsStorage } from "./storage.js";

const getAllAuthors = async (page_number, items) => {
  const author_list = document.querySelector("#author-list");
  await apiCall.getRequest(`news?page=${page_number}&limit=${items}`, (res) => {
    return res.map((data) => {
      const author_card = document.createElement("div");
      author_card.setAttribute("class", "author-card");

      const author_name = document.createElement("h3");
      author_name.textContent = data.author;

      const author_image = document.createElement("img");
      const isAuthorImg =
        !data.avatar || data.avatar === undefined || data.avatar === ""
          ? "/src/assets/images/defaulltimage.jpg"
          : data.avatar;
      author_image.src = isAuthorImg;

      const author_title = document.createElement("p");
      author_title.textContent = data.title;

      const delete_news_btn = document.createElement("button");
      delete_news_btn.textContent = "Delete";

      const see_details_btn = document.createElement("button");
      see_details_btn.textContent = "See More";
      see_details_btn.setAttribute("class", "see_more_btn");

      author_list.appendChild(author_card);

      author_card.appendChild(author_name);
      author_card.appendChild(author_title);
      author_card.appendChild(author_image);
      author_card.appendChild(see_details_btn);
      author_card.appendChild(delete_news_btn);

      see_details_btn.addEventListener("click", async () => {
        await newsStorage.setItemToLocalStorage("news_id", data.id);
        location.href = `/src/pages/news/index.html?author=${data.author}`;
      });

      // delete a news by its id
      delete_news_btn.addEventListener("click", async (res) => {
        await newsStorage.setItemToLocalStorage("news_to_del", data.id);
        if (confirm(`Are you sure you want to delete ${data.author} ?`)) {
          await deleteNews(JSON.parse(localStorage.getItem("news_to_del")), `${data.author} deleted successfully`);
        } else {
          null;
        }
      });
    });
  });
};
getAllAuthors(1, 100);

// post a news
const postNews = document.querySelector("#form-add-news");
const post_news_btn = document.querySelector("#send-news-btn");
postNews.addEventListener("submit", async (e) => {
  e.preventDefault();
  // post_news_btn.textContent = "sending";
  const formData = new FormData(postNews).entries();
  // const author = document.querySelector("#author");
  // const title = document.querySelector("#title");
  // const avatar = document.querySelector("#avatar");
  // const news_url = document.querySelector("#url");

  // const formData = new FormData();
  // formData.append("author", author.value);
  // formData.append("title", title.value);
  // formData.append("avatar", avatar.files[0]);
  // formData.append("url", news_url.value);

  await apiCall.postRequest("news", requestMethod, formData, "News Added Successfully");
});

// delete a news by its id
const deleteNews = async (id, message) => {
  const news_id = localStorage.getItem("news_id");
  await apiCall.deleteRequest(`news/${id}`, message);
};
