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
                alert('OK');
            }.bind(this),
            error: function (result) {
                console.error(result);
            }
        });
    }
}(window.music = window.music || {}));