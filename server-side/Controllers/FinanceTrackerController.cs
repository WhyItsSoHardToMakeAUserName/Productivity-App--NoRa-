using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace server_side.Controllers
{
    public class FinanceTrackerController : Controller
    {
        public string Index()
        {
            return "test";
        }
        public string Home(){
            return "hi";
        }
    }
}