var MusicFilters = React.createClass({
// instantiation methods in order:
    getDefaultProps: function() {
        return {
            defaultLoadParameters : {}
        }
    },

    getInitialState: function() {
        return {
              performers: this.props.performers
            , genres: this.props.genres
            , musics: this.props.musics
            , albums: this.props.albums
            , composers: this.props.composers
            , concerts: this.props.concerts
            , selected: {
                  performerID: this.props.performerID
                , genreID: this.props.genreID
                , musicID: this.props.musicID
                , albumID: this.props.albumID
                , composerID: this.props.composerID
                , concertID: this.props.concertID
            }
        }
    },

    componentWillMount: function() {
    },

    render: function() {
        var onFilterChanged = this.onFilterChanged;
        var onResetFilters = this.onResetFilters;
        var musicFilters = this;

        var renderDropDown = function(title, id, values, selectedValue, onChangeHandler, optionIndex, optionValue) {
            return  (values !== undefined && values !== null)? <div>{title + ':'}
                <select id={id} value={selectedValue} onChange={onChangeHandler}>
                    {
                        values.map(function (val, idx) {
                                return <option key={idx} value={val[optionIndex]}>{val[optionValue]}</option>
                            })
                        }
                </select>
            </div>:<div>No data</div>
        };

        return (this.state.genres !== undefined && this.state.genres !== null)?
        <div>AA
            <div style={{"float":"left"}}>Genres:
                {
                    this.state.genres.map(function (val, idx) {
                        return <div key={idx}>{val["Genre"]}
                            <input checked={musicFilters.areNullablesEqual(val["GenreID"], musicFilters.state.selected.genreID)} type="radio" name="genres" value={val["Genre1"]||null} onChange={onFilterChanged.bind(musicFilters, 'genreID')}/>
                            {val["Genre1"]} ({val["Musics"]})
                        </div>
                        })
                    }
            </div>
            {
                renderDropDown("Performers", "performers", this.state.performers, musicFilters.state.selected.performerID, null, "PerformerID", "Performer1" )
            }
            {
                renderDropDown("Composers", "composers", this.state.composers, musicFilters.state.selected.composerID, null, "ComposerID", "Composer1" )
            }
            {
                renderDropDown("Albums", "albums", this.state.albums, musicFilters.state.selected.albumID, null, "AlbumID", "Album1" )
            }

            <div>
                <input type="button" value="Reset Filters" onClick={onResetFilters.bind(musicFilters)}/>
            </div>
        </div>:
            <div>No data</div>;
    },

    componentDidMount: function() {
        this.selected = {
            introducerID: this.props.introducerID
            , companyStatusTypeID: null
            , countryID: null
            , dealerID: null
            , page: 1
        };
    },

// end of instantiation methods
// Lifetime methods in order:

    componentWillReceiveProps: function() {
        return;
    },

    shouldComponentUpdate: function() {
        return true;
    },

    componentWillUpdate: function() {
        return;
    },

    componentDidUpdate: function() {
        return;
    },

    componentWillUnmount: function() {
    },

// end of lifetime methods
//////
    raiseEvent: function(eventHandler, eventArgs) {
        if (eventHandler) {
            if (typeof(eventHandler) === 'string') {
                eval(eventHandler(this, eventArgs));
            }
            else {
                eventHandler(this, eventArgs);
            }
        }
    },

    onFilterChanged: function(selectedParameter, e) {
        var selected = _.clone(this.state.selected);
        selected[selectedParameter] = parseInt($(e.currentTarget).val()) || null;
        this.setState(
            {selected: selected}
            , this.raiseEvent.bind(this, eval(this.props.onFilterChanged))
        );
    },

    onResetFilters: function() {
        this.setState(
            { selected: {
                companyStatusTypeID: null
                , introducerID: null
                , countryID: null
                , dealerID: null
                , sellCurrencyID: null
                , buyCurrencyID: null
                , industryCategorizationID: null }
            },
            this.raiseEvent.bind(this, eval(this.props.onFilterChanged))
        );
    },

    areNullablesEqual: function(first, second) {
        return first === second || (first === null && second === null);
    }

});

