using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MusicChoice.ViewModels;
using MusicServices;
using MusicServices.Services;

namespace MusicChoice2.Controllers
{
    public class MusicWebAPIController : ApiController
    {
        // GET api/<controller>
        public MusicViewModel Get()
        {
            int? albumID = null;
            int[] genreIDs = {1,2,3,4,5,6,7};
            int? composerID = null;
            int? performerID = null;
            int? castID = null;

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

            return musicViewModel;
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}