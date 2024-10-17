import { loadJson } from "../../Json/GenericMethods/_js.js"
import * as BlogGenerics from "../../GenericMethods/_js.js"

let posts;
let page = 0
let numPageRegisters = 10;

window.onload = async () => {
    posts = await loadJson('../../Json/Posts/_json.json')
    posts = posts.reverse()

    funcionalityDefaultPages()


    let filtredPosts = JSON.parse(localStorage.getItem("filtredPosts"))
    if (filtredPosts != null){
        let initialPosts = posts.slice(0, 30)
        BlogGenerics.loadPostCards(initialPosts);

        let pagination = document.getElementById("pagination")
        let buttons = pagination.getElementsByTagName("button")
        for (let button of buttons){
            button.disabled = true;
        }
        

        localStorage.setItem("filtredPosts", null)
    }else{
        let initialPosts = posts.slice(0, 10)
        BlogGenerics.loadPostCards(initialPosts)
    }

    BlogGenerics.funcionalityLinks ()
}

document.getElementById("find-button").onclick = () => {
    let findText = document.getElementById("find-input").value
    let filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(findText.toLowerCase())
    );

    localStorage.setItem("filtredPosts", JSON.stringify(filteredPosts))
    window.location.href = "./_html.html"
}

document.getElementById("before").onclick = () => {
    if (page > 0){
        page --
        let start = page * numPageRegisters; 
        let end = start + numPageRegisters;
        let pagePosts = posts.slice(start, end)
        BlogGenerics.loadPostCards(pagePosts)
    }
}

document.getElementById("after").onclick = () => {
    const totalPosts = posts.length;
        const totalPages = Math.ceil(totalPosts / numPageRegisters);
        
        if (page < totalPages - 1) {
            page++;
            let start = page * numPageRegisters; 
            let end = start + numPageRegisters;
            let pagePosts = posts.slice(start, end)
            BlogGenerics.loadPostCards(pagePosts)
    }
}

function funcionalityDefaultPages () {
    let paginationDiv = document.getElementById("pagination")
    let defaultButtons = paginationDiv.getElementsByClassName("btn btn-outline-primary")


    for (let i = 0; i < defaultButtons.length; i++) {
        defaultButtons[i].onclick = () => {
            page = i
            let start = page * numPageRegisters; 
            let end = start + numPageRegisters;
            let pagePosts = posts.slice(start, end)
            BlogGenerics.loadPostCards(pagePosts)
        };
    }
}





