const amqp = require('amqplib/callback_api');
const {ajv} = require("../validation")
const rabbitMQUsername = process.env.rabbitMQUsername
const rabbitMQPassword = process.env.rabbitMQPassword
const rabbitMQServerURL = process.env.rabbitMQServerURL

exports.updateAboutUs = async (req, res) => {
    amqp.connect(`amqp://${rabbitMQUsername}:${rabbitMQPassword}@${rabbitMQServerURL}`, (connectError, connection) => {
        if (connectError) {
            throw connectError
        }
        connection.createChannel((channelError, channel) => {
            if (channelError) {
                throw channelError
            }
            const validate = ajv.getSchema("event_aboutUs")
            if (validate(req.body)) {
                channel.publish('events', "public.forum", Buffer.from(JSON.stringify(req.body)))
                console.log(`RabbitMQ: sent event: ${req.body}`)
                return res.status(200).send({error: false, msg: 'event successfully sent'})
            } else {
                res.status(400).send({error: true, msg: 'invalid aboutUs data'})
            }
        })
    })
}

