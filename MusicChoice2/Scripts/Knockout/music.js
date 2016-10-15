$(function() {

    var musicViewModel = {
        genres: ko.observableArray(),
        genresFound: ko.observableArray(),
        performers: ko.observableArray(),
        composers: ko.observableArray(),
        albums: ko.observableArray(),
        casts: ko.observableArray(),
        musics: ko.observableArray()
    };

    mapServerData = function(data) {
        if (!data) return;
        musicViewModel.genres(data.Filters.Genres);
        musicViewModel.genresFound(data.Filters.GenresFound);
        musicViewModel.performers( data.Filters.Performers);
        musicViewModel.composers(data.Filters.Composers);
        musicViewModel.albums(data.Filters.Albums);
        musicViewModel.casts(data.Filters.Casts);
        musicViewModel.musics(data.Filters.Musics);
    },

    genresChanged = function (data, event) {
        $.ajax({
            url: "/Music/FilterMusics",
            type: "GET",
            data: {
                genreIDs: ko.toJS(musicViewModel.genresFound),
                "composerID": null,
                "albumID": null,
                "performerID": null,
                "castID": null
            },
            traditional: true,
            timeout: 30000,
            success: function (data) {
                mapServerData(data);
            }
        });
    }

    $.getJSON("/api/MusicWebAPI", function (data) {
        mapServerData(data);
        ko.applyBindings(musicViewModel);
    });

    
});