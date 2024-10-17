import { loadJson } from "../Json/GenericMethods/_js.js"
import * as BlogGenerics from "../GenericMethods/_js.js"

let posts;

window.onload = async () => {
    posts = await loadJson('../Json/Posts/_json.json')
    BlogGenerics.loadFeaturedPostCards(posts)
    BlogGenerics.funcionalityLinks()
}

document.getElementById("find-button").onclick = () => {
    let findText = document.getElementById("find-input").value
    let filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(findText.toLowerCase())
    );

    localStorage.setItem("filtredPosts", JSON.stringify(filteredPosts))
    window.location.href = "../Posts/AllPosts/_html.html"
}