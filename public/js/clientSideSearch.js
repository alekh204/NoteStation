const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", (e) => {
  
  const searchParams = new URLSearchParams();
  searchParams.append('searchValue', searchInput.value);

  fetch("/searchNotes", {
    method: "POST",
    body: searchParams,
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      console.log("inside then");
      console.log(data);
    })
    .catch(function (error) {
      console.log("inside catch");
      console.log(error);
    });
});
