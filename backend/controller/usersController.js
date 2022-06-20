const prisma = require('../lib/prisma.js')
const postController = require("./postController");



exports.createUser = (request, response) => {
    return response.send('no implementation');
};

exports.getAllUsers = (request, response) => {
    return response.send('no implementation');
};

exports.getAllSavedPosts = async(request, response) => {
    try {
        const userid = parseInt(request.params.id, 10)
        const posts = await prisma.Post.findMany({
                where: {
                    savedBy: {
                        some: {
                            id: userid,
                        }
                    },
                }
,
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
};

exports.savePost = async(request, response) => {
    try {
        const postid = parseInt(request.params.postId, 10)
        const userid = parseInt(request.params.userId, 10)
        const user = await prisma.User.update({
            where: {
                id: userid
            },
            data: {
                savedPosts: {
                    connect: {
                        id: postid
                    }
                }
            }
        })
        return response.json(user)
    } catch (error) {
        console.log(error)
        return response.status(500).send(error.message)
    }
};


exports.getUser = (request, response) => {
    return response.send('no implementation');
};

exports.updateUser = (request, response) => {
    return response.send('no implementation');
};

exports.deleteUser = (request, response) => {
    return response.send('no implementation');
};

