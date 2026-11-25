/* ========================================
   各カテゴリーの画像
======================================== */

const imageGroups = {

    architecture: [
        "images/architecture/architecture01.jpg",
        "images/architecture/architecture02.jpg",
        "images/architecture/architecture03.jpg"
    ],

    game: [
        "images/game/game01.jpg",
        "images/game/game02.jpg",
        "images/game/game03.jpg"
    ],

    studies: [
        "images/studies/studies01.jpg",
        "images/studies/studies02.jpg",
        "images/studies/studies03.jpg"
    ],

    archiludus: [
        "images/archiludus/archiludus01.jpg",
        "images/archiludus/archiludus02.jpg",
        "images/archiludus/archiludus03.jpg",
        "images/archiludus/archiludus04.jpg",
        "images/archiludus/archiludus05.jpg",
        "images/archiludus/archiludus06.jpg",
        "images/archiludus/archiludus07.jpg",
        "images/archiludus/archiludus08.jpg",
        "images/archiludus/archiludus09.jpg",
        "images/archiludus/archiludus10.jpg",
        "images/archiludus/archiludus11.jpg",
        "images/archiludus/archiludus12.jpg"
    ],

    portfolio: [
        "images/portfolio/portfolio01.jpg",
        "images/portfolio/portfolio02.jpg",
        "images/portfolio/portfolio03.jpg"
    ]

};


/* ========================================
   全画像
======================================== */

const allImages =
    Object.values(imageGroups).flat();


/* ========================================
   HTML要素
======================================== */

const background =
    document.getElementById("backgroundImage");

const categoryLinks =
    document.querySelectorAll(".category-link");


/* ========================================
   状態
======================================== */

let currentImages = allImages;

let slideshowTimer;

let isHovering = false;

let currentIndex = 0;

let lastRandomImage = "";


/* ========================================
   画像を事前読み込み
======================================== */

allImages.forEach((imagePath) => {

    const image = new Image();

    image.src = imagePath;

});


/* ========================================
   通常時：ランダム画像
======================================== */

function getRandomImage(images) {

    if (images.length === 1) {
        return images[0];
    }

    let selectedImage;

    do {

        const randomNumber =
            Math.floor(Math.random() * images.length);

        selectedImage =
            images[randomNumber];

    } while (
        selectedImage === lastRandomImage
    );

    lastRandomImage = selectedImage;

    return selectedImage;
}


/* ========================================
   背景画像を変更
======================================== */

function changeBackground() {

    if (currentImages.length === 0) {
        return;
    }

    let nextImage;


    /* --------------------------------
       カーソルを合わせている場合
       → 順番に表示
    -------------------------------- */

    if (isHovering) {

        nextImage =
            currentImages[currentIndex];

        currentIndex++;

        if (currentIndex >= currentImages.length) {
            currentIndex = 0;
        }

    }


    /* --------------------------------
       通常時
       → ランダム表示
    -------------------------------- */

    else {

        nextImage =
            getRandomImage(currentImages);

    }


    /* --------------------------------
       0.1秒でフェードアウト
    -------------------------------- */

    background.style.opacity = 0;


    setTimeout(() => {

        background.style.backgroundImage =
            `url("${nextImage}")`;

        /* 0.1秒でフェードイン */

        background.style.opacity = 1;

    }, 100);

}


/* ========================================
   スライドショー開始
======================================== */

function startSlideshow() {

    clearInterval(slideshowTimer);

    changeBackground();

    slideshowTimer =
        setInterval(
            changeBackground,
            1000
        );
}


/* ========================================
   カテゴリーへのカーソル操作
======================================== */

categoryLinks.forEach((link) => {

    /* カーソルを合わせた時 */

    link.addEventListener(
        "mouseenter",
        () => {

            const category =
                link.dataset.category;

            currentImages =
                imageGroups[category];

            isHovering = true;

            /* 毎回1枚目から開始 */
            currentIndex = 0;

            startSlideshow();

        }
    );


    /* カーソルを離した時 */

    link.addEventListener(
        "mouseleave",
        () => {

            currentImages =
                allImages;

            isHovering = false;

            currentIndex = 0;

            startSlideshow();

        }
    );

});


/* ========================================
   最初のスライドショー
======================================== */

startSlideshow();
