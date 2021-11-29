const baseApiUrl = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";

/**
 * @params {string} [method=post/get/put/delete]
 * @params {object} form data
 * @params {string} alert messages
 */

export const apiCall = {
  getRequest(urlExt, getData) {
    fetch(`${baseApiUrl}/${urlExt}`, { method: "GET" })
      .then((res) => res.json())
      .then(getData)
      .catch((err) => console.log("Error....", err));
  },
  postRequest(urlExt, requestMethod, postData = {}, message) {
    fetch(`${baseApiUrl}/${urlExt}`, {
      method: requestMethod,
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert(message);
          window.location.reload(false);
        } else {
          alert("There was an error submitting your data");
        }
      })
      .catch((err) => console.log("Error....", err));
  },
  deleteRequest(urlExt, message) {
    fetch(`${baseApiUrl}/${urlExt}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data) {
          await alert(message);
          window.location.reload(true);
        } else {
          alert("An error occurred while deleting this");
        }
      })
      .catch((err) => console.log("Error....", err));
  },
};
