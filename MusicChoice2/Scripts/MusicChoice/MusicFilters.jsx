﻿var MusicFilters = React.createClass({
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
            , genresFound: this.props.genresFound
            , musics: this.props.musics
            , albums: this.props.albums
            , composers: this.props.composers
            , casts: this.props.casts
            , selected: {
                  performerID: this.props.performerID
                , musicID: this.props.musicID
                , albumID: this.props.albumID
                , composerID: this.props.composerID
                , castID: this.props.castID
            }
        }
    },

    componentWillMount: function() {
    },

    render: function() {
        var onFilterChanged = this.onFilterChanged;
        var onResetFilters = this.onResetFilters;
        var musicFilters = this;
        var genresContains = function(genreID) {
            var contains = false;
            musicFilters.state.genresFound.forEach(function (g) {
                if (g.GenreID == genreID) {
                    contains = true;
                }
            });
            return contains;
        };

        var renderDropDown = function(title, id, values, selectedValue, optionIndex, optionValue, selectedParameter) {
            return  (values !== undefined && values !== null)? <div>{title + ':'}
                <select id={id} value={selectedValue || -1} onChange={onFilterChanged.bind(musicFilters, selectedParameter)}>
                    {
                        values.map(function (val, idx) {
                                return <option key={idx} value={val[optionIndex]}>{val[optionValue]}</option>
                            })
                        }
                </select>
            </div>:<div>No data</div>
        };

        return (this.state.genres !== undefined && this.state.genres !== null)?
        <div>
            <div>Genres:
                {
                    this.state.genres.map(function (val, idx) {
                        return <div key={idx}>{val["Genre"]}
                            <input checked={genresContains(val["GenreID"])} type="checkbox"  value={val["GenreID"]||null} onChange={onFilterChanged.bind(musicFilters, 'genreID')}/>
                            {val["Genre"]} ({val["Musics"]})
                        </div>
                        })
                    }
            </div>
            {
                renderDropDown("Performers", "performers", this.state.performers, musicFilters.state.selected.performerID,  "PerformerID", "Performer",  "performerID" )
            }
            {
                renderDropDown("Composers", "composers", this.state.composers, musicFilters.state.selected.composerID, "ComposerID", "Composer",  "composerID" )
            }
            {
                renderDropDown("Albums", "albums", this.state.albums, musicFilters.state.selected.albumID, "AlbumID", "Album",  "albumID" )
            }
            {
                renderDropDown("Casts", "casts", this.state.casts, musicFilters.state.selected.castID, "CastID", "Cast", "castID")
            }

            <div>
                <input type="button" value="Reset Filters" onClick={onResetFilters.bind(musicFilters)}/>
            </div>
        </div>:
            <div>No data</div>;
    },

    componentDidMount: function() {
        //this.selected = {
        //    introducerID: this.props.introducerID
        //    , companyStatusTypeID: null
        //    , countryID: null
        //    , dealerID: null
        //    , page: 1
        //};
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
            , this.raiseEvent.bind(this, eval(this.props.onFilterChanged), selected)
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

