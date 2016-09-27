using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using React;
using React.Exceptions;
using React.TinyIoC;

namespace MusicChoice2.HtmlHelpers
{
    public static class ReactServerRenderingExtension
    {
        private static IReactEnvironment Environment
        {
            get
            {
                try
                {
                    return ReactEnvironment.Current;
                }
                catch (TinyIoCResolutionException ex)
                {
                    throw new ReactNotInitialisedException("ReactJS.NET has not been initialised correctly.", (Exception)ex);
                }
            }
        }

        public static IHtmlString ReactInitJavaScriptAndAssignIds(this HtmlHelper htmlHelper, string[] ids, string assignFormat = "{0} = ", bool clientOnly = false)
        {
            List<string> assignings = new List<string>();
            foreach (string id in ids)
            {
                assignings.Add(string.Format(assignFormat, id));
            }

            try
            {
                string initJavaScript = Environment.GetInitJavaScript(clientOnly);
                int i = 0;
                int length = 0;
                foreach (Match match in Regex.Matches(initJavaScript, "ReactDOM.render"))
                {
                    initJavaScript = initJavaScript.Insert(match.Index + length, assignings.Skip(i).First());
                    length += assignings.Skip(i).First().Length;
                    ++i;
                }

                return (IHtmlString)new HtmlString(new TagBuilder("script")
                {
                    InnerHtml = initJavaScript
                }.ToString());
            }
            finally
            {
                Environment.ReturnEngineToPool();
            }
        }
    }
}