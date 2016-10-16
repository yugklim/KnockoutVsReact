(function (music) {
    music.onFilterChanged = function(component, selected) {
        music.reLoadDetailsAndFilters(selected);
    }

    music.reLoadDetailsAndFilters = function(selected) {

        $.ajax({
                        url: "/Music/FilterMusics",
                        type: "GET",
                        data: {
                            genreIDs: selected.genreIDs,
                            "composerID": selected.composerID, "albumID": selected.albumID, "performerID": selected.performerID, "castID": selected.castID
                        },
                        traditional: true,
                        timeout: 30000,
                        success: function(result) {
                            music.filters.setState(
                                {
                                    performers: result.Filters.Performers
                                    , genres: result.Filters.Genres
                                    , musics: result.Filters.Musics
                                    , albums: result.Filters.Albums
                                    , composers: result.Filters.Composers
                                    , casts: result.Filters.Casts

                        , selected: {
                                        performerID: result.Filters.PerformerID
                                        , genreID: result.Filters.GenreID
                                        , albumID: result.Filters.AlbumID
                                        , composerID: result.Filters.ComposerID
                                        , castID: result.Filters.CastID
                                    }
                    }
                );
            }.bind(this),
            error: function (result) {
                console.error(result);
            }
        });
    }

    music.deepCopy = function(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

}(window.music = window.music || {}));