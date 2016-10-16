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
        musicViewModel.performers.unshift({PerformerID: -1, Performer: 'All'});
        musicViewModel.composers(data.Filters.Composers);
        musicViewModel.composers.unshift({ComposerID: -1, Composer: 'All'});
        musicViewModel.albums(data.Filters.Albums);
        musicViewModel.albums.unshift({AlbumID: -1, Album: 'All'});
        musicViewModel.casts(data.Filters.Casts);
        musicViewModel.casts.unshift({CastID: -1, Cast: 'All'});
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