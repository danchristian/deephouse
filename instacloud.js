
  /*
  SOUNDCLOUD REQUEST
  */

  // Set the SoundCloud client ID
  SC.initialize({
    client_id: "8c4444dd864738ea8c921daf514c8da9"
  });

  // Set the SoundCloud User ID and Playlist ID
  var user_id = 2551747;
  var playlist_id = 273928921;

  // Wrap SoundCloud request in a function
  function soundcloud(tracklist) {
    // Get request from SoundCloud API
    SC.get("/users/ "+user_id+" /playlists/ "+playlist_id+" ").then(function(playlist) {
      // Loop through playlist
      playlist.tracks.forEach(function(track) {

        // Set variables as HTML elements pulled from API
        var audio = '<audio src="' +track.uri+ '/stream?client_id=8c4444dd864738ea8c921daf514c8da9" controls></audio>';
        var largeArtwork = track.artwork_url.replace('-large', '-t500x500');
        var artwork = '<img src=" '+largeArtwork+' " alt="Artwork for ' +track.title + '">'
        var title = '<h2 class="mix__title"><a href="' +track.permalink_url+ '">' +track.title+ '</a></h2>';
        var author = '<a class="mix__author link" href="' +track.user.permalink_url+ '">@' +track.user.permalink+ '</a>';

        // Create HTML list item with class names
        var listItem = document.createElement('li');
        listItem.className = 'mix';
        var listContent = document.createElement('div');
        listContent.className = 'mix__content'

        // Append variables to list item
        listItem.innerHTML = artwork + audio;
        listContent.innerHTML = author + title;
        listItem.appendChild(listContent);

        // Callback
        tracklist(listItem);
      });
    });
  }

  // Initiate callback
  soundcloud(createList);

  // Append list item to list
  function createList(response) {
    var list = document.getElementById('js-mixes');
    list.appendChild(response);
  }

  /*
  INSTAGRAM REQUEST
  */

  // Set the Instagram User ID
  var userID = "3548970132";
  // Set the Instagram Access Token
  var accessToken = "3548970132.89aa3ac.32851ec9bea645f6a48d3b1f66461c64";

  // Can't use basic XMLHttpRequest due to CORS so use JSONP
  var script = document.createElement('script');
  script.src = 'https://api.instagram.com/v1/users/' +userID+ '/media/recent?access_token=' +accessToken+ '&callback=instagram';

  // Append the script request to the DOM
  document.head.appendChild(script);

  // Wrap Instagram call in a function
  function instagram(data){

    // Loop through dataset
    for (var i = 0; i < data.data.length; i++) {

      // Create HTML list item with class names
      var listItem = document.createElement('li');
      listItem.className = 'mix video';
      var listContent = document.createElement('div');
      listContent.className = 'mix__content'

      // Set variables as HTML elements pulled from API
      var video = '<video src="' +data.data[i].videos.standard_resolution.url+ '" width="400" height="400" controls></video>'
      var author = "<a class='mix__author link' href='http://instagram.com/_u/" + data.data[i].user.username + "/'>@" + data.data[i].user.username + "</a>"
      var title = '<h2 class="mix__title"><a href="' +data.data[i].link+ '">'+data.data[i].caption.text+'</a></h2>'

      // Append variables to list item
      listItem.innerHTML = video;
      listContent.innerHTML = author + title;
      listItem.appendChild(listContent);

      // Append list item to list
      var list = document.getElementById('js-mixes');
      list.appendChild(listItem);
    }
  }

  // If audio is playing when play is hit  then pause
  document.addEventListener('play', function(e){
    var audios = document.getElementsByTagName('audio');
    for(var i = 0; i < audios.length; i++){
        if(audios[i] != e.target){
          audios[i].pause();
        }
      }
    },
    true
  );
