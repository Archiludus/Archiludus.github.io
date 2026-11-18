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
        "images/archiludus/archiludus03.jpg"
    ],

    portfolio: [
        "images/portfolio/portfolio01.jpg",
        "images/portfolio/portfolio02.jpg",
        "images/portfolio/portfolio03.jpg"
    ]

};


/* ========================================
   全カテゴリーの画像をひとつにまとめる
======================================== */

const allImages =
    Object.values(imageGroups).flat();


/* ========================================
   HTML要素を取得
======================================== */

const background =
    document.getElementById("backgroundImage");

const categoryLinks =
    document.querySelectorAll(".category-link");


/* ========================================
   現在使っている画像グループ
======================================== */

let currentImages = allImages;

let lastImage = "";

let slideshowTimer;


/* ========================================
   画像を事前に読み込む
======================================== */

allImages.forEach((imagePath) => {

    const image = new Image();

    image.src = imagePath;

});


/* ========================================
   ランダムに画像を選ぶ
======================================== */

function getRandomImage(images) {

    /*
       画像が1枚しかない場合
    */

    if (images.length === 1) {
        return images[0];
    }


    let selectedImage;


    /*
       直前と同じ画像が出ないようにする
    */

    do {

        const randomNumber =
            Math.floor(
                Math.random() * images.length
            );

        selectedImage =
            images[randomNumber];

    } while (
        selectedImage === lastImage
    );


    lastImage = selectedImage;

    return selectedImage;

}


/* ========================================
   背景画像を変更
======================================== */

function changeBackground() {

    if (currentImages.length === 0) {
        return;
    }


    const nextImage =
        getRandomImage(currentImages);


    /*
       一度透明にする
    */

    background.style.opacity = 0;


    /*
       画像を変更
    */

    setTimeout(() => {

        background.style.backgroundImage =
            `url("${nextImage}")`;


        /*
           再び表示
        */

        background.style.opacity = 1;

    }, 250);

}


/* ========================================
   スライドショー開始
======================================== */

function startSlideshow() {

    /*
       既存タイマーを解除
    */

    clearInterval(slideshowTimer);


    /*
       カーソル移動時にすぐ画像を変える
    */

    changeBackground();


    /*
       その後1秒ごとに変更
    */

    slideshowTimer =
        setInterval(
            changeBackground,
            1000
        );

}


/* ========================================
   Architecture / Game 等へのカーソル操作
======================================== */

categoryLinks.forEach((link) => {

    /*
       カーソルが乗った時
    */

    link.addEventListener(
        "mouseenter",
        () => {

            const category =
                link.dataset.category;


            /*
               そのカテゴリーだけに変更
            */

            currentImages =
                imageGroups[category];


            /*
               前回画像をリセット
            */

            lastImage = "";


            /*
               スライドショーを再スタート
            */

            startSlideshow();

        }
    );


    /*
       カーソルが離れた時
    */

    link.addEventListener(
        "mouseleave",
        () => {

            /*
               全作品へ戻す
            */

            currentImages =
                allImages;


            lastImage = "";


            startSlideshow();

        }
    );

});


/* ========================================
   最初のスライドショー
======================================== */

startSlideshow();