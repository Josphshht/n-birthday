document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('content-container');

    // IMPORTANT: Set your friend's birthday month and day here (MM-DD format)
    const BIRTHDAY_MONTH_DAY = '07-25'; // Example: July 25th

    const today = new Date();
    const currentMonthDay = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    if (currentMonthDay === BIRTHDAY_MONTH_DAY) {
        // It's the birthday! Play the video.
        const video = document.createElement('video');
        video.id = 'birthday-video';
        video.src = 'video/birthday.mp4';
        video.autoplay = true;
        video.loop = false; // Play once
        video.muted = true; // Start muted to allow autoplay without user interaction in some browsers
        video.playsInline = true; // Important for iOS autoplay

        // Optional: Unmute after a brief delay or user interaction if needed, though requirement is no controls.
        // For true autoplay without interaction, muted is the most reliable.

        video.addEventListener('ended', () => {
            // Optional: You could do something here after the video ends, but requirement is just to play once.
            // For example, fade to black or display a static message.
        });

        contentContainer.appendChild(video);

        // For some browsers, especially mobile, a user gesture might still be needed
        // to autoplay sound. We'll try to play it programmatically.
        video.play().catch(error => {
            console.log('Autoplay prevented. User interaction might be needed.', error);
            // Fallback for browsers that block autoplay even when muted,
            // though for full screen background video, muted is usually enough.
        });

    } else {
        // Not the birthday, display a random door image.
        const TOTAL_DOOR_IMAGES = 30; // Assuming door1.jpg to door30.jpg

        let selectedDoorIndex;
        const lastVisitDate = localStorage.getItem('lastVisitDate');
        const cachedDoorIndex = localStorage.getItem('cachedDoorIndex');

        // Check if it's the same day and a door was already cached
        if (lastVisitDate === currentMonthDay && cachedDoorIndex !== null) {
            selectedDoorIndex = parseInt(cachedDoorIndex, 10);
        } else {
            // Generate a new random index if it's a new day or no cache
            selectedDoorIndex = Math.floor(Math.random() * TOTAL_DOOR_IMAGES) + 1;
            // Cache the selected door and today's date
            localStorage.setItem('cachedDoorIndex', selectedDoorIndex);
            localStorage.setItem('lastVisitDate', currentMonthDay);
        }

        const image = document.createElement('img');
        image.id = 'door-image';
        image.src = `images/door${selectedDoorIndex}.jpg`;
        image.alt = 'A mysterious door';

        contentContainer.appendChild(image);
    }
});
