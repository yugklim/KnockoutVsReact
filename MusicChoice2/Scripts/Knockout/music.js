$(function() {

    var musicViewModel = {
        performers: ko.observableArray(),
        composers: [],
        albums: [],
        casts: []
    };

    $.getJSON("/api/MusicWebAPI", function (data) {
        musicViewModel.performers = data.Filters.Performers;
        musicViewModel.composers = data.Filters.Composers;
        musicViewModel.albums = data.Filters.Albums;
        musicViewModel.casts = data.Filters.Casts;

        ko.applyBindings(musicViewModel);
    });

    
});