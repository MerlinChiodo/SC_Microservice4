exports.getPostOverview =(request, response) => {
    try {
        const data = {
            id: request.params.id,
            titel: "wow is frit ein kau"
        }
        response.send('/posts/postOverview', data)
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
        response.send('/', data)
    } catch (error) {
        console.log(error)
        response.status(500).send(error.message)
    }
}
