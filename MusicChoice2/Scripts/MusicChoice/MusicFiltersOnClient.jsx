(function (musicChoice) {

    $.ajax({
        type: "GET",
        url: this.props.url + '?' + buildQueryString(cloneOfStateLoadParameters),
        dataType: "text",
        success: function (response)
        {
            this.onLoadFinished();
            var data = JSON.parse(response);
            this.setState({
                data: data,
                loadParameters: cloneOfStateLoadParameters
            });
            this.tryToJumpToId();
            this.raiseEvent(this.props.onDataLoadedOK, this.state.loadParameters);
        }.bind(this),
        error: function ()
        {
            this.onLoadFinished();
            if (this.props.loadErrorHandler){
                this.props.loadErrorHandler(xhr);
            }
            this.raiseEvent(this.props.onDataLoadedFault, this.state.loadParameters);
        }.bind(this)
    });

    musicChoice.filters = ReactDOM.render(
        <MusicFilters


            onFilterChanged = "pipeline.onFilterChanged"
        />,
        document.getElementById('musicFiltersOnClient')
    );

}(window.musicChoice = window.musicChoice || {}));