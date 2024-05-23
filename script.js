
var posts = []
// Load posts from localStorage when the page loads
window.addEventListener("load", function () {
    // Check if posts exist in localStorage
    if (localStorage.getItem("posts")) {
        // Parse the stored JSON string into an array and assign it to the posts array
        posts = JSON.parse(localStorage.getItem("posts"));
        // Display the posts
        displayPosts();
    }
});

// Function to display blog posts
// Function to display blog posts
function displayPosts() {
    var postList = document.getElementById("post-list");
    postList.innerHTML = "";

    // Loop through posts array and create HTML elements for each post
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];

        var postElement = document.createElement("li");
        postElement.classList.add("post");

        var titleElement = document.createElement("h3");
        titleElement.textContent = post.title;

        var contentElement = document.createElement("p");
        contentElement.textContent = post.content;

        // Create closure to capture current value of i
        (function (index) {
            var modifyButton = document.createElement("button");
            modifyButton.textContent = "Modify";
            modifyButton.addEventListener("click", function () {
                modifyPost(index);
            });

            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function () {
                deletePost(index);
            });

            postElement.appendChild(titleElement);
            postElement.appendChild(contentElement);
            postElement.appendChild(modifyButton);
            postElement.appendChild(deleteButton);

            postList.appendChild(postElement);
        })(i); // Pass i as an argument to the closure
    }
}

// Function to handle form submission
function createPost(event) {
    event.preventDefault();

    var titleInput = document.getElementById("post-title");
    var contentInput = document.getElementById("post-content");

    var newPost = {
        title: titleInput.value,
        content: contentInput.value
    };

    posts.push(newPost);
    displayPosts();

    // Save posts to localStorage
    localStorage.setItem("posts", JSON.stringify(posts));

    titleInput.value = "";
    contentInput.value = "";
}

// Function to modify a post
function modifyPost(index) {
    var newTitle = prompt("Enter the new title:");
    var newContent = prompt("Enter the new content:");

    if (newTitle !== null && newContent !== null) {
        posts[index].title = newTitle;
        posts[index].content = newContent;
        displayPosts();
        localStorage.setItem("posts", JSON.stringify(posts));
    }
}

// Function to delete a post
function deletePost(index) {
    if (confirm("Are you sure you want to delete this post?")) {
        posts.splice(index, 1);
        displayPosts();
        localStorage.setItem("posts", JSON.stringify(posts));
    }
}

// Event listener for form submission
var postForm = document.getElementById("post-form");
postForm.addEventListener("submit", createPost);
