const amqp = require('amqplib/callback_api');
const Ajv = require('ajv');

const schema_event_Calendar = require('event_Calendar.json');
const schema_event_NoCalendar = require('event_NoCalendar.json');


const ajv = exports.ajv = new Ajv();

ajv.addSchema(schema_event_Calendar, 'event_Calendar');
ajv.addSchema(schema_event_NoCalendar, 'event_NoCalendar');