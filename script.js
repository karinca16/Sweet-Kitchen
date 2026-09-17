// ========================================
// DATA RESEP
// ========================================

const recipes = [
    {
        name: "Strawberry Cake",
        description: "Buat kue strawberry yang manis dan lezat!",
        food: "🍰",

        ingredients: [
            {
                name: "Tepung",
                emoji: "🌾"
            },
            {
                name: "Telur",
                emoji: "🥚"
            },
            {
                name: "Susu",
                emoji: "🥛"
            },
            {
                name: "Cream",
                emoji: "🍦"
            },
            {
                name: "Strawberry",
                emoji: "🍓"
            }
        ]
    },

    {
        name: "Chocolate Cake",
        description: "Buat chocolate cake yang lembut dan manis!",
        food: "🍫",

        ingredients: [
            {
                name: "Tepung",
                emoji: "🌾"
            },
            {
                name: "Telur",
                emoji: "🥚"
            },
            {
                name: "Cokelat",
                emoji: "🍫"
            },
            {
                name: "Susu",
                emoji: "🥛"
            },
            {
                name: "Cream",
                emoji: "🍦"
            }
        ]
    },

    {
        name: "Fruit Pancake",
        description: "Buat pancake dengan topping buah segar!",
        food: "🥞",

        ingredients: [
            {
                name: "Tepung",
                emoji: "🌾"
            },
            {
                name: "Telur",
                emoji: "🥚"
            },
            {
                name: "Susu",
                emoji: "🥛"
            },
            {
                name: "Pisang",
                emoji: "🍌"
            },
            {
                name: "Strawberry",
                emoji: "🍓"
            }
        ]
    }
];


// ========================================
// SEMUA BAHAN
// ========================================

const allIngredients = [
    {
        name: "Tepung",
        emoji: "🌾"
    },
    {
        name: "Telur",
        emoji: "🥚"
    },
    {
        name: "Susu",
        emoji: "🥛"
    },
    {
        name: "Cream",
        emoji: "🍦"
    },
    {
        name: "Strawberry",
        emoji: "🍓"
    },
    {
        name: "Cokelat",
        emoji: "🍫"
    },
    {
        name: "Pisang",
        emoji: "🍌"
    },
    {
        name: "Keju",
        emoji: "🧀"
    },
    {
        name: "Mentega",
        emoji: "🧈"
    },
    {
        name: "Gula",
        emoji: "🍚"
    }
];


// ========================================
// ELEMENT
// ========================================

const startScreen =
    document.getElementById("startScreen");

const gameScreen =
    document.getElementById("gameScreen");

const resultScreen =
    document.getElementById("resultScreen");

const startButton =
    document.getElementById("startButton");

const restartButton =
    document.getElementById("restartButton");

const cookButton =
    document.getElementById("cookButton");

const scoreElement =
    document.getElementById("score");

const livesElement =
    document.getElementById("lives");

const timerElement =
    document.getElementById("timer");

const recipeName =
    document.getElementById("recipeName");

const recipeDescription =
    document.getElementById("recipeDescription");

const orderFood =
    document.getElementById("orderFood");

const ingredientsContainer =
    document.getElementById("ingredients");

const selectedContainer =
    document.getElementById("selectedIngredients");

const recipeSteps =
    document.getElementById("recipeSteps");

const progress =
    document.getElementById("progress");

const progressText =
    document.getElementById("progressText");

const bowlFood =
    document.getElementById("bowlFood");

const panFood =
    document.getElementById("panFood");


// ========================================
// POPUP
// ========================================

const popup =
    document.getElementById("popup");

const popupIcon =
    document.getElementById("popupIcon");

const popupTitle =
    document.getElementById("popupTitle");

const popupMessage =
    document.getElementById("popupMessage");

const popupButton =
    document.getElementById("popupButton");


// ========================================
// RESULT
// ========================================

const resultFood =
    document.getElementById("resultFood");

const resultIcon =
    document.getElementById("resultIcon");

const resultTitle =
    document.getElementById("resultTitle");

const resultMessage =
    document.getElementById("resultMessage");

const finalScore =
    document.getElementById("finalScore");


// ========================================
// GAME VARIABLES
// ========================================

let currentRecipe = 0;
let currentStep = 0;
let selectedIngredients = [];

let score = 0;
let lives = 3;
let time = 60;

let timer;


// ========================================
// SOUND EFFECT
// ========================================

// File suara disimpan di folder:
// sounds/
// ├── click.mp3
// ├── correct.mp3
// ├── wrong.mp3
// ├── cooking.mp3
// └── success.mp3

const sounds = {
    click: new Audio("sounds/click.mp3"),
    correct: new Audio("sounds/correct.mp3"),
    wrong: new Audio("sounds/wrong.mp3"),
    cooking: new Audio("sounds/cooking.mp3"),
    success: new Audio("sounds/success.mp3")
};


// Mengatur volume setiap suara
sounds.click.volume = 0.5;
sounds.correct.volume = 0.7;
sounds.wrong.volume = 0.6;
sounds.cooking.volume = 0.5;
sounds.success.volume = 0.8;


// ========================================
// FUNGSI MEMAINKAN SOUND
// ========================================

function playSound(sound) {

    sound.currentTime = 0;

    sound.play().catch(() => {
        // Browser dapat memblokir audio
        // sebelum user melakukan interaksi.
    });

}


// ========================================
// START GAME
// ========================================

startButton.addEventListener(
    "click",
    startGame
);


function startGame() {

    // Sound tombol mulai
    playSound(sounds.click);

    currentRecipe = 0;
    score = 0;
    lives = 3;
    time = 60;

    scoreElement.textContent = score;
    livesElement.textContent = lives;
    timerElement.textContent = time;

    startScreen.classList.add("hidden");

    resultScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    clearInterval(timer);

    timer = setInterval(
        updateTimer,
        1000
    );

    loadRecipe();

}


// ========================================
// TIMER
// ========================================

function updateTimer() {

    time--;

    timerElement.textContent = time;

    // Jika waktu hampir habis
    if (time <= 10 && time > 0) {
        timerElement.style.color = "#e74c3c";
    }

    if (time <= 0) {

        clearInterval(timer);

        showResult(false);

    }

}


// ========================================
// LOAD RECIPE
// ========================================

function loadRecipe() {

    const recipe =
        recipes[currentRecipe];

    currentStep = 0;

    selectedIngredients = [];

    recipeName.textContent =
        recipe.name;

    recipeDescription.textContent =
        recipe.description;

    orderFood.textContent =
        recipe.food;

    bowlFood.textContent =
        "🥣";

    panFood.textContent =
        "🥣";

    cookButton.disabled = true;

    cookButton.classList.remove("ready");

    cookButton.textContent =
        "🍳 Masak";

    // Reset warna timer
    timerElement.style.color = "";

    updateProgress();

    showIngredients();

    showRecipeSteps();

    showSelectedIngredients();

}


// ========================================
// SHOW INGREDIENTS
// ========================================

function showIngredients() {

    ingredientsContainer.innerHTML = "";

    const shuffled =
        [...allIngredients].sort(
            () => Math.random() - 0.5
        );

    shuffled.forEach(
        function (ingredient) {

            const button =
                document.createElement("button");

            button.className =
                "ingredient";

            button.innerHTML = `
                <span class="ingredient-emoji">
                    ${ingredient.emoji}
                </span>

                <span class="ingredient-name">
                    ${ingredient.name}
                </span>
            `;

            button.addEventListener(
                "click",
                function () {

                    selectIngredient(
                        ingredient,
                        button
                    );

                }
            );

            ingredientsContainer.appendChild(
                button
            );

        }
    );

}


// ========================================
// SELECT INGREDIENT
// ========================================

function selectIngredient(
    ingredient,
    button
) {

    const recipe =
        recipes[currentRecipe];

    const correctIngredient =
        recipe.ingredients[currentStep];


    // ========================================
    // BENAR
    // ========================================

    if (
        ingredient.name ===
        correctIngredient.name
    ) {

        // Sound benar
        playSound(sounds.correct);

        score += 10;

        scoreElement.textContent =
            score;

        selectedIngredients.push(
            ingredient
        );

        button.classList.add(
            "used"
        );

        button.disabled = true;

        currentStep++;

        bowlFood.textContent =
            ingredient.emoji;

        showSelectedIngredients();

        updateProgress();

        showRecipeSteps();


        // ========================================
        // SEMUA BAHAN SUDAH BENAR
        // ========================================

        if (
            currentStep >=
            recipe.ingredients.length
        ) {

            cookButton.disabled = false;

            cookButton.classList.add(
                "ready"
            );

            cookButton.textContent =
                "🔥 Masak Sekarang!";

        }

    }


    // ========================================
    // SALAH
    // ========================================

    else {

        // Sound salah
        playSound(sounds.wrong);

        score -= 5;

        if (score < 0) {
            score = 0;
        }

        scoreElement.textContent =
            score;

        lives--;

        livesElement.textContent =
            lives;

        button.classList.add(
            "wrong"
        );

        setTimeout(
            function () {

                button.classList.remove(
                    "wrong"
                );

            },
            400
        );


        // ========================================
        // GAME OVER
        // ========================================

        if (lives <= 0) {

            clearInterval(timer);

            showResult(false);

        }

    }

}


// ========================================
// SELECTED INGREDIENTS
// ========================================

function showSelectedIngredients() {

    selectedContainer.innerHTML = "";


    if (
        selectedIngredients.length === 0
    ) {

        selectedContainer.innerHTML = `
            <span class="empty-text">
                Belum ada bahan
            </span>
        `;

        return;
    }


    selectedIngredients.forEach(
        function (ingredient) {

            const item =
                document.createElement("div");

            item.className =
                "selected-item";

            item.textContent =
                ingredient.emoji +
                " " +
                ingredient.name;

            selectedContainer.appendChild(
                item
            );

        }
    );

}


// ========================================
// PROGRESS
// ========================================

function updateProgress() {

    const recipe =
        recipes[currentRecipe];

    const total =
        recipe.ingredients.length;

    const percentage =
        (currentStep / total) * 100;

    progress.style.width =
        percentage + "%";

    progressText.textContent =
        currentStep +
        " / " +
        total;

}


// ========================================
// RECIPE STEPS
// ========================================

function showRecipeSteps() {

    const recipe =
        recipes[currentRecipe];

    recipeSteps.innerHTML = "";

    recipe.ingredients.forEach(
        function (ingredient, index) {

            const step =
                document.createElement("div");

            step.className =
                "recipe-step";


            if (
                index < currentStep
            ) {

                step.classList.add(
                    "done"
                );

            }


            if (
                index === currentStep
            ) {

                step.classList.add(
                    "active"
                );

            }


            step.textContent =
                (index + 1) +
                ". " +
                ingredient.emoji +
                " " +
                ingredient.name;

            recipeSteps.appendChild(
                step
            );

        }
    );

}


// ========================================
// COOK
// ========================================

cookButton.addEventListener(
    "click",
    cookFood
);


function cookFood() {

    if (
        currentStep <
        recipes[currentRecipe]
            .ingredients.length
    ) {

        return;

    }


    // Sound mulai memasak
    playSound(sounds.cooking);

    cookButton.disabled = true;

    cookButton.textContent =
        "🔥 Sedang memasak...";

    panFood.textContent =
        "🔥";

    bowlFood.textContent =
        "🥣";


    // Animasi / proses memasak
    setTimeout(
        function () {

            finishCooking();

        },
        2000
    );

}


// ========================================
// FINISH COOKING
// ========================================

function finishCooking() {

    const recipe =
        recipes[currentRecipe];

    panFood.textContent =
        recipe.food;

    bowlFood.textContent =
        recipe.food;

    score += 20;

    scoreElement.textContent =
        score;

    // Sound berhasil
    playSound(sounds.success);

    showPopup(
        "🎉",
        "Masakan Jadi!",
        recipe.name +
        " berhasil dibuat!"
    );

}


// ========================================
// POPUP
// ========================================

function showPopup(
    icon,
    title,
    message
) {

    popupIcon.textContent =
        icon;

    popupTitle.textContent =
        title;

    popupMessage.textContent =
        message;

    popup.classList.remove(
        "hidden"
    );

}


// ========================================
// POPUP BUTTON
// ========================================

popupButton.addEventListener(
    "click",
    function () {

        // Sound tombol
        playSound(sounds.click);

        popup.classList.add(
            "hidden"
        );

        currentRecipe++;


        // ========================================
        // SEMUA RESEP SELESAI
        // ========================================

        if (
            currentRecipe >=
            recipes.length
        ) {

            showResult(true);

        }

        else {

            loadRecipe();

        }

    }
);


// ========================================
// RESULT
// ========================================

function showResult(success) {

    clearInterval(timer);

    gameScreen.classList.add(
        "hidden"
    );

    resultScreen.classList.remove(
        "hidden"
    );


    if (success) {

        resultFood.textContent =
            "🍰";

        resultIcon.textContent =
            "👑";

        resultTitle.textContent =
            "Chef Hebat!";

        resultMessage.textContent =
            "Semua pesanan berhasil kamu buat!";

        // Sound kemenangan
        playSound(sounds.success);

    }

    else {

        resultFood.textContent =
            "🥺";

        resultIcon.textContent =
            "💗";

        resultTitle.textContent =
            "Coba Lagi!";

        resultMessage.textContent =
            "Jangan menyerah, coba masak lagi!";

        // Sound gagal
        playSound(sounds.wrong);

    }


    finalScore.textContent =
        score;

}


// ========================================
// RESTART
// ========================================

restartButton.addEventListener(
    "click",
    function () {

        // Sound tombol
        playSound(sounds.click);

        resultScreen.classList.add(
            "hidden"
        );

        startScreen.classList.remove(
            "hidden"
        );

    }
);