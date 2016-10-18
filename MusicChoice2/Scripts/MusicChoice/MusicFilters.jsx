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
        var musicFilters = this;
        var genresContains = function(genreID) {
            var contains = false;
            musicFilters.state.genresFound.forEach(function (g) {
                if (g == genreID) {
                    contains = true;
                }
            });
            return contains;
        };
        var onGenreChanged = this.onGenreChanged;

        var renderDropDown = function(title, id, values, selectedValue, optionIndex, optionValue, selectedParameter, labelStyle) {
            return  (values !== undefined && values !== null)? <div>
                <label style={labelStyle}>{title + ':'}</label>
                <select id={id} value={selectedValue || -1} onChange={onFilterChanged.bind(musicFilters, selectedParameter)}>
                    <option key={-1} value={-1}>All</option>
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
            <div>
                <div>
                    <div className="genres" id="genres">
                        <div style={{"font-weight":"bold"}}>Genres:</div>
                        {
                            this.state.genres.map(function (val, idx) {
                                return <div key={idx}>
                                    <input checked={genresContains(val["GenreID"])} type="checkbox"  value={val["GenreID"]||null} onChange={onGenreChanged.bind(musicFilters)}/>
                                    <span className="js-genres">{val["Genre"]}</span>
                                </div>
                                })
                            }
                    </div>
                    <div className="selects">
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
                            renderDropDown("Casts", "casts", this.state.casts, musicFilters.state.selected.castID, "CastID", "Cast", "castID", {clear:"both"})
                            }
                    </div>
                </div>

                <div className="musicContainer">
                    <div className="musics">
                        <label>Musics:</label><br/>
                        <div style={{"overflow-y": "scroll", "height": "500px"}}>
                                <table>
                                    <tbody>
                                    {
                                        this.state.musics.map(function (val, idx) {
                                                return <tr><td>{val["Music"]}</td></tr>;
                                            })
                                    }
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>:
        <div>No data</div>;
    },

    componentDidMount: function() {
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

    onGenreChanged: function() {
        var genresFound = [];
        $("#genres").find("input:checked").map(function() {
            genresFound.push(parseInt($(this).val()));
        });
        var stateCopy = music.deepCopy(this.state);
        stateCopy.genresFound = genresFound;
        this.setState(stateCopy);
        music.reLoadDetailsAndFilters(
            {genreIDs: genresFound,
                performerID: this.state.selected.performerID,
                albumID: this.state.selected.albumID,
                composerID: this.state.selected.composerID,
                castID: this.state.selected.castID});
    },

    areNullablesEqual: function(first, second) {
        return first === second || (first === null && second === null);
    }

});

