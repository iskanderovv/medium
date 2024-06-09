const dashboardForm = document.querySelector('.dashboard-post__form');
const postTitle = document.querySelector('#post-title');
const postImg = document.querySelector('#post-img');
const postTag = document.querySelector('#post-tag');
const postBtn = document.querySelector('.create-post-btn__button');
const addTag = document.querySelector('.post-tag-btn');
const postDescr = document.querySelector('.post-description');
const dashboardHeading = document.querySelector('.dashboard-items__heading');

dashboardHeading.textContent = localStorage.getItem('email');

function Post(title, description, image, tags, author) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.tags = tags;
    this.author = author;
}

const createPost = (e) => {
    e.preventDefault();
    let postData = new Post(postTitle.value, postDescr.value, postImg.value, postTag.value, 'Akbar Iskandarov');
    console.log(postData);

    const tokenUser = JSON.parse(localStorage.getItem('token'));

    fetch("https://blogpost-server-production-d92d.up.railway.app/api/v1/blogs", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenUser}`
        },
        body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

postBtn.addEventListener('click', createPost);
