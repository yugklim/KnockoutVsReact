using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MusicServices;
using MusicServices.Services;

namespace MusicChoice.ViewModels
{
    public class MusicFiltersViewModel
    {
        public IEnumerable<Album_Result> Albums { get; set; }
        public IEnumerable<Cast_Result> Casts { get; set; }
        public IEnumerable<Composer_Result> Composers { get; set; }
        public IEnumerable<Genre_Result> Genres { get; set; }
        public IEnumerable<Performer_Result> Performers { get; set; }
        public IEnumerable<int> GenresFound { get; set; }

        public int? AlbumID { get; set; }
        public int? CastID { get; set; }
        public int? ComposerID { get; set; }
        public int? PerformerID { get; set; }
        public GetMusics_Result[] Musics { get; set; }
    }
}