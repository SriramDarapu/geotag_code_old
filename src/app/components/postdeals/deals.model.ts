export class Deals {
    public category: String;
    public short_desc: String;
    public content: String;
    public scheduled_notification_date: String;
    public scheduled_notification_time: String;
    public start_date: Date;
    public end_date: Date;
    public start_time:String;
    public end_time:String;
    public range:String;
    public lat: String;
    public lng: String;

    constructor(
        category:String,
        short_desc: String,
        content:String,
        scheduled_notification_date: String,
        scheduled_notification_time: String,
        start_date: Date,
        end_date: Date,
        start_time:String,
        end_time:String,
        range:String,
        lat: String,
        lng: String
    ) {
        this.category = category;
        this.short_desc = short_desc
        this.content = content;
        this.scheduled_notification_date = scheduled_notification_date;
        this.scheduled_notification_time = scheduled_notification_time;
        this.start_date = start_date;
        this.end_date = end_date;
        this.start_time = start_time;
        this.end_time = end_time;
        this.range = range;
        this.lat = lat;
        this.lng = lng;
    }
}

// category:String,
// content:String,
// notification: String,
// schedules: String,
// start_date: Date,
// end_date: Date,
// start_time:String,
// end_time:String,
// range:String,