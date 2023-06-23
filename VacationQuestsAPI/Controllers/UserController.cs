using Microsoft.AspNetCore.Mvc;

namespace VacationQuestsAPI.Controllers
{
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
