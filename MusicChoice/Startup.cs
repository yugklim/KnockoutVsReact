using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MusicChoice.Startup))]
namespace MusicChoice
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
