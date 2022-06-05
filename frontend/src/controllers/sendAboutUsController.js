const backendurl = "http://localhost:3001/";
//const backendurl = "http://" + location.host ;
//const backendurl = "http://vps2290194.fastwebserver.de:9740/eventTest/";

export async function sendAboutUsEvent(date,about_us, picture, url) {
    //console.log(backendurl)
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "event_id" : 4001,
            "event_name" : "Updated About US",
            "service_name": "forum",
            "date" : date,
            "about_us": about_us,
            "picture": picture,
            "url": url
        }),
    };
    const response = await fetch(
        backendurl + "landingPage/sendAboutUs",
        requestOptions
    );
    const data = await response.json();
}