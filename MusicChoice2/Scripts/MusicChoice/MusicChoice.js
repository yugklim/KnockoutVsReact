(function (music) {
    music.onFilterChanged = function(component, selected) {
        music.reLoadDetailsAndFilters(selected);
    }

    music.reLoadDetailsAndFilters = function(selected) {
        $.ajax({
            url: "/Music/FilterMusics?genreID=" + selected.genreID + "&composerID=" + selected.composerID + "&castID=" + selected.castID + "&albumID=" + selected.albumID + "&performerID=" + selected.performerID,
            type: "GET",
            processData: false,
            contentType: "application/json",
            timeout: 30000,
            success: function(result) {
                music.filters.setState(
                    {
                        performers: result.Filters.Performers
                        , genres: result.Filters.Genres
                        //, musics: this.props.musics
                        //, albums: this.props.albums
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