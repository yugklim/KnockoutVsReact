using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MusicChoice.ViewModels;
using MusicServices;

namespace MusicChoice2.Controllers
{
    public class MusicWebAPIController : ApiController
    {
        // GET api/<controller>
        public MusicViewModel Get()
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