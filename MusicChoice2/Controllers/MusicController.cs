using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using MusicChoice.ViewModels;
using MusicChoice2.Controllers;
using MusicServices;
using MusicServices.Services;

namespace MusicChoice.Controllers
{
    public class MusicController: Controller
    {
        public ActionResult Index()
        {
            MusicWebAPIController musicWebApiController = new MusicWebAPIController();
            MusicViewModel musicViewModel = musicWebApiController.Get();
            return View(musicViewModel);
        }

        [System.Web.Mvc.HttpGet]
        public ActionResult FilterMusics([FromUri] IEnumerable<int> genreIDs, int? composerID, int? castID, int? albumID, int? performerID)
        {
            MusicWebAPIController musicWebApiController = new MusicWebAPIController();
            MusicViewModel musicViewModel = musicWebApiController.FilterMusics(genreIDs, composerID, castID, albumID, performerID);
            return Json(musicViewModel, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RenderOnClient()
        {
            return View();
        }
    }
}