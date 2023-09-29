// Replace with your YouTube Data API key
const api_key = "AIzaSyCJYfE0QcsPeUwlaFPl2DREuU6lUhZ-dR8";

// YouTube API endpoints
const video_http = "https://www.googleapis.com/youtube/v3/videos?";
const search_http = "https://www.googleapis.com/youtube/v3/search?";
const channel_http = "https://youtube.googleapis.com/youtube/v3/channels?";

// Get references to HTML elements
let videoContainer = document.getElementById("suggestion-container");
let videoInfo = document.getElementById("info");

// Retrieve the stored video ID from local storage
const storedData = localStorage.getItem("videoId");
const channelId = JSON.parse(storedData);

// Function to fetch and play the video
async function playVideo(channelId) {
  // Play the video
  const player = document.getElementById("video-player");
  player.src = `https://www.youtube.com/embed/${channelId}?autoplay=1`;
}

// Fetch video data and channel icons
fetchData();
async function fetchData() {
  try {
    const res = await fetch(
      video_http +
        new URLSearchParams({
          key: api_key,
          part: "snippet",
          chart: "mostPopular",
          maxResults: 5,
          regionCode: "IN",
        })
    );
    const result = await res.json();

    // Iterate through video items and fetch channel icons
    for (const item of result.items) {
      await getChannelIcon(item);
    }
  } catch (error) {
    console.log(error);
  }
}

// Function to fetch channel icons
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

// Function to create video cards and append them to the videoContainer
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

  // Append video cards to the videoInfo element
  document.getElementById("info").innerHTML += `
    <a href="playPage.html" onclick="playVideo('${data.snippet.channelId}')">
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

// Call the function to play the video
playVideo(channelId);
