﻿(function (music) {

    $.ajax({
        type: "GET",
        url: '/api/MusicWebAPI',
        dataType: "text",
        success: function (response)
        {
            var data = JSON.parse(response);
            music.filters = ReactDOM.render(
                <MusicFilters
                    albums = {data.Filters.Albums}
                    genres = {data.Filters.Genres}
					genresFound = {data.Filters.GenresFound}
                    casts = {data.Filters.Casts}
                    composers = {data.Filters.Composers}
                    performers = {data.Filters.Performers}
                    musics = {data.Filters.Musics}

                    albumID = {data.Filters.AlbumID}
                    castID = {data.Filters.CastID}
                    composerID = {data.Filters.ComposerID}
                    performerID = {data.Filters.PerformerID}
                />,
                document.getElementById('musicFiltersOnClient')
            );
        },
        error: function (error) {
            console.log(error);
        }
    });

}(window.music = window.music || {}));