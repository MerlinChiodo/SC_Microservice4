const schema = {
    "title": "event_Calendar",
    "description": "Schema for the events that are appointed",
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
        },
        "event_at": {
            "type": "date"
        }
        //picture
    },
    "required": [
        "event_id",
        "title",
        "short_description",
        "service",
        "event_at"
    ]
}

module.exports = schema