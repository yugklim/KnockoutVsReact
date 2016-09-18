(function (musicChoice) {

    $.ajax({
        type: "GET",
        url: '/api/MusicWebAPI',
        dataType: "text",
        success: function (response)
        {
            var data = JSON.parse(response);
            musicChoice.filters = ReactDOM.render(
                <MusicFilters
                    albums = {data.Filters.Albums}
                    genres = {data.Filters.Genres}
                    casts = {data.Filters.Casts}
                    composers = {data.Filters.Composers}
                    performers = {data.Filters.Performers}

                    albumID = {data.Filters.AlbumID}
                    castID = {data.Filters.CastID}
                    composerID = {data.Filters.ComposerID}
                    genreID = {data.Filters.GenreID}
                    performerID = {data.Filters.PerformerID}
                />,
                document.getElementById('musicFiltersOnClient')
            );
        },
        error: function (error)
        {
            alert(error)
        }
    });

}(window.musicChoice = window.musicChoice || {}));