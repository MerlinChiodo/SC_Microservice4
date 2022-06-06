const backendurl = "http://localhost:3001/";
//const backendurl = "http://" + location.host + "/";

export async function getAllServicePosts() {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
        backendurl + "posts/getAllServicePosts",
        requestOptions
    );
    const data = await response.json();
}