const schema = {
    "title": "event_noCalendar",
    "description": "Schema for the events that are not appointed",
    "type": "object",
    "properties": {
        "event_id" : {
            "type": "integer",
            "minimum": 0,
            "maximum": 10000
        },
        "title": {
            "type": "string"
        },
        "short_description": {
            "type": "string"
        },
        "long_description": {
            "type": "string"
        },
        "service": {
            "type": "integer"
        }
        //picture
    },
    "required": [
        "event_id",
        "title",
        "short_description",
        "service"
    ]
}

module.exports = schema