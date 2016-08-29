using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MusicServices;

namespace MusicChoice.ViewModels
{
    public class MusicFiltersViewModel
    {
        public IEnumerable<Album> Albums { get; set; }
        public IEnumerable<Cast> Casts { get; set; }
        public IEnumerable<Composer> Composers { get; set; }
        public IEnumerable<Genre> Genres { get; set; }
        public IEnumerable<Performer> Performers { get; set; }

        public int? AlbumID { get; set; }
        public int? CastID { get; set; }
        public int? ComposerID { get; set; }
        public int? GenreID { get; set; }
        public int? PerformerID { get; set; }
    }
}