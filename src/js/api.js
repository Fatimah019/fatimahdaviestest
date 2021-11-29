const baseApiUrl = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";

export const apiCall = {
  getRequest(urlExt, getData) {
    fetch(`${baseApiUrl}/${urlExt}`, { method: "GET" })
      .then((res) => res.json())
      .then(getData)
      .catch((err) => console.log(err));
  },
  postRequest(urlExt, requestMethod, postData, message) {
    fetch(`${baseApiUrl}/${urlExt}`, {
      method: requestMethod,
      body: JSON.stringify(Object.fromEntries(postData)),
      headers: {
        "Content-Type": "application/json",
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
      .catch((err) => console.log(err));
  },
  deleteRequest(urlExt, message) {
    fetch(`${baseApiUrl}/${urlExt}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => (data ? alert(message) : alert("An error occurred while deleting this")))
      .catch((err) => console.log(err));
  },
};
