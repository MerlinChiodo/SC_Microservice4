//const backendurl = "http://localhost:3001/";
const backendurl = "http://" + location.host + "/" ;


export async function createPost(user_id, title, short_description, long_description, event_on, category, category_subject) {
    //console.log(backendurl)
    var requestOptions= {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
            "user_id" : user_id
        },
    };
    if(short_description !== ""){
        requestOptions.body.short_description=short_description
    }
    if(title !== ""){
        requestOptions.body.title=title
    }
    if(long_description !== ""){
        requestOptions.body.long_description=long_description
    }
    if(event_on !== ""){
        requestOptions.body.event_on=event_on
    }
    if(category !== ""){
        requestOptions.body.category=category
        if(category_subject !== ""){
            requestOptions.body.category_subject=category_subject
        }
    }
    requestOptions.body=JSON.stringify(requestOptions.body)

    const response = await fetch(
        backendurl + "posts",
        requestOptions
    );
    const data = await response.json();
}