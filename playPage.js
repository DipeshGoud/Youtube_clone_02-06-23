const api_key = "AIzaSyCJYfE0QcsPeUwlaFPl2DREuU6lUhZ-dR8"; // Replace with your API key
const video_http = "https://www.googleapis.com/youtube/v3/videos?";
const search_http = "https://www.googleapis.com/youtube/v3/search?";
const channel_http = "https://youtube.googleapis.com/youtube/v3/channels?";
let videoContainer = document.getElementById("suggestion-container");
let videoInfo = document.getElementById("info");

const storedData = localStorage.getItem('id');
const channelId = JSON.parse(storedData);

// Function to fetch and play the video
async function playVideo(channelId) {
    try {
        // Make API call to retrieve the videos uploaded by the channel
        const res = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${channelId}&maxResults=1&key=${api_key}`
        );
        const data = await res.json();

        // Extract the video ID from the response
        const videoId = data.items[0].id.videoId;

        // Play the video
        const player = document.getElementById("video-player");
        player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;



    } catch (error) {
        console.log(error);
    }
}

fetchData();
async function fetchData() {
    try {
        const res = await fetch(video_http + new URLSearchParams({
            key: api_key,
            part: 'snippet',
            chart: 'mostPopular',
            maxResults: 5,
            regionCode: 'IN'
        }));
        const result = await res.json();

        for (const item of result.items) {
            await getChannelIcon(item);
        }
    } catch (error) {
        console.log(error);
    }
}

const getChannelIcon = async (video_data) => {
    try {
        const res = await fetch(channel_http + new URLSearchParams({
            key: api_key,
            part: 'snippet',
            id: video_data.snippet.channelId
        }));
        const data = await res.json();

        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    } catch (error) {
        console.log(error);
    }
}

let makeVideoCard = (data) => {
    videoContainer.innerHTML += `
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
}

// Call the function to play the video
playVideo(channelId);
