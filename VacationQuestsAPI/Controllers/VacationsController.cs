using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using VacationQuestsAPI.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VacationQuestsAPI.Controllers
{
    [Route("api/vacations")]
    [ApiController]
    public class VacationsController : ControllerBase
    {
        private readonly IMongoCollection<VacationModel> _vacationCollection;
        private readonly string? _connectionString;
        private readonly IConfiguration? _config;


        //Constructor
        public VacationsController(IConfiguration configuration)
        {
            _config = configuration;
            var container = MongoClientContainer(_config.GetConnectionString("MongoDBConnectionString"));
            var mongoDB = container.GetDatabase("VacationQuestsDB");

            var collection = mongoDB.GetCollection<VacationModel>("Vacations");
            _vacationCollection = collection;
        }

        private MongoClient MongoClientContainer(string connectionString)
        {
            MongoClientSettings settings = MongoClientSettings.FromUrl(new MongoUrl(connectionString));
            settings.SslSettings = new SslSettings() { EnabledSslProtocols = System.Security.Authentication.SslProtocols.Tls12};

            MongoClient mongo = new MongoClient(settings);
            return mongo;
        }

        // GET: api/<VacationsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VacationModel>>> GetVacation()
        {
            try
            {
                var vacations = await _vacationCollection.Find(vacations => true).ToListAsync();
                return Ok(vacations);
            } 
            catch(Exception ex) 
            {
                return NoContent();
            }
        }

        // GET api/<VacationsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VacationModel>> GetVacation(string id)
        {
            var vacation = await _vacationCollection.Find<VacationModel>(vacation => vacation.Id == id).FirstOrDefaultAsync();
            if (vacation == null)
            {
                return NotFound();
            }
            return Ok(vacation);
        }


        // POST api/<VacationsController>
        [HttpPost]
        public async Task<ActionResult<VacationModel>> CreateVacation(VacationModel vacation)
        {
            await _vacationCollection.InsertOneAsync(vacation);
            return CreatedAtAction("GetVacation", new { id = vacation.Id }, vacation);
        }

        // PUT api/<VacationsController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVacation(string id, VacationModel updatedVacation)
        {
            var vacation = await _vacationCollection.Find<VacationModel>(vacation => vacation.Id == id).FirstOrDefaultAsync();
            if (vacation == null)
            {
                return NotFound();
            }
            updatedVacation.Id = vacation.Id;
            await _vacationCollection.ReplaceOneAsync(book => book.Id == id, updatedVacation);
            return Ok();
        }

        // DELETE api/<VacationsController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVacation(string id)
        {
            var vacation = await _vacationCollection.Find<VacationModel>(vacation => vacation.Id == id).FirstOrDefaultAsync();
            if (vacation == null)
            {
                return NotFound();
            }

            await _vacationCollection.DeleteOneAsync(vacation => vacation.Id == id);
            return Ok();
        }
    }
}
