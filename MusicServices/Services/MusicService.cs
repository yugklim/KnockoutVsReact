using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicServices.Services
{
    public class MusicService
    {
        public static void Get()
        {
            using (MusicChoiceEntities ctx = new MusicChoiceEntities())
            {
                ObjectParameter genreID = new ObjectParameter("genreID", typeof(int?)) {Value = null};
                ObjectParameter composerID = new ObjectParameter("composerID", typeof(int?)) { Value = null };
                ObjectParameter castID = new ObjectParameter("castID", typeof(int?)) { Value = null };
                ObjectParameter albumID = new ObjectParameter("albumID", typeof(int?)) { Value = null };
                ObjectParameter performerID = new ObjectParameter("performerID", typeof(int?)) { Value = null };

                ObjectResult<GetMusics_Result> musicsResults = ctx.GetMusics(genreID, composerID, castID, albumID, performerID);
                ObjectResult<Cast_Result> castResults = musicsResults.GetNextResult<Cast_Result>();
            }
        }
    }
}
