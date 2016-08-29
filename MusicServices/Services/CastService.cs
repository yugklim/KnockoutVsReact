using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicServices
{
    public class CastService
    {
        public static IEnumerable<Cast> Get()
        {
            using (MusicChoiceEntities ctx = new MusicChoiceEntities())
            {
                ctx.Configuration.LazyLoadingEnabled = false;
                return ctx.Casts.ToList();
            }
        }
    }
}
