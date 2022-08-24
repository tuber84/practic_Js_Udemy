import checkNumInputs from "./chechNumInputs"; // проверка возможность ввода только цифр

const changeModalState = (state) => { // получение всех данных введенных в форму расчета стоимости
  const windowForm = document.querySelectorAll(".balcon_icons_img");
  const windowWidth = document.querySelectorAll("#width");
  const windowHeight = document.querySelectorAll("#height");
  const windowType = document.querySelectorAll("#view_type");
  const windowProfile = document.querySelectorAll(".checkbox");

  checkNumInputs("#width"); // проверка возможность ввода только цифр
  checkNumInputs("#height"); // проверка возможность ввода только цифр
//----------функция на elem накидывает опред обработчик событий event 
//--------------и записывает состоние ,что выбрано(prop) в state
  function bindActiontToElems(event, elem, prop) {
    //записываем в state состояние
    elem.forEach((item, i) => {
      item.addEventListener(event, () => {
        switch (item.nodeName) {
          case "SPAN":
            state[prop] = i;
            break;
          case "INPUT":
            if (item.getAttribute("type") === "checkbox") {
              i === 0 ? (state[prop] = "Холодное") : (state[prop] = "Теплое");
              
              elem.forEach((box, j) => {// возможность выбора только одного чекбокса
                box.checked = false;
                if (i == j) {
                  box.checked = true;
                }
              }); 
            } else {
              state[prop] = item.value;
            }
            break;
          case "SELECT":
            state[prop] = item.value;
            break;
        }
        console.log(state);
      });
    });
  }

  bindActiontToElems("click", windowForm, "form");
  bindActiontToElems("input", windowHeight, "height");
  bindActiontToElems("input", windowWidth, "width");
  bindActiontToElems("change", windowType, "type");
  bindActiontToElems("change", windowProfile, "profile");
};

export default changeModalState;
