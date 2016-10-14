$(function() {

    var musicViewModel = {
        genres: ko.observableArray(),
        genresFound: ko.observableArray(),
        performers: ko.observableArray(),
        composers: ko.observableArray(),
        albums: ko.observableArray(),
        casts: ko.observableArray(),

        genresChanged: function (data, event) {
            $.ajax({
                url: "/Music/FilterMusics",
                type: "GET",
                data: {
                    genreIDs: musicViewModel.genresFound,
                    "composerID": null,
                    "albumID": null,
                    "performerID": null,
                    "castID": null
                },
                traditional: true,
                timeout: 30000,
                success: function (data) {
                    musicViewModel.genres = data.Filters.Genres;
                    musicViewModel.genresFound = data.Filters.GenresFound;
                    musicViewModel.performers = data.Filters.Performers;
                    musicViewModel.composers(data.Filters.Composers);
                    musicViewModel.albums = data.Filters.Albums;
                    musicViewModel.casts = data.Filters.Casts;
                }
            });
        }
    };

    $.getJSON("/api/MusicWebAPI", function (data) {
        musicViewModel.genres = data.Filters.Genres;
        musicViewModel.genresFound = data.Filters.GenresFound;
        musicViewModel.performers = data.Filters.Performers;
        musicViewModel.composers(data.Filters.Composers);
        musicViewModel.albums = data.Filters.Albums;
        musicViewModel.casts = data.Filters.Casts;

        ko.applyBindings(musicViewModel);

    });

    
});