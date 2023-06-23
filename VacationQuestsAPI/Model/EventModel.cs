using Microsoft.Azure.Cosmos.Serialization.HybridRow;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace VacationQuestsAPI.Model
{
    
    public class EventModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string EventName { get; set; }
        public string Location { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Description { get; set; }
        public IEnumerable<UserModel> Party { get; set; }
        public int PartyCount { get; set; }
    }
}
