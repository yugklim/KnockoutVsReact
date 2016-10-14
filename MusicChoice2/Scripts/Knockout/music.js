$(function() {

    var musicViewModel = {
        genres: [],
        genresFound: ko.observableArray(),
        performers: ko.observableArray(),
        composers: [],
        albums: [],
        casts: []
    };

    $.getJSON("/api/MusicWebAPI", function (data) {
        musicViewModel.genres = data.Filters.Genres;
        musicViewModel.genresFound = data.Filters.GenresFound;
        musicViewModel.performers = data.Filters.Performers;
        musicViewModel.composers = data.Filters.Composers;
        musicViewModel.albums = data.Filters.Albums;
        musicViewModel.casts = data.Filters.Casts;

        ko.applyBindings(musicViewModel);

    });

    
});