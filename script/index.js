const swiperSlide = document.querySelector('.swiper-wrapper');


const truncate = (text, limit) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
};


const base64EncodeUnicode = (str) => {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode('0x' + p1);
    }));
};


const getData = (blogs) => {
    blogs.forEach(blog => {
        console.log(blog);
        const { description, title, image, author } = blog;
        swiperSlide.innerHTML += `
            <a href="../pages/single-post.html?blog-data=${base64EncodeUnicode(JSON.stringify(blog))}" class="swiper-slide">
                <img src="${image}" alt="">
                <div class="swiper-slide__body">
                    <h4 class="swiper-slide__title">${truncate(title, 20)}</h4>
                    <p class="swiper-slide__info">${truncate(description, 60)}</p>
                    <div class="swiper-slide__author">
                        <img src="./images/avatar.png" alt="avatar" class="swiper-slide-author__img">
                        <div class="swiper-slide-author__about">
                            <h5 class="swiper-slide-author__name">${author}</h5>
                            <small class="swiper-slide-author__role">Author</small>
                        </div>
                    </div>
                </div>
            </a>
        `;
    });

    swiper.update();
};


let swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});


fetch("https://blogpost-server-production-d92d.up.railway.app/api/v1/blogs")
    .then(res => res.json())
    .then(data => getData(data.data))
    .catch(error => console.error('Error fetching data:', error));
