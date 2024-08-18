let open = document.querySelector(".open");
let close = document.querySelector(".close");
let closeModal = document.querySelector(".modal-close");
let bookmark = document.querySelector(".bookmark");
let bookmarkText = document.querySelector(".bookmark .btn-text");
let bookmarkSvg = document.querySelector(
  "section .intro-btns button:last-of-type svg"
);
let bookmarkSvgCircle = document.querySelector(
  "section .intro-btns button:last-of-type svg circle"
);
let form = document.querySelector(".modal form");
let backTheProject = document.querySelector(".intro button:first-of-type");
let inputRadios = document.querySelectorAll('.modal input[type="radio"]');
let inputNumbers = document.querySelectorAll('.modal input[type="number"]');
let nav = document.querySelector("nav ul");
let overlay = document.querySelector(".overlay");
let modal = document.querySelector(".modal");
let modalOptions = document.querySelectorAll(".modal form .option");
let modalPledge = document.querySelectorAll(".modal .pledge");
let success = document.querySelector(".success");
let successBtn = document.querySelector(".success button");
let continueBtn = document.querySelectorAll(
  ".modal form .option .pledge .amount button"
);
let options = document.querySelectorAll(".about .option");
let selectReward = document.querySelectorAll(".about button");
let errorMsg = document.querySelectorAll(".modal form .option .msg");
const inputValues = { 0: 0, 1: 25, 2: 75, 3: 200 };
let progressBar = document.querySelector(".count .progress-bar div");

let amountBacked = document.querySelector(".count .stat:first-of-type h1");
let totalBackers = document.querySelector(".count .stat:nth-of-type(3) h1");

let stockLeft = document.querySelectorAll(".about .stock h1");

let width =
  (parseInt(amountBacked.textContent.replace(",", "").replace("$", "")) * 100) /
  100000;
progressBar.style.width = `${width}%`;

function stockCheck() {
  stockLeft.forEach((e, index) => {
    if (parseInt(e.textContent) < 1) {
      modalOptions[index + 1].style.color = "var(--Light-gray)";
      selectReward[index].disabled = true;
      selectReward[index].style.backgroundColor = "var(--Light-gray)";
      inputRadios[index + 1].disabled = true;
      modalOptions[index + 1].style.opacity = 0.5;
      options[index].style.opacity = 0.5;
      options[index].style.color = "var(--Light-gray)";
    }
  });
}

stockCheck();

//   --------------------  Navbar --------------------

open.addEventListener("click", () => {
  nav.style.transform = "translateX(-50%) scale(1)";
  nav.style.opacity = 1;
  open.style.display = "none";
  close.style.display = "block";
  overlay.style.opacity = "1";
});

close.addEventListener("click", () => {
  nav.style.transform = "translateX(-50%) scale(0)";
  nav.style.opacity = 0;
  open.style.display = "block";
  close.style.display = "none";
  overlay.style.opacity = "0";
});

//   --------------------  Bookmark --------------------------

bookmark.addEventListener("click", () => {
  bookmark.style.gap = "10px";
  bookmarkText.textContent = "Bookmarked";
  bookmark.style.color = "var(--Moderate-cyan)";
  bookmark.style.backgroundColor = "#f5f5f5";
  bookmarkSvgCircle.style.color = "var(--Moderate-cyan)";
  bookmarkSvg.style.color = "white";
});

//   --------------------  Form ---------

// ---------------------------- MODAL --------------------------

backTheProject.addEventListener("click", () => {
  modal.style.display = "flex";
  overlay.style.opacity = "1";
});

selectReward.forEach((reward, index) => {
  reward.addEventListener("click", () => {
    modal.style.display = "flex";
    overlay.style.opacity = "1";
    inputRadios[index + 1].checked = true;
    modalOptions[index].scrollIntoView();
    inputRadios.forEach((value, index) => {
      radioChecker(value, index);
    });
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  overlay.style.opacity = "0";
});

// ---------------------------- Inputs --------------------------

function radioChecker(e, index) {
  if (e.checked) {
    modalOptions[index].style.border = "2px solid var(--Dark-cyan)";
    modalPledge[index].style.height = "max-content";
  } else {
    modalOptions[index].style.border = "2px solid var(--Light-gray)";
    modalPledge[index].style.height = "0px";
  }
}

inputRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    inputRadios.forEach((e, index) => {
      radioChecker(e, index);
    });
  });
});

continueBtn.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (inputNumbers[index].value >= inputValues[index]) {
      errorMsg[index].style.display = "none";
      inputNumbers[index].style.border = "1px solid var(--Light-gray)";
      showSuccessMsg();
      updateValues(index - 1, inputNumbers[index].value);
      inputNumbers[index].value = "";
    } else {
      errorMsg[index].style.display = "block";
      inputNumbers[index].style.border = "1px solid rgb(255, 97, 97)";
    }

    document.addEventListener("click", (mouse) => {
      if (mouse.target !== btn) {
        errorMsg[index].style.display = "none";
        inputNumbers[index].style.border = "1px solid var(--Light-gray)";
      }
    });
  });
});

// --------------------------------------  Success Msg -------------------------

function showSuccessMsg() {
  success.style.display = "flex";
  modal.style.display = "none";
  document.body.style.overflow = "hidden";
  successBtn.addEventListener("click", () => {
    success.style.display = "none";
    document.body.style.overflow = "auto";
    overlay.style.opacity = "0";
  });
}
function updateValues(index, amount) {
  if (index >= 0) {
    stockLeft[index].textContent -= 1;
  }
  amountBacked.textContent =
    parseInt(amountBacked.textContent.replace(",", "").replace("$", "")) +
    parseInt(amount);

  totalBackers.textContent =
    parseInt(totalBackers.textContent.replace(",", "")) + 1;
  let width =
    (parseInt(amountBacked.textContent.replace(",", "").replace("$", "")) *
      100) /
    100000;
  progressBar.style.width = `${width}%`;
}
