const Slbtn = document.querySelector('.slbtn')
Slbtn.addEventListener('click',()=>{
    window.location.href = '/SignUp_Login/signup_login.html';
})




const youtubeApiKey = 'AIzaSyD3KfuoYiOm_e75xRjMc23_oWUp8tGYJmI';
const unsplashApiKey = 'mxkFROhG3oSGbjHwys19F09h38MKYHJBx8n6SDoo7ek';


// function search() {
//     const searchQuery = document.getElementById('searchInput').value;
//     const wikipediaResults = document.getElementById('wikipediaResults');
//     wikipediaResults.innerHTML = '';
//     const unsplashResults = document.getElementById('unsplashResults');
//     unsplashResults.innerHTML = '';
//     const youtubeResults = document.getElementById('youtubeResults');
//     youtubeResults.innerHTML = '';
//     fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&format=json&origin=*`)
//         .then(response => {
//             if (response.status !== 200) {
//                 throw new Error('Wikipedia API Error');
//             }
//             return response.json();
//         })
//         .then(data => {
//             const searchResults = data.query.search;
//             if (searchResults.length > 0) {
//                 const firstResult = searchResults[0];
//                 const listItem = document.createElement('li');
//                 listItem.textContent = firstResult.title;
//                 fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=${firstResult.title}&format=json&origin=*`)
//                     .then(response => response.json())
//                     .then(data => {
//                         const pageId = Object.keys(data.query.pages)[0];
//                         const page = data.query.pages[pageId];
//                         const extract = page.extract;
//                         const extractDiv = document.createElement('div');
//                         extractDiv.innerHTML = extract;
//                         listItem.appendChild(extractDiv);
//                     })
//                     .catch(error => console.error('Wikipedia API Error:', error));

//                 wikipediaResults.appendChild(listItem);
//             } else {
//                 const noResultsItem = document.createElement('li');
//                 noResultsItem.textContent = 'No Wikipedia results found.';
//                 wikipediaResults.appendChild(noResultsItem);
//             }
//         })
//         .catch(error => console.error('Wikipedia API Error:', error));
//     fetch(`https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${unsplashApiKey}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Unsplash API Network Error');
//             }
//             return response.json();
//         })
//         .then(data => {
//             data.results.forEach(result => {
//                 const image = document.createElement('img');
//                 image.src = result.urls.small;
//                 unsplashResults.appendChild(image);
//             });
//         })
//         .catch(error => console.error('Unsplash API Error:', error));
//     fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&q=${searchQuery}&part=snippet&type=video`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('YouTube API Network Error');
//             }
//             return response.json();
//         })
//         .then(data => {
//             data.items.forEach(item => {
//                 const videoContainer = document.createElement('div');
//                 videoContainer.className = 'youtube-video';
//                 videoContainer.innerHTML = `<iframe width="300" height="200" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>`;
//                 youtubeResults.appendChild(videoContainer);
//             });
//         })
//         .catch(error => console.error('YouTube API Error:', error));
// }


function search() {
    const searchQuery = document.getElementById('searchInput').value;
    const wikipediaResults = document.getElementById('wikipediaResults');
    const youtubeResults = document.getElementById('youtubeResults');
    const unsplashResults = document.getElementById('unsplashResults');

    wikipediaResults.innerHTML = '';
    youtubeResults.innerHTML = '';
    unsplashResults.innerHTML = '';

    // Wikipedia API
    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&format=json&origin=*`)
        .then(response => response.json())
        .then(data => {
            const searchResults = data.query.search;
            if (searchResults.length > 0) {
                const firstResult = searchResults[0];
                console.log("Data:", firstResult)
                const listItem = document.createElement('li');
                listItem.innerHTML = `<h1>${firstResult.title}</h1><p>${firstResult.snippet}</p>`;
                wikipediaResults.appendChild(listItem);
            } else {
                const noResultsItem = document.createElement('li');
                noResultsItem.textContent = 'No Wikipedia results found.';
                wikipediaResults.appendChild(noResultsItem);
            }
        })
        .catch(error => {
            console.error('Wikipedia API Error:', error);
            const errorItem = document.createElement('li');
            errorItem.textContent = 'Error fetching Wikipedia data.';
            wikipediaResults.appendChild(errorItem);
        });

    // YouTube API
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&q=${searchQuery}&part=snippet&type=video`)
        .then(response => response.json())
        .then(data => {
            data.items.forEach(item => {
                const videoContainer = document.createElement('div');
                videoContainer.className = 'youtube-video';
                videoContainer.innerHTML = `<iframe width="300" height="200" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>`;
                youtubeResults.appendChild(videoContainer);
            });
        })
        .catch(error => {
            console.error('YouTube API Error:', error);
            const errorItem = document.createElement('div');
            errorItem.textContent = 'Error fetching YouTube data.';
            youtubeResults.appendChild(errorItem);
        });

    // Unsplash API
    fetch(`https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${unsplashApiKey}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(result => {
                const image = document.createElement('img');
                image.src = result.urls.small;
                unsplashResults.appendChild(image);
            });
        })
        .catch(error => {
            console.error('Unsplash API Error:', error);
            const errorItem = document.createElement('div');
            errorItem.textContent = 'Error fetching Unsplash data.';
            unsplashResults.appendChild(errorItem);
        });
}


