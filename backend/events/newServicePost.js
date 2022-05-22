const amqp = require('amqplib/callback_api')

const rabbitMQUsername = process.env.rabbitMQUsername
const rabbitMQPassword = process.env.rabbitMQPassword
const serverURL = process.env.serverURL

const {ajv} = require("../validation")
//const prisma = require('../lib/prisma.js')
const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient({
    log: ['query','info','warn','error'],
})


amqp.connect(`amqp://${rabbitMQUsername}:${rabbitMQPassword}@${serverURL}:5672`, function (error0, connection) {
    if (error0) {
        throw error0
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1
        }

        channel.consume('forum', async function (msg) {
            console.log(msg.content.toString())
            let newPost = JSON.parse(msg.content.toString())
            const validateCalendar = ajv.getSchema("event_Calendar")
            const validateNoCalendar = ajv.getSchema("event_NoCalendar")

            if (validateCalendar(newPost)) {
                try{
                    console.log(newPost)
                    //date not yet correctly validated
                    const {title, short_description, long_description, service} = newPost.body


                    const Post = await prisma.post.create({
                        data: {
                            title,
                            short_description,
                            long_description,
                            service
                        },

                    })
                } catch (e) {
                    return console.log(e)
                }
            }else if(validateNoCalendar(newPost)){
                try{
                    console.log(newPost)
                    const {title, short_description, long_description, service} = newPost.body


                    const Post = await prisma.post.create({
                        data: {
                            title,
                            short_description,
                            long_description,
                            service
                        },
                    })
                } catch (e) {
                    return console.log(e)
                }
            }

        }, {
            noAck: true,
        })
    })
})