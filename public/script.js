const Slbtn = document.querySelector('.slbtn')
Slbtn.addEventListener('click',()=>{
    window.location.href = '/SignUp_Login/signup_login.html';
})


const youtubeApiKey = 'AIzaSyBDgvVi_JwzUeIuObQACKDqXmgl8JQLLxo';

function search() {
    const searchQuery = document.getElementById('searchInput').value;
    const wikipediaResults = document.getElementById('wikipediaResults');
    const youtubeResults = document.getElementById('youtubeResults');

    wikipediaResults.innerHTML = '';
    youtubeResults.innerHTML = '';

    // function createWikipediaEntry(title, content) {
    //     const entryDiv = document.createElement('div');
    //     entryDiv.classList.add('wikipedia-entry');
    
    //     const titleElement = document.createElement('h2');
    //     titleElement.textContent = title;
    //     titleElement.classList.add('entry-title');
    //     entryDiv.appendChild(titleElement);
    
    //     const contentDiv = document.createElement('div');
    //     contentDiv.classList.add('entry-content');
    //     contentDiv.innerHTML = content;
    //     entryDiv.appendChild(contentDiv);
    
    //     wikipediaResults.appendChild(entryDiv);
    
    //     return entryDiv; // Return the entryDiv so it can be used to add images
    // }
    
    // Fetch text data and images from Wikipedia
    fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts|images&exintro&explaintext&generator=search&gsrsearch=${searchQuery}&format=json&origin=*`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Wikipedia API Error');
            }
            return response.json();
        })
        .then(data => {
            const pages = data.query.pages;
    
            for (const pageId in pages) {
                const page = pages[pageId];
    
                // Extract and display text data
                const extract = page.extract;
                const title = page.title;
    
                // Create a formatted Wikipedia entry
                const entryDiv = createWikipediaEntry(title, extract);
    
                // Extract and display only search-related images
                if (page.hasOwnProperty('images')) {
                    page.images.forEach(imageInfo => {
                        const imageTitle = imageInfo.title;
    
                        // Check if the image title contains the search query
                        if (imageTitle.toLowerCase().includes(searchQuery.toLowerCase())) {
                            // Fetch image details, including URL
                            fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${imageTitle}&prop=imageinfo&iiprop=url&format=json&origin=*`)
                                .then(response => response.json())
                                .then(data => {
                                    const image = Object.values(data.query.pages)[0];
                                    const imageInfo = image.imageinfo[0];
                                    const imageUrl = imageInfo.url;
    
                                    // Create an image element and display it within the corresponding entryDiv
                                    const imageElement = document.createElement('img');
                                    imageElement.src = imageUrl;
                                    imageElement.classList.add('entry-image');
                                    entryDiv.appendChild(imageElement);
                                })
                                .catch(error => console.error('Wikipedia API Error:', error));
                        }
                    });
                }
            }
        })
        .catch(error => console.error('Wikipedia API Error:', error));
    
    // ... (the rest of your code for Unsplash and YouTube)

        fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&q=${searchQuery}&part=snippet&type=video`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('YouTube API Network Error');
                }
                return response.json();
            })
            .then(data => {
                data.items.forEach(item => {
                    const videoContainer = document.createElement('div');
                    videoContainer.className = 'youtube-video';
                    videoContainer.innerHTML = `<iframe width="700" height="300" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>`;
                    youtubeResults.appendChild(videoContainer);
                });
            })
            .catch(error => console.error('YouTube API Error:', error));
    }
    // Add this code at the bottom of your script.js file
    document.getElementById('searchButton').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the form from submitting
        search();
    });