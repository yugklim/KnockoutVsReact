(function (music) {
    music.onFilterChanged = function(component, eventArgs) {
        alert(music.reLoadDetailsAndFilters());
    }
}(window.music = window.music || {}));