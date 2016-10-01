using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
            Genre_Result[] genres;
            Composer_Result[] composers;

            MusicService.Get(ref genreIDs, ref composerID, ref castID, ref albumID, ref performerID,
                 out musics, out casts, out albums, out performers, out genres, out composers);
            
            MusicFiltersViewModel musicFiltersViewModel = new MusicFiltersViewModel()
                {
                    Albums = albums,
                    Genres = genres,
                    Composers = composers,
                    Performers = performers,
                    Casts = casts,

                    AlbumID = albumID,
                    GenreIDs = genreIDs,
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

        [HttpGet]
        public ActionResult FilterMusics(int[] genreIDs, int? composerID, int? castID, int? albumID, int? performerID)
        {
            GetMusics_Result[] musics;
            Cast_Result[] casts;
            Album_Result[] albums;
            Performer_Result[] performers;
            Genre_Result[] genres;
            Composer_Result[] composers;
            
            MusicService.Get(ref genreIDs, ref composerID, ref castID, ref albumID, ref performerID,
                 out musics, out casts, out albums, out performers, out genres, out composers);

            MusicFiltersViewModel musicFiltersViewModel = new MusicFiltersViewModel()
            {
                Albums = albums,
                Genres = genres,
                Composers = composers,
                Performers = performers,
                Casts = casts,

                AlbumID = albumID,
                GenreIDs = genreIDs,
                ComposerID = composerID,
                PerformerID = performerID,
                CastID = castID
            };

            MusicViewModel musicViewModel = new MusicViewModel()
            {
                Filters = musicFiltersViewModel
            };

            return Json(new
            {
                Filters = musicFiltersViewModel
            }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RenderOnClient()
        {
            return View();
        }
    }
}