// Get references to HTML elements
let sidebar = document.querySelector(".side-bar");
let menu = document.querySelector(".toggle-btn");
let videoContainer = document.querySelector(".video-container");
let searchContainer = document.querySelector(".search-container");
let videoId = "";

// Toggle sidebar and video/search containers when menu button is clicked
menu.onclick = function () {
  sidebar.classList.toggle("small-sidebar");
  videoContainer.classList.toggle("full-container");
  searchContainer.classList.toggle("full-container");
};

// YouTube API Key and endpoints
let api_key = "AIzaSyCJYfE0QcsPeUwlaFPl2DREuU6lUhZ-dR8"; // Replace with your YouTube Data API key
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let search_http = "https://www.googleapis.com/youtube/v3/search?";
let channel_http = "https://youtube.googleapis.com/youtube/v3/channels?";

// Fetch popular videos data on page load
fetchData();
async function fetchData() {
  try {
    const res = await fetch(
      video_http +
        new URLSearchParams({
          key: api_key,
          part: "snippet",
          chart: "mostPopular",
          maxResults: 50,
          regionCode: "IN",
        })
    );
    const result = await res.json();

    // Iterate through popular videos and fetch channel icons
    for (const item of result.items) {
      await getChannelIcon(item);
    }
  } catch (error) {
    console.log(error);
  }
}

// Function to fetch channel icons for videos
const getChannelIcon = async (video_data) => {
  try {
    const res = await fetch(
      channel_http +
        new URLSearchParams({
          key: api_key,
          part: "snippet",
          id: video_data.snippet.channelId,
        })
    );
    const data = await res.json();

    // Store channel thumbnail URL in video_data
    video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;

    // Create video cards and append them to the videoContainer
    makeVideoCard(video_data);
  } catch (error) {
    console.log(error);
  }
};

// Function to create video cards
let makeVideoCard = (data) => {
  videoContainer.innerHTML += `
    <a href="playPage.html" onclick="playVideo('${data.id.videoId}')">
    <div class="video">
        <div class="thumbnail">
            <img src="${data.snippet.thumbnails.high.url}" class="thumbnail-img" alt="img">
        </div>
    <div class="content">
        <img src="${data.channelThumbnail}" class="channel-icon">
        <div class="info">
            <h4 class="title">
              ${data.snippet.title}
            </h4>
            <p class="channel-name">
              ${data.snippet.channelTitle}
            </p>
          </div>
        </div>
    </div>
    </a>`;
};

// Function to handle search
const handleSearch = async () => {
  const searchInput = document.querySelector(".search-bar");
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== "") {
    videoContainer.innerHTML = ""; // Clear existing video content

    try {
      const res = await fetch(
        search_http +
          new URLSearchParams({
            key: api_key,
            part: "snippet",
            q: searchTerm,
            maxResults: 5,
            regionCode: "IN",
          })
      );
      const result = await res.json();

      videoContainer.innerHTML = ""; // Clear existing video content
      searchContainer.innerHTML = ""; // Clear existing search content

      // Iterate through search results and fetch channel icons
      for (const item of result.items) {
        await searchChannelIcon(item);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

// Function to fetch channel icons for search results
const searchChannelIcon = async (video_data) => {
  try {
    const res = await fetch(
      channel_http +
        new URLSearchParams({
          key: api_key,
          part: "snippet",
          id: video_data.snippet.channelId,
        })
    );
    const data = await res.json();

    // Store channel thumbnail URL in video_data
    video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;

    // Create search result cards and append them to the searchContainer
    makeSearchCard(video_data);
  } catch (error) {
    console.log(error);
  }
};

// Function to create search result cards
let makeSearchCard = (data) => {
  searchContainer.innerHTML += `
    <a href="playPage.html" onclick="playVideo('${data.snippet.channelId}')">
    <div class="search-video" id="${data.snippet.id}">
        <div class="search-thumbnail">
            <img src="${data.snippet.thumbnails.high.url}" class="thumbnail-img" alt="img">
        </div>
      <div class="search-content">
      <h4 class="search-title">${data.snippet.title}</h4>
        <div class="search-info"> 
        <img src="${data.channelThumbnail}" class="channel-icon">
            <p class="search-channel-name">
              ${data.snippet.channelTitle}
            </p>
        </div>
      </div>
    </div>
    </a>`;
};

// Attach the search function to the search button
let searchButton = document.querySelector(".search-btn");
searchButton.addEventListener("click", handleSearch);

// Attach the search function to the Enter key in the search input
let searchInput = document.querySelector(".search-bar");
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

// Function to handle window resize event
function handleWindowResize() {
  const windowWidth = window.innerWidth;
  const threshold = 1200; // Adjust the threshold as needed

  // Check if the window width is below the threshold
  if (windowWidth < threshold) {
    sidebar.classList.add("small-sidebar");
    videoContainer.classList.add("full-container");
    searchContainer.classList.add("full-container");
  } else {
    sidebar.classList.remove("small-sidebar");
    videoContainer.classList.remove("full-container");
    searchContainer.classList.remove("full-container");
  }
}

// Attach the window resize event listener and call the function
window.addEventListener("resize", handleWindowResize);
handleWindowResize();

// Function to store the selected video ID in localStorage when clicked
function playVideo(videoId) {
  // Store the selected video ID in localStorage
  localStorage.setItem("videoId", JSON.stringify(videoId));
}
