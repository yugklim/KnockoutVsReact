(function (music) {
    music.onFilterChanged = function(component, selected) {
        music.reLoadDetailsAndFilters(selected);
    }

    music.reLoadDetailsAndFilters = function(selected) {
        //$.ajax({
        //    url: '/Music/FilterMusics',
        //    type: 'GET',
        //    data: {
        //        genreIDs: [1, 2, 3],
        //        "composerID": 1, "albumID": 2, "performerID": 3, "castID": 4
        //    },
        //    traditional: true,
        //    success: function (result) {
        //        console.log(JSON.stringify(result));
        //    }
        //});
        //return;
        //
        //$.get("/Music/FilterMusics", ({"composerID": 1, "albumID": 2, "performerID": 3, "castID": 4, "genreIDs": "[1,2]"}));
        //return;
        $.ajax({
                        url: "/Music/FilterMusics",
                        type: "GET",
                        data: {
                            genreIDs: selected.genreIDs,
                            "composerID": selected.composerID, "albumID": selected.albumID, "performerID": selected.performerID, "castID": selected.castID
                        },
                        traditional: true,
                        //processData: false,
                        //contentType: "application/json",
                        timeout: 30000,
                        success: function(result) {
                            music.filters.setState(
                                {
                                    performers: result.Filters.Performers
                                    , genres: result.Filters.Genres
                                    , musics: result.Filters.musics
                                    , albums: result.Filters.albums
                                    , composers: result.Filters.Composers
                                    , casts: result.Filters.Casts

                        , selected: {
                                        performerID: result.Filters.PerformerID
                                        , genreID: result.Filters.GenreID
                                        //, musicID: this.props.musicID
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