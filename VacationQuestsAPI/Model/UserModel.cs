using System.Collections;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace VacationQuestsAPI.Model
{

    public class UserModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Email { get; set; }
        public string? Password { get; set; }
        public string? Icon { get; set; }
        public string? Bio { get; set; }
        public IEnumerable<string>? Vacations { get; set; }
        public IEnumerable<string>? OthersVacations { get; set; }
        public IEnumerable<string>? Friends { get; set; }
    }
}
