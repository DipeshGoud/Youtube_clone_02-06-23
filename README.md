# Youtube_clone_02-06-23

YouTube-Clone Web Application
Overview
This is a simple web application that emulates the basic functionality of YouTube, allowing users to browse and search for videos. It fetches video data from the YouTube Data API, displays video thumbnails, and provides a basic video player for viewing videos.

Features
Navigation Sidebar: The application has a navigation sidebar with links to different sections, including Home, Shorts, Subscriptions, Library, History, Watch Later, and Liked Videos.

Search: Users can search for videos using the search bar in the header. Search results are displayed in the main video container.

Responsive Design: The application is designed to be responsive, adapting to different screen sizes. The sidebar collapses on smaller screens for better usability.

Video Player: Clicking on a video thumbnail opens a video player page where users can watch the selected video. The video player uses the YouTube embedded player.

Fetch Data from YouTube API: Video data, including video thumbnails and channel information, is fetched from the YouTube Data API using JavaScript's fetch function.

Technologies Used
HTML
CSS
JavaScript
YouTube Data API

Setup
Clone the repository to your local machine.
Replace the api_key variable in index.js and playpage.js with your own YouTube Data API key.
Open index.html in a web browser to access the application's main page.

Usage
Upon opening the application, you'll see the Home page with a list of popular videos.
Use the navigation sidebar to explore different sections.
Use the search bar in the header to search for videos.
Click on a video thumbnail to watch the video in the video player page.
