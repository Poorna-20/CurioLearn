const Slbtn = document.querySelector('.slbtn')
Slbtn.addEventListener('click',()=>{
    window.location.href = '/SignUp_Login/signup_login.html';
})


const youtubeApiKey = 'AIzaSyD3KfuoYiOm_e75xRjMc23_oWUp8tGYJmI';
const unsplashApiKey = 'mxkFROhG3oSGbjHwys19F09h38MKYHJBx8n6SDoo7ek';

function search() {
    const searchQuery = document.getElementById('searchInput').value;
    const wikipediaResults = document.getElementById('wikipediaResults');
    const youtubeResults = document.getElementById('youtubeResults');

    wikipediaResults.innerHTML = '';
    youtubeResults.innerHTML = '';

    // Wikipedia API
    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&format=json&origin=*`)
        .then(response => response.json())
        .then(data => {
            const searchResults = data.query.search;
            if (searchResults.length > 0) {
                searchResults.forEach(result => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<h1>${result.title}</h1><p>${result.snippet}</p>`;
                    wikipediaResults.appendChild(listItem);
                });
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

}