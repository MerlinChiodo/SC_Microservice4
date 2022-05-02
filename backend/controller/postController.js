const prisma = require('../lib/prisma.js')
const Ajv = require('ajv');
const ajv = new Ajv({allErrors:true})

const createPost_schema = require('../json-schema/createPost_schema')
const validate_createPost = ajv.compile(createPost_schema)



exports.createPost= async(request, response) => {
    if(validate_createPost(request.body)){
        console.log("validated")
        const {title, short_description, long_description, user_id, category} = request.body
        const Post = await prisma.post.create({
            data: {
                title,
                short_description,
                long_description,
                user_id
            },

        })
        return response.status(200);
    }
    return response.status(400).send({message: 'missing data'})
}

exports.getPostOverview =(request, response) => {

    //let createPost_json = JSON.parse(re)


    try {
        const data = {
            id: request.params.id,
            titel: "titel"
        }
        return response.json(data)
    } catch (error) {
        console.log(error)
        response.status(500).send(error.message)
    }

    //response.send('Not implemented: getPostOverview')

};

exports.getPost = (request, response) => {
    try {
        const data = {
            id: request.params.id,
            titel: "mh"
        }
        return response.json(data)
    } catch (error) {
        console.log(error)
        return response.status(500).send(error.message)
    }
}
