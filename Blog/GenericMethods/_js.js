function loadFeaturedPostCard(post){
    let postCardsContainer = document.getElementById('featured-post-card-container');

    postCardsContainer.innerHTML += `<div class="row justify-content-center mb-3">
    <article class="col-md-8">
        <div class="card card-custom">
            <img class="card-img-top" src="${post.imageSrc}"
                alt="Post Title Image" />
            <div class="card-body">
                <h3 class="card-title"><a href="${post.url}">${post.title}</a></h3>
                <p class="card-subtitle text-muted">${post.subtitle}</p>
                <footer class="blockquote-footer mt-2">
                    Published on:
                    <time datetime="2024-10-01">${post.publicationDate}</time>
                </footer>
            </div>
        </div>
    </article>
</div>`
}

export function loadFeaturedPostCards (posts) {
    for (let post of posts){
        if (post.featured === true) {
            loadFeaturedPostCard(post)
        }
    }
}