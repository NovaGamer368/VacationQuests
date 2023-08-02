using Microsoft.Azure.Cosmos.Serialization.HybridRow;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace VacationQuestsAPI.Model
{
    using System;
    using System.Collections.Generic;

    public class AddressComponent
    {
        public string? LongName { get; set; }
        public string? ShortName { get; set; }
        public List<string>? Types { get; set; }
    }

    public class OpeningHoursPeriod
    {
        public OpeningHoursTime? Close { get; set; }
        public OpeningHoursTime? Open { get; set; }
    }

    public class OpeningHoursTime
    {
        public string? Date { get; set; }
        public int? Day { get; set; }
        public string? Time { get; set; }
    }

    public class OpeningHours
    {
        public bool? OpenNow { get; set; }
        public List<OpeningHoursPeriod>? Periods { get; set; }
        public List<string>? WeekdayText { get; set; }
    }

    public class Photo
    {
        public int? Height { get; set; }
        public List<string>? HtmlAttributions { get; set; }
        public int? Width { get; set; }
    }

    public class PlusCode
    {
        public string? CompoundCode { get; set; }
        public string? GlobalCode { get; set; }
    }

    public class Review
    {
        public string? AuthorName { get; set; }
        public string? AuthorUrl { get; set; }
        public string? Language { get; set; }
        public string? ProfilePhotoUrl { get; set; }
        public int? Rating { get; set; }
        public string? RelativeTimeDescription { get; set; }
        public string? Text { get; set; }
        public int? Time { get; set; }
    }

    public class PlaceData
    {
        public List<AddressComponent>? AddressComponents { get; set; }
        public string? AdrAddress { get; set; }
        public string? BusinessStatus { get; set; }
        public OpeningHours? CurrentOpeningHours { get; set; }
        public string? FormattedAddress { get; set; }
        public string? FormattedPhoneNumber { get; set; }
        public Geometry? Geometry { get; set; }
        public string? Icon { get; set; }
        public string? IconBackgroundColor { get; set; }
        public string? IconMaskBaseUri { get; set; }
        public string? InternationalPhoneNumber { get; set; }
        public string? Name { get; set; }
        public OpeningHours? OpeningHours { get; set; }
        public List<Photo>? Photos { get; set; }
        public string? PlaceId { get; set; }
        public PlusCode? PlusCode { get; set; }
        public double? Rating { get; set; }
        public string? Reference { get; set; }
        public List<Review>? Reviews { get; set; }
        public List<string>? Types { get; set; }
        public string? Url { get; set; }
        public int? UserRatingsTotal { get; set; }
        public int? UtcOffset { get; set; }
        public string? Vicinity { get; set; }
        public string? Website { get; set; }
        public List<object>? HtmlAttributions { get; set; }
        public int? UtcOffsetMinutes { get; set; }
    }

    public class Geometry
    {
        public Location? Location { get; set; }
        public Viewport? Viewport { get; set; }
    }

    public class Location
    {
        public double? Lat { get; set; }
        public double? Lng { get; set; }
    }

    public class Viewport
    {
        public double? South { get; set; }
        public double? West { get; set; }
        public double? North { get; set; }
        public double? East { get; set; }
    }
}
