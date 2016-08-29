using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicServices
{
    public class GenreService
    {
        public static IEnumerable<Genre> Get()
        {
            using (MusicChoiceEntities ctx = new MusicChoiceEntities())
            {
                ctx.Configuration.LazyLoadingEnabled = false;
                return ctx.Genres.ToList();
            }
        }
    }
}
