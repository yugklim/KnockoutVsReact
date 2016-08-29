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

        var renderDropDown = function(title, id, selectedValue, onChangeHandler, optionIndex, optionValue) {
            return  <div>{title + ':'}
                <select id={id} value={selectedValue} onChange={onChangeHandler}>
                    {
                        values.map(function (val, idx) {
                                return <option key={idx} value={val[optionIndex]}>{val[optionValue]}</option>
                            })
                        }
                </select>
            </div>
        };

        return <div>
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
            <div>Performer:
                <select id="performers" value={musicFilters.state.selected.performerID||-1} value={musicFilters.state.selected.performerID||-1} onChange={onFilterChanged.bind(musicFilters, 'performerID')}>
                    {
                        this.state.performers.map(function (val, idx) {
                            return <option key={idx} value={val["performerID"]}>{val["Performer1"]}
                            </option>
                            })
                        }
                </select>
            </div>
            <div>Composers:
                <select id="composers" value={musicFilters.state.selected.composerID||-1} onChange={onFilterChanged.bind(musicFilters, 'composerID')}>
                    {
                        this.state.composers.map(function (val, idx) {
                            return <option key={idx} value={val["ComposerID"]}>{val["Composer1"]}
                            </option>
                            })
                        }
                </select>
            </div>


            <div>
                <input type="button" value="Reset Filters" onClick={onResetFilters.bind(musicFilters)}/>
            </div>
        </div>;
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

