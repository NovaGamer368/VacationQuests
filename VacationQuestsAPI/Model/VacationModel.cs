using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
namespace VacationQuestsAPI.Model
{
    public class VacationModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string VacationTitle { get; set; }
        public string Location { get; set; }
        public IEnumerable<string>? Events { get; set; }  
        public string Owner { get; set; }
        public IEnumerable<string>? Planners { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }
}
