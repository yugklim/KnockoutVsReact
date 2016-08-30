using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MusicChoice.ViewModels;
using MusicServices;

namespace MusicChoice.Controllers
{
    public class MusicController: Controller
    {
        public ActionResult Index()
        {
            int? albumID = null;
            int? genreID = null;
            int? composerID = null;
            int? performerID = null;
            int? castID = null;

            IEnumerable<Album> albums = AlbumService.Get();
            IEnumerable<Genre> genres = GenreService.Get();
            IEnumerable<Composer> composers = ComposerService.Get();
            IEnumerable<Performer> performers = PerformerService.Get();
            IEnumerable<Cast> casts = CastService.Get();

            MusicFiltersViewModel musicFiltersViewModel = new MusicFiltersViewModel()
                {
                    Albums = albums,
                    Genres = genres,
                    Composers = composers,
                    Performers = performers,
                    Casts = casts,

                    AlbumID = albumID,
                    GenreID = genreID,
                    ComposerID = composerID,
                    PerformerID = performerID,
                    CastID = castID
                };

            MusicViewModel musicViewModel = new MusicViewModel()
                {
                    Filters = musicFiltersViewModel
                };

            return View(musicViewModel);
        }

        public ActionResult RenderOnClient()
        {
            return View();
        }
    }
}