const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const toggleButton = document.getElementById("toggle-search");
const resultsDiv = document.getElementById("results");

let isUserSearch = true;

toggleButton.addEventListener("click", () => {
  isUserSearch = !isUserSearch;
  searchInput.placeholder = isUserSearch
    ? "Enter username or repository name"
    : "Enter repository name";
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value;

  if (isUserSearch) {
    searchUsers(searchTerm);
  } else {
    searchRepositories(searchTerm);
  }
});

function searchUsers(username) {
  fetch(`https://api.github.com/search/users?q=${username}`)
    .then((response) => response.json())
    .then((data) => {
      const users = data.items;
      displayUsers(users);
    })
    .catch((error) => {
      console.error("Error searching for users:", error);
    });
}

function searchRepositories(repositoryName) {
  fetch(`https://api.github.com/search/repositories?q=${repositoryName}`)
    .then((response) => response.json())
    .then((data) => {
      const repositories = data.items;
      displayRepositories(repositories);
    })
    .catch((error) => {
      console.error("Error searching for repositories:", error);
    });
}

function displayUsers(users) {
  resultsDiv.innerHTML = "";
  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.innerHTML = `
      <p>Username: ${user.login}</p>
      <img src="${user.avatar_url}" alt="Avatar">
      <a href="${user.html_url}" target="_blank">Profile</a>
    `;
    resultsDiv.appendChild(userDiv);
  });
}

function displayRepositories(repositories) {
  resultsDiv.innerHTML = "";
  repositories.forEach((repo) => {
    const repoDiv = document.createElement("div");
    repoDiv.innerHTML = `
      <p>Repository: ${repo.name}</p>
      <p>Owner: ${repo.owner.login}</p>
      <a href="${repo.html_url}" target="_blank">Repository Link</a>
    `;
    resultsDiv.appendChild(repoDiv);
  });
}
