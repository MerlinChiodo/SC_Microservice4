const prisma = require('../lib/prisma.js')
const Ajv = require('ajv');
const ajv = new Ajv({allErrors:true})
const addFormats = require('ajv-formats')
addFormats(ajv)


const createPost_schema = require('../json-schema/createPost_schema.json')
const validate_createPost = ajv.compile(createPost_schema)


exports.createPost= async(request, response) => {
    if(validate_createPost(request.body)){
        let {event_on} = request.body
        event_on = new Date(event_on)
        const {title, short_description, long_description, user_id, category, category_subject} = request.body

        const Post = await prisma.Post.create({
            data: {
                title,
                short_description,
                long_description,
                user_id,
                category,
                category_subject,
                event_on
            },

        })
        return response.status(200).send(Post);
    }
    return response.status(400).send({message: 'missing data'})
}

exports.getPostOverview = (request, response) => {
    //let createPost_json = JSON.parse(re)


    try {
        const data = {
            id: parseInt(request.params.id, 10),
            titel: "titel"
        }
        return response.json(data)
    } catch (error) {
        console.log(error)
        response.status(500).send(error.message)
    }

    //response.send('Not implemented: getPostOverview')

};


exports.getPost = async(request, response) => {
    try {
        const postid = parseInt(request.params.id, 10)
        const servicePost = await prisma.Post.findUnique({
            where: {
                id: postid
            }
        })
        return response.json(servicePost)
    } catch (error) {
        console.log(error)
        return response.status(500).send(error.message)
    }
}
exports.getAllServicePosts = async(request, response) => {
    try {
        const posts = await prisma.Post.findMany({
            where: {
                service: {
                    not: null
                }

            },
            select: {
                title: true,
                short_description: true,
                long_description: true,
                service: true,
                id: true,
                event_on: true,
                created_on: true
            },
            orderBy: {
                created_on: "desc"
            }
        })
        return response.json(posts)
    } catch (error) {
        console.log(error)
        return response.status(500).send(error.message)
    }
}
exports.getAllUserPosts = async(request, response) => {
    try {
        const posts = await prisma.Post.findMany({
            where: {
                service: null,
                public: true,
                user_id:{
                    not: null
                }

            },
            select: {
                title: true,
                short_description: true,
                long_description: true,
                id: true,
                event_on: true,
                created_on: true,
                category: true,
                category_subject: true,
                user_id: true,
                pictures: true,

            },
            orderBy: {
                created_on: "desc"
            }
        })
        return response.json(posts)
    } catch (error) {
        console.log(error)
        return response.status(500).send(error.message)
    }
}



exports.updatePost = (request, response) => {
    return response.send('no implementation');
};

exports.deletePost = (request, response) => {
    return response.send('no implementation');
};

exports.makePostPrivate= (request, response) => {
    return response.send('no implementation');
};

exports.makePostPublic = (request, response) => {
    return response.send('no implementation');
};

exports.addPictureToPost = (request, response) => {
    return response.send('no implementation');
};

exports.removePictureFromPost = (request, response) => {
    return response.send('no implementation');
};
