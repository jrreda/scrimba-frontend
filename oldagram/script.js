const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21,
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4,
    },
    {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment:
            "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152,
    },
];

const postContainer = document.querySelector(".post-container");

const createPost = (post) => {
    return `
        <section class="post">
            <div class="post-header">
                <img class="avatar" src="${post.avatar}" alt="user-avatar image">
                <div class="post-header-info">
                    <p class="username">${post.name}</p>
                    <p class="location">${post.location}</p>
                </div>
            </div>
            <img class="post-image" src="${post.post}" alt="post image">
            <div class="post-footer">
                <div class="post-icons">
                    <img class="icon like-icon" src="images/icon-heart.png" alt="like icon">
                    <img class="icon" src="images/icon-comment.png" alt="comment icon">
                    <img class="icon" src="images/icon-dm.png" alt="share icon">
                </div>
                <p class="likes">${post.likes} likes</p>
                <p class="caption">
                    <span class="username">${post.username}</span>
                    ${post.comment}
                </p>
        </section>
    `;
};

// render posts
posts.forEach((post) => {
    postContainer.insertAdjacentHTML("beforeend", createPost(post));
});

// add like icon functionality
const likeIcons = document.querySelectorAll(".like-icon");
likeIcons.forEach((likeIcon) => {
    likeIcon.addEventListener("click", () => {
        const likes = likeIcon.closest(".post").querySelector(".likes");
        const likesCount = parseInt(likes.textContent.split(" ")[0]);

        if (likeIcon.classList.contains("liked")) {
            likes.textContent = `${likesCount - 1} likes`;
            likeIcon.src = "images/icon-heart.png";
        } else {
            likes.textContent = `${likesCount + 1} likes`;
            likeIcon.src = "images/heart-fill.svg";
        }

        likeIcon.classList.toggle("liked");
    });
});
