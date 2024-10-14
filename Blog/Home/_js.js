import { loadPosts } from "../Json/GenericMethods/_js.js"
import * as BlogGenerics from "../GenericMethods/_js.js"

let posts;

window.onload = async () => {
    posts = await loadPosts()
    BlogGenerics.loadFeaturedPostCards(posts)
}

document.getElementById("find-button").onclick = () => {
    let findText = document.getElementById("find-input").value
    let filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(findText.toLowerCase())
    );

    localStorage.setItem("filtredPosts", JSON.stringify(filteredPosts))
    window.location.href = "../Posts/_html.html"
}