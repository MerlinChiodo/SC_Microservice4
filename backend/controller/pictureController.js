const prisma = require('../lib/prisma.js')

exports.createPictures = async (request, response) => {
    console.log("in createPictures")
    let post_id
    try{
        post_id = parseInt(request.params.postId, 10)
    }catch(error){
        console.log(error)
        response.status(500).send(error.message)
    }

    let pictures = []

    for(let i = 0; i < request.files.length; i++) {
        const pictureName = request.files[i].filename
        const path = pictureName

        try{
            const picture = await prisma.Picture.create({
                data:{
                    post_id,
                    path
                }
            })
        } catch(error){
            console.log(e);
        }
    }
    return response.status(200).json(pictures);
};

exports.getAllPictures = async(request, response) => {
    try {
        const postId = parseInt(request.params.postId, 10)
        const pictures = await prisma.Picture.findMany({
            where: {
                post_id: postId
            }
        })
        return response.status(200).json(pictures)
    } catch (error) {
        console.log(error)
        return response.status(500).send(error.message)
    }
};

exports.getPicture = async(request, response) => {
    try {
        const id = parseInt(request.params.id, 10)
        const picture = await prisma.Picture.findUnique({
            where: {
                id
            }
        })
        console.log(picture)
        if(picture.path) {
            console.log("hey")
            response.sendFile(picture.path, {root: "uploads"})
        }
    } catch (error) {
        console.log(error)
        return response.status(500).send(error.message)
    }
};

exports.updatePicture = (request, response) => {
    return response.send('no implementation');
};

exports.deletePicture = (request, response) => {
    return response.send('no implementation');
};