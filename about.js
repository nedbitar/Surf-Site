// Array of video URLs (replace these with your actual video URLs)
const videos = [
    'https://example.com/video1.mp4',
    'https://example.com/video2.mp4',
    'https://example.com/video3.mp4'
];

const videoContainer = document.getElementById('video-container');

// Function to create video elements
function createVideoElement(videoUrl, index) {
    const videoItem = document.createElement('div');
    videoItem.className = 'video-item';

    const video = document.createElement('video');
    video.src = videoUrl;
    video.controls = true;

    const caption = document.createElement('p');
    caption.textContent = `Surf Video ${index + 1}`;

    videoItem.appendChild(video);
    videoItem.appendChild(caption);
    videoContainer.appendChild(videoItem);
}

// Create video elements for each video URL
videos.forEach((videoUrl, index) => {
    createVideoElement(videoUrl, index);
});

// Background video fallback
document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('bg-video');
    
    video.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
    });

    video.addEventListener('error', (e) => {
        console.error('Error loading video:', e);
    });

    // Check video status after a short delay
    setTimeout(() => {
        if (video.readyState === 0) {
            console.log('Video failed to load. Using fallback background.');
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')";
        }
    }, 3000);
});