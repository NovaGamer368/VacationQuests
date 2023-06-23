using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using VacationQuestsAPI.Model;

namespace VacationQuestsAPI.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventsController : Controller
    {
        private readonly IMongoCollection<EventModel> _eventCollection;
        private readonly string? _connectionString;
        private readonly IConfiguration? _config;

        //Constructor
        public EventsController(IConfiguration configuration)
        {
            _config = configuration;
            var container = MongoClientContainer(_config.GetConnectionString("MongoDBConnectionString"));
            var mongoDB = container.GetDatabase("VacationQuestsDB");

            var collection = mongoDB.GetCollection<EventModel>("Events");
            _eventCollection = collection;
        }

        private MongoClient MongoClientContainer(string connectionString)
        {
            MongoClientSettings settings = MongoClientSettings.FromUrl(new MongoUrl(connectionString));
            settings.SslSettings = new SslSettings() { EnabledSslProtocols = System.Security.Authentication.SslProtocols.Tls12 };

            MongoClient mongo = new MongoClient(settings);
            return mongo;
        }

        // GET: EventsController
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventModel>>> GetEvents()
        {
            try
            {
                var vEvent = await _eventCollection.Find(vEvent => true).ToListAsync();
                return Ok(vEvent);
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        // GET: EventsController/Details/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EventModel>> GetEvent(string id)
        {
            var vEvent = await _eventCollection.Find<EventModel>(vEvent =>  vEvent.Id == id).FirstOrDefaultAsync();
            if (vEvent == null)
            {
                return NotFound();
            }
            return Ok(vEvent);
        }

        // GET: EventsController/Create
        [HttpPost]
        public async Task<ActionResult<UserModel>> CreateEvent(EventModel vEvent)
        {
            await  _eventCollection.InsertOneAsync(vEvent);
            return CreatedAtAction("GetEvent", new { id = vEvent.Id }, vEvent);
        }

        //PUT: events/:id

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(string id, EventModel updatedEvent)
        {
            var vEvent = await _eventCollection.Find<EventModel>(vEvent => vEvent.Id == id).FirstOrDefaultAsync();
            if (vEvent == null)
            {
                return NotFound();
            }
            updatedEvent.Id = vEvent.Id;
            await _eventCollection.ReplaceOneAsync(book => book.Id == id, updatedEvent);
            return Ok();
        }

        // GET: EventsController/Delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(string id)
        {
            var vEvent = await _eventCollection.Find<EventModel>(vEvent => vEvent.Id == id).FirstOrDefaultAsync();
            if (vEvent == null)
            {
                return NotFound();
            }

            await _eventCollection.DeleteOneAsync(vEvent => vEvent.Id == id);
            return Ok();
        }
    }
}
