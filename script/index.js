const swiperSlide = document.querySelector('.swiper-wrapper');

const getData = (blogs) => {
    blogs.forEach(blog => {
        const { description, title, image, author } = blog;
        console.log(blog);
        swiperSlide.innerHTML += `
            <div class="swiper-slide">
                    <img src="${image}" alt="">
                    <div class="swiper-slide__body">
                        <h4 class="swiper-slide__title">${title}</h4>
                        <p class="swiper-slide__info">${description}</p>
                        <div class="swiper-slide__author">
                            <img src="./images/avatar.png" alt="avatar" class="swiper-slide-author__img">
                            <div class="swiper-slide-author__about">
                                <h5 class="swiper-slide-author__name">${author}</h5>
                                <small class="swiper-slide-author__author">Author</small>
                            </div>
                        </div>
                    </div>
            </div>
        `
    })
}

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