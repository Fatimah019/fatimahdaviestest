import { apiCall } from "./api.js";
import { newsStorage } from "./storage.js";

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

// get news comments by id
const getNewsCommentsById = async () => {
  const news_comments = document.querySelector("#news-comments");
  await apiCall.getRequest(`news/${news_id}/comments`, (res) => {
    return res.map((data) => {
      const comment_card = document.createElement("div");

      const author_name = document.createElement("h3");
      author_name.textContent = data.name;

      const author_image = document.createElement("img");
      author_image.src = data.avatar;

      const comment_form = document.createElement("form");
      comment_form.setAttribute("class", "comment_form");

      const comment_text = document.createElement("textarea");
      comment_text.value = data.comment;
      comment_text.disabled = true;

      const delete_comment_btn = document.createElement("button");
      delete_comment_btn.textContent = "Delete";

      const edit_comment_container = document.createElement("div");

      const edit_comment_btn = document.createElement("button");
      edit_comment_btn.textContent = "edit";

      const update_comment_btn = document.createElement("button");
      update_comment_btn.textContent = "update";
      update_comment_btn.style.display = "none";

      news_comments.appendChild(comment_card);

      edit_comment_container.appendChild(edit_comment_btn);
      edit_comment_container.appendChild(update_comment_btn);

      comment_form.appendChild(comment_text);

      comment_card.appendChild(author_name);
      comment_card.appendChild(comment_form);
      comment_card.appendChild(author_image);
      comment_card.appendChild(delete_comment_btn);
      comment_card.appendChild(edit_comment_container);

      // enable edit
      edit_comment_btn.addEventListener("click", async () => {
        await newsStorage.setItemToLocalStorage("comment_to_edit", data.id);
        comment_text.disabled = false;
        update_comment_btn.style.display = "block";
        edit_comment_btn.style.display = "none";

        // update_btn.addEventListener("click", () => console.log("hey"));
        // editComment(JSON.parse(localStorage.getItem("comment_to_edit")), "comment edited successfully");
      });

      update_comment_btn.addEventListener("click", async () => {
        // editComment();
        await editComment("comment edited successfully");
        update_comment_btn.style.display = "none";
        edit_comment_btn.style.display = "block";
        comment_text.disabled = true;
      });

      // edit comment

      // delete a comment by its id
      delete_comment_btn.addEventListener("submit", async (res) => {
        await newsStorage.setItemToLocalStorage("comment_to_del", data.id);
        if (confirm(`Are you sure you want to delete it ?`)) {
          deleteComment(JSON.parse(localStorage.getItem("comment_to_del")), "comment deleted successfully");
        } else {
          null;
        }
      });
    });
  });
};

// delete a comment by its id
const deleteComment = async (id, message) => {
  await apiCall.deleteRequest(`news/${news_id}/comments/${id}`, message);
};

const postComment = document.querySelector("#form-add-comments");
// delete a comment by its id
const editComment = async (id, message) => {
  const comment = document.querySelector(".comment_form");
  const formData = new FormData(comment).entries();

  await apiCall.postRequest(`news/${news_id}/comments/${75}`, "PUT", formData, message);
};

// post a comment
postComment.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(postComment).entries();
  await apiCall.postRequest(`news/${news_id}/comments`, "POST", formData, "Comment Added Successfully");
});

getNewsById();
getNewsImages();
getNewsCommentsById();
