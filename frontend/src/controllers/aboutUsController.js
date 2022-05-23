//const backendurl = "http://localhost:3001/eventTest/";

const backendurl = "http://vps2290194.fastwebserver.de:9740/eventTest/";

export async function testAboutUs() {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "event_id" : 4001,
            "event_name" : "Updated About US",
            "service_name": "forum",
            "about_us": "test",
            "date" : "08.05.2022"
        }),
    };
    const response = await fetch(
        backendurl + "testAboutUs",
        requestOptions
    );
    const data = await response.json();
    this.ticketResponse = data;
}