const profileContainer = document.getElementById("profileContainer");
const searchButton = document.getElementById("searchButton");

const generateProfile = (profile) => {
  return `
        <div class="card">
          <div class="top">
            <img src="${profile.avatar_url}" alt="Profile Picture" />
            <h1>${profile.name || "No Name Provided"}</h1>
            <p>@${profile.login}</p>
          </div>
          <p>${profile.bio || "No bio available"}</p>
          <div class="botton">
            <div>
              <h2>Followers</h2>
              <p>${profile.followers}</p>
            </div>
            <div>
              <h2>Following</h2>
              <p>${profile.following}</p>
            </div>
          </div>
          <a href="${profile.html_url}" target="_blank">
            <button class="search">View Profile</button>
          </a>
        </div>
      `;
};

const fetchProfile = async () => {
  const username = document.getElementById("searchInput").value.trim();
  if (!username) return alert("Please enter a GitHub username");

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("User not found");
    const data = await res.json();
    profileContainer.innerHTML = generateProfile(data);
  } catch (error) {
    profileContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
};

searchButton.addEventListener("click", fetchProfile);
