"use strict";

let toDoList = {
  input: document.querySelector(".to-do-list__input"),
  svgArrow: document.querySelector(".to-do-list__svg-arrow"),
  items: document.querySelector(".to-do-list__items"),
  svgChecking: document.getElementsByClassName("to-do-list__svg-checking"),
  numberData: 0,
  itemLeft: document.querySelector(".to-do-list__left"),

  addItem() {
    this.input.addEventListener("keyup", (event) => {
      if (
        this.input.value != "" &&
        (event.code == "NumpadEnter" || event.code == "Enter")
      ) {
        this.items.insertAdjacentHTML(
          "afterbegin",
          `<div class="to-do-list__item">
          <svg class="to-do-list__svg-checking" width="20" height="20" data-checking="${this.numberData}">
            <circle
              cx="10"
              cy="10"
              r="9"
              fill="none"
              stroke="rgb(233,230,233)"
              stroke-width="1"
            />
          </svg>
          <span class="to-do-list__item-text" data-item-text="${this.numberData}">
            ${this.input.value}
          </span>
          </div>
          `
        );
        this.input.value = "";
        this.numberData++;
      }
    });
  },

  hideItems() {
    this.svgArrow.addEventListener("click", () => {
      this.items.classList.toggle("hide-items");
    });
  },

  rotateArrow() {
    this.svgArrow.addEventListener("click", (event) => {
      this.svgArrow.classList.toggle("to-do-list__svg-arrow_rotate");
    });
  },

  throughItems() {
    this.items.addEventListener("click", function (event) {
      if (event.target.closest(".to-do-list__svg-checking")) {
        let checking = event.target.closest(".to-do-list__svg-checking").dataset
          .checking;
        let itemText = document.getElementsByClassName("to-do-list__item-text");
        for (const iItem of itemText) {
          if (iItem.dataset.itemText == checking) {
            iItem.classList.toggle("line-through-opacity");
            event.target.insertAdjacentHTML(
              "afterbegin",
              `<line
            x1="10"
            x2="4"
            y1="17"
            y2="10"
            stroke="rgba(113,191,154, 0.9)"
            stroke-width="2"
          />
          <line
            x1="10"
            x2="15"
            y1="17"
            y2="5"
            stroke="rgba(113,191,154, 0.9)"
            stroke-width="2"
          />`
            );
            if (!iItem.classList.contains("line-through-opacity")) {
              let delV = document.querySelectorAll(
                `.to-do-list__svg-checking[data-checking="${checking}"] > line`
              );
              delV.forEach((elem) => {
                elem.remove();
              });
            }
          }
        }
      }
    });
  },

  counterItems() {
    this.items.addEventListener("click", (event) => {
      let itemTextCount = document.getElementsByClassName(
        "line-through-opacity"
      ).length;
      let counter = +this.numberData - +itemTextCount;
      this.itemLeft.textContent = `${counter} items left`;
    });
    this.input.addEventListener("keyup", (event) => {
      if (event.code == "NumpadEnter" || event.code == "Enter") {
        let itemTextCount = document.getElementsByClassName(
          "line-through-opacity"
        ).length;
        let counter = +this.numberData - +itemTextCount;
        this.itemLeft.textContent = `${counter} items left`;
      }
    });
  },

  deleteItems() {
    let clearButton = document.querySelector(".to-do-list__clear");
    clearButton.addEventListener("click", (event) => {
      let throughItems = document.querySelectorAll(".line-through-opacity");

      if (throughItems) {
        this.numberData -= throughItems.length;
        throughItems.forEach((item) => {
          item.closest(".to-do-list__item").remove();
        });
      }
    });
  },

  activeItems() {
    let activeButton = document.querySelector(".to-do-list__active");
    activeButton.addEventListener("click", () => {
      let throughItems = document.querySelectorAll(".line-through-opacity");
      if (throughItems) {
        throughItems.forEach((item) => {
          item.closest(".to-do-list__item").classList.add("hide-items");
        });
      }
    });
  },

  allItem() {
    let allButton = document.querySelector(".to-do-list__all");
    allButton.addEventListener("click", () => {
      let hideItems = document.querySelectorAll(
        ".to-do-list__items > .hide-items"
      );
      if (hideItems) {
        hideItems.forEach((item) => {
          item.classList.remove("hide-items");
        });
      }
    });
  },
};

toDoList.addItem();
toDoList.hideItems();
toDoList.rotateArrow();
toDoList.throughItems();
toDoList.counterItems();
toDoList.deleteItems();
toDoList.activeItems();
toDoList.allItem();
