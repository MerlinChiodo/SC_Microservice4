const backendurl = "http://localhost:3001/";
//const backendurl = "http://" + location.host + "/" ;
//const backendurl = "http://vps2290194.fastwebserver.de:9740/eventTest/";

export async function createPost(user_id, title, short_description, long_description, event_on, category, category_subject) {
    //console.log(backendurl)
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "user_id" : user_id,
            "title" : title,
            "short_description": short_description,
            "long_description" : long_description,
            "event_on": event_on,
            "category": category,
            "category_subject": category_subject
        }),
    };
    const response = await fetch(
        backendurl + "posts",
        requestOptions
    );
    const data = await response.json();
}