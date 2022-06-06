const amqp = require('amqplib/callback_api');
const Ajv = require('ajv');
const addFormats = require('ajv-formats')


const schema_event_Calendar = require('./event_Calendar.json');
const schema_event_NoCalendar = require('./event_noCalendar.json');
const schema_aboutUs = require("./landingPage/event_aboutUs.json")


const ajv = exports.ajv = new Ajv();
addFormats(ajv)

ajv.addSchema(schema_event_Calendar, 'event_Calendar');
ajv.addSchema(schema_event_NoCalendar, 'event_NoCalendar');
ajv.addSchema(schema_aboutUs, 'event_aboutUs')