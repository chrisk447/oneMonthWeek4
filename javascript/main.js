/* 1. Search */

var UI = {};

UI.EnterPress = function(e) {
    var input = document.querySelector(".input-search").value;
    // if the key ENTER is pressed...
    if (e.which === 13) {
        SoundCloudAPI.getTrack(input);
    }
};

UI.SubmitClick = function() {
    var input = document.querySelector(".input-search").value;
    // if the key ENTER is pressed...
    SoundCloudAPI.getTrack(input);
};

UI.clear = function(elementID) {
    document.querySelector(".js-search-results").innerHTML = '';
    document.querySelector(elementID).value = '';
    document.querySelector('.js-playlist').innerHTML = '';
    localStorage.clear();
};

document.querySelector(".js-search").addEventListener('keyup', UI.EnterPress)
document.querySelector(".js-submit").addEventListener('click', UI.SubmitClick)

/* 2. Query Soundcloud api */

var SoundCloudAPI = {};

SoundCloudAPI.init = function() {
    SC.initialize({
    client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });
};

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(inputValue) {
// find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', {
        q: inputValue, 
        license: 'cc-by-sa'
    }).then(function(tracks) {
        SoundCloudAPI.renderTracks(tracks);
    });
};

// SoundCloudAPI.getTrack("baby shark")


/* 3. Display the cards */
SoundCloudAPI.renderTracks = function(tracks) {

    tracks.forEach(track => {
        // card
        var card = document.createElement('div');
        card.classList.add('card')

        // image
        var imageDiv = document.createElement('div');
        imageDiv.classList.add('image')

        var image_img = document.createElement('img');
        image_img.classList.add('image_img');
        image_img.src = track.artwork_url;

        imageDiv.appendChild(image_img)

        // content
        var content = document.createElement('div');
        content.classList.add('content');

        var header = document.createElement('div');
        header.classList.add('header');
        header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">'+ track.title + '</a>';
        content.appendChild(header)

        // button
        var buttonDiv = document.createElement('div');
        buttonDiv.classList.add("ui", "bottom", "attached", "button", "js-button");
        var i = document.createElement('i')
        i.classList.add('add', 'icon')
        var buttonSpan = document.createElement('span');
        buttonSpan.innerHTML = 'Add to Playlist'
        buttonDiv.appendChild(i);
        buttonDiv.appendChild(buttonSpan)

        // add event listener
        buttonDiv.addEventListener('click', function(trackUrl) {
            SoundCloudAPI.getEmbed(track.permalink_url);
        })

        var searchResults = document.querySelector('.js-search-results');
        searchResults.appendChild(card)

        card.appendChild(imageDiv);
        card.appendChild(content);
        card.appendChild(buttonDiv);
    });
    
}

/* 4. Add to playlist and play */
SoundCloudAPI.getEmbed = function(trackUrl) {
    console.log("I'm in getembed")
    SC.oEmbed(trackUrl, {
        auto_play: true
    })
    .then(function(embed){
        console.log('oEmbed response: ', embed);
        var sideBar = document.querySelector('.js-playlist')

        var box  = document.createElement('div');
        box.innerHTML = embed.html;

        // Inserting 'box' before sidebar.firstChild
        sideBar.insertBefore(box, sideBar.firstChild);

        /* 5. Local Storage - localStorage storage */
        localStorage.setItem("key", sideBar.innerHTML);
    });
}

/* 5. Local Storage - localStorage retrieval */
var sideBar = document.querySelector('.js-playlist')
sideBar.innerHTML = localStorage.getItem("key", sideBar);

