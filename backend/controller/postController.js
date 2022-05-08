const prisma = require('../lib/prisma.js')
const Ajv = require('ajv');
const ajv = new Ajv({allErrors:true})
import {Category} from "@prisma/client"

const createPost_schema = require('../json-schema/createPost_schema')
const validate_createPost = ajv.compile(createPost_schema)



exports.createPost= async(request, response) => {
    if(validate_createPost(request.body)){
        console.log("validated")
        let categ = request.body;
        let a: Category = a
        if(categ == "suche"){
            categ= Category.SUCHE;
        }
        const {title, short_description, long_description, user_id} = request.body

        const Post = await prisma.post.create({
            data: {
                title,
                short_description,
                long_description,
                user_id,
                category: categ //does not work with this line, how do I work with enums?
            },

        })
        return response.status(200).send(Post);
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
