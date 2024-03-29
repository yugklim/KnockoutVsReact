﻿using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicServices.Services
{
    public class MusicService
    {
        public static void Get(IEnumerable<int> genreIDs, ref int? composerID, ref int? castID, ref int? albumID, ref int? performerID,
            out GetMusics_Result[] musics, out Cast_Result[] casts, out Album_Result[] albums,
            out Performer_Result[] performers, out Genre_Result[] genresFound, out Composer_Result[] composers, out Genre_Result[] genres
            )
        {
            using (MusicChoiceEntities ctx = new MusicChoiceEntities())
            {
                ObjectParameter genreIDParameter = new ObjectParameter("genreIDs", typeof(string)) { Value = ToCSV(genreIDs) };
                ObjectParameter composerIDParameter = new ObjectParameter("composerID", typeof(int?)) { Value = composerID };
                ObjectParameter castIDParameter = new ObjectParameter("castID", typeof(int?)) { Value = castID };
                ObjectParameter albumIDParameter = new ObjectParameter("albumID", typeof(int?)) { Value = albumID };
                ObjectParameter performerIDParameter = new ObjectParameter("performerID", typeof(int?)) { Value = performerID };

                ObjectResult<GetMusics_Result> musicsResults = ctx.GetMusics(genreIDParameter, composerIDParameter, castIDParameter, albumIDParameter, performerIDParameter);
                musics = musicsResults.ToArray();

                ObjectResult<Cast_Result> castResults = musicsResults.GetNextResult<Cast_Result>();
                casts = castResults.ToArray();

                ObjectResult<Album_Result> albumResults = castResults.GetNextResult<Album_Result>();
                albums = albumResults.ToArray();

                ObjectResult<Performer_Result> performerResults = albumResults.GetNextResult<Performer_Result>();
                performers = performerResults.ToArray();

                ObjectResult<Genre_Result> genreSelectedResults = performerResults.GetNextResult<Genre_Result>();
                genresFound = genreSelectedResults.ToArray();

                ObjectResult<Composer_Result> composerResults = genreSelectedResults.GetNextResult<Composer_Result>();
                composers = composerResults.ToArray();

                ObjectResult<Genre_Result> genreResults = composerResults.GetNextResult<Genre_Result>();
                genres = genreResults.ToArray();

                try
                {
                    composerID = (int?)composerIDParameter.Value;
                }
                catch (Exception)
                {
                    composerID = null;
                }

                try
                {
                    albumID = (int?) albumIDParameter.Value;
                }
                catch (Exception)
                {
                    albumID = null;
                }

                try
                {
                    performerID = (int?)performerIDParameter.Value;
                }
                catch (Exception)
                {
                    performerID = null;
                }

                try
                {
                    castID = (int?)castIDParameter.Value;
                }
                catch (Exception)
                {
                    castID = null;
                }
            }
        }

        private static string ToCSV(IEnumerable<int> genreIDs)
        {
            return ((genreIDs == null) || !genreIDs.Any()) ? null : string.Join(",", genreIDs);
        }
    }
}
