using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using VacationQuestsAPI.Model;

namespace VacationQuestsAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : Controller
    {

        private readonly IMongoCollection<UserModel> _userCollection;
        private readonly string? _connectionString;
        private readonly IConfiguration? _config;

        //Constructor
        public UsersController(IConfiguration configuration)
        {
            _config = configuration;
            var container = MongoClientContainer(_config.GetConnectionString("MongoDBConnectionString"));
            var mongoDB = container.GetDatabase("VacationQuestsDB");

            var collection = mongoDB.GetCollection<UserModel>("Users");
            _userCollection = collection;
        }

        private MongoClient MongoClientContainer(string connectionString)
        {
            MongoClientSettings settings = MongoClientSettings.FromUrl(new MongoUrl(connectionString));
            settings.SslSettings = new SslSettings() { EnabledSslProtocols = System.Security.Authentication.SslProtocols.Tls12 };

            MongoClient mongo = new MongoClient(settings);
            return mongo;
        }

        // GET: UsersController
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers()
        {
            try
            {
                var users = await _userCollection.Find(users => true).ToListAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        // GET: UsersController/Details/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUser(string id)
        {
            var user = await _userCollection.Find<UserModel>(user => user.Id == id).FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET: UsersController/Create
        [HttpPost]
        public async Task<ActionResult<UserModel>> CreateUser(UserModel user)
        {
            await _userCollection.InsertOneAsync(user);
            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // POST: UsersController/Create
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, UserModel updatedModel)
        {
            var user = await _userCollection.Find<UserModel>(user => user.Id == id).FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound();
            }
            updatedModel.Id = user.Id;
            await _userCollection.ReplaceOneAsync(book => book.Id == id, updatedModel);
            return Ok();
        }

        // GET: UsersController/Delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userCollection.Find<UserModel>(user => user.Id == id).FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound();
            }

            await _userCollection.DeleteOneAsync(user => user.Id == id);
            return Ok();
        }
    }
}
