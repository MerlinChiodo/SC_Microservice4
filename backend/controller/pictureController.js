const prisma = require('../lib/prisma.js')

exports.createPictures = async (request, response) => {
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
        const path = "./uploads/" + pictureName

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
    return res.status(200).json(pictures);
};

exports.getAllPictures = (request, response) => {
    return response.send('no implementation');
};

exports.getPicture = (request, response) => {
    return response.send('no implementation');
};

exports.updatePicture = (request, response) => {
    return response.send('no implementation');
};

exports.deletePicture = (request, response) => {
    return response.send('no implementation');
};