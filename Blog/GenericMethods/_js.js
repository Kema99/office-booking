import { loadJson } from "../Json/GenericMethods/_js.js"

function loadFeaturedPostCard(postCardsContainer, post, relatedPosts){
    relatedPosts.unshift(post);

    postCardsContainer.innerHTML += `<div class="row justify-content-center mb-3">
    <article class="col-md-8">
        <a href="#" data-info='${JSON.stringify(relatedPosts)}'>
            <div class="card card-custom">
                <img class="card-img-top" src="${post.imageSrc}"
                    alt="Post Title Image" />
                <div class="card-body">
                    <h3 class="card-title">${post.title}</h3>
                    <p class="card-subtitle text-muted">${post.subtitle}</p>
                    <footer class="blockquote-footer mt-2">
                        Published on:
                        <time datetime="2024-10-01">${post.publicationDate}</time>
                    </footer>
                </div>
            </div>
        </a>
    </article>
</div>`
}

function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function loadHeaer(){
    document.body.innerHTML += `
    <header class="bg-primary text-white text-center">
      <nav class="navbar bg-body-primary text-white px-4">
        <div class="container-fluid">
          <h1 class="h3">Office Booking</h1>
          <ul class="navbar-nav flex-row">
            <li class="nav-item mx-2">
              <a class="nav-link text-white" href="../../Home/_html.html">Blog Home</a>
            </li>
            <li class="nav-item mx-2">
                <a class="nav-link text-white" href="../AllPosts/_html.html">Posts</a>
            </li>
            <li class="nav-item mx-2">
              <a class="nav-link text-white" href="../../../_html.html"><span>Office Booking</span></a>
            </li>
          </ul>
        </div>
      </nav>
    </header>`
}

function loadFooter(){
    document.body.innerHTML += `
    <footer class="text-center bg-dark text-white py-4">
        <div class="container">
            <ul class="navbar-nav flex-row justify-content-center mb-4">
                <li class="nav-item mx-2">
                    <a class="nav-link" href="../../Home/_html.html">Blog Home</a>
                </li>

                <li class="nav-item mx-2">
                    <a class="nav-link" href="../AllPosts/_html.html">Posts</a>
                </li>

                <li class="nav-item mx-2">
                    <a class="nav-link" href="../../../_html.html"><span>Office Booking</span></a>
                </li>
            </ul>
            <p>&copy; 2024 Office Booking. All rights reserved.</p>
        </div>
    </footer>`
}

function loadSection (section){
    let article = document.getElementById("article")


    if (section.subsections.length == 0){
        
    let sectionTextHighlighted = highlightWords(section.text, section.highlightedWords)
        article.innerHTML += ` 
        <section class="mb-4">
            <h3 class="mb-4">${section.title}</h3>
            <p>${sectionTextHighlighted}</p>
        </section>
        <hr>`
    }else{
        let articleSubsections = `<section class="mb-4">
        <h3 class="mb-4">${section.title}</h3>
        <div class="row">`;
        for(let subsection of section.subsections){
            let subsectionTextHighlighted = highlightWords(subsection.text, subsection.highlightedWords)
        articleSubsections += `
            <div class="col-md-12 mb-3">
                <h4>${subsection.title}</h4>
                <p>${subsectionTextHighlighted}</p>
            </div>`
        }
        articleSubsections += `</div>
        </section>
        <hr>`

        article.innerHTML += articleSubsections
    }
}

function highlightWords(text, highlightedWords) {
    highlightedWords.forEach(highlightedWord => {
        text = text.split(highlightedWord).join(`<strong>${highlightedWord}</strong>`);
    });
    return text;
}

export function loadFeaturedPostCards (posts) {
    let postCardsContainer = document.getElementById('featured-post-card-container');
    removeAllChildren(postCardsContainer)
    for (let post of posts){
        if (post.featured === true) {
            let relatedPosts = posts.filter(postsList => postsList.id === post.id);
            loadFeaturedPostCard(postCardsContainer, post, relatedPosts)
        }
    }
}

export function loadPostCards (posts) {
    let postCardsContainer = document.getElementById('featured-post-card-container');
    removeAllChildren(postCardsContainer)
    for (let post of posts){
        let relatedPosts = posts.filter(postsList => post.relatedPosts.includes(postsList.id));
        loadFeaturedPostCard(postCardsContainer, post, relatedPosts)
    }
}

export async function loadPostMain () {
    let post = JSON.parse(localStorage.getItem("post"))
    let main = document.getElementById("main")

    let sections = await loadJson("../../Json/Sections/_json.json")
    let postSections = sections.filter(section => section.idPost === post[0].id);

    let image = ""


    if(post[0].imageSrc != null){
        image = `
            <div class="img-container">
                <img src="${post[0].imageSrc}" alt="Post Image" class="img-fluid">
            </div>`
    }

    main.innerHTML += `
    <article id="article">
        <h2 class="mb-4">${post[0].title}</h2>

        <section class="mb-4">
            <h3>Introduction</h3>
            <p>${post[0].subtitle}</p>
            ${image}
        </section>
    </article>`

    for (let section of postSections) {
        loadSection(section)
    }

    main.innerHTML += `<div id="featured-post-card-container" class="container"><p>a</p></div>`

    post.shift()

    loadPostCards(post)
    funcionalityLinks ()
}

export function funcionalityLinks (){
    let postsContainer = document.getElementById("featured-post-card-container")
    let links = postsContainer.getElementsByTagName("a")

    for (let link of links){
        link.onclick = () => {
            let dataInfo = link.getAttribute('data-info');
            localStorage.setItem("post", dataInfo)
            dataInfo = JSON.parse(dataInfo)
            window.location.href = dataInfo[0].url
        }
    }
}

export function loadBody (){
    loadHeaer()
    document.body.innerHTML += `<main id="main" class="custom-container my-4 mx-auto"></main>`
    loadFooter()
    document.body.innerHTML += `<script type="module" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="../../Json/GenericMethods/_js.js"></script>
    <script type="module" src="../../GenericMethods/_js.js"></script>
    <noscript>
        <p>Your browser does not support JavaScript, or it is disabled. Please enable JavaScript to view this content.</p>
    </noscript>
    
    `
}

