using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using MusicChoice.ViewModels;
using MusicServices;
using MusicServices.Services;

namespace MusicChoice.Controllers
{
    public class MusicController: Controller
    {
        public ActionResult Index()
        {
            int? albumID = null;
            int[] genreIDs = new int[] {1,2,3,4,5,6,7};
            int? composerID = null;
            int? performerID = null;
            int? castID = null;

            GetMusics_Result[] musics;
            Cast_Result[] casts;
            Album_Result[] albums;
            Performer_Result[] performers;
            Genre_Result[] genresFound;
            Composer_Result[] composers;
            Genre_Result[] genres;

            MusicService.Get(genreIDs, ref composerID, ref castID, ref albumID, ref performerID,
                 out musics, out casts, out albums, out performers, out genresFound, out composers, out genres);
            
            MusicFiltersViewModel musicFiltersViewModel = new MusicFiltersViewModel()
                {
                    Albums = albums,
                    GenresFound = genresFound.Select(g => g.GenreID),
                    Genres = genres,
                    Composers = composers,
                    Performers = performers,
                    Casts = casts,

                    AlbumID = albumID,
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

        [System.Web.Mvc.HttpGet]
        public ActionResult FilterMusics([FromUri] IEnumerable<int> genreIDs, int? composerID, int? castID, int? albumID, int? performerID)
        {
            GetMusics_Result[] musics;
            Cast_Result[] casts;
            Album_Result[] albums;
            Performer_Result[] performers;
            Genre_Result[] genres;
            Genre_Result[] genresFound;
            Composer_Result[] composers;

            MusicService.Get(genreIDs, ref composerID, ref castID, ref albumID, ref performerID,
                 out musics, out casts, out albums, out performers, out genresFound, out composers, out genres);

            MusicFiltersViewModel musicFiltersViewModel = new MusicFiltersViewModel()
            {
                Albums = albums,
                GenresFound = genresFound.Select(g => g.GenreID),
                Genres = genres,
                Composers = composers,
                Performers = performers,
                Casts = casts,

                AlbumID = albumID,
                ComposerID = composerID,
                PerformerID = performerID,
                CastID = castID
            };

            MusicViewModel musicViewModel = new MusicViewModel()
            {
                Filters = musicFiltersViewModel
            };

            return Json(musicViewModel, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RenderOnClient()
        {
            return View();
        }
    }
}