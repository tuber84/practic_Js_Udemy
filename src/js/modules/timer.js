const timer = (id, deadline) => {
  const addZero = (num) => {
    // добавить "0" для цфтр "0-9"
    if (num <= 9) {
      return "0" + num;
    } else {
      return num;
    }
  };

  const getTimeRemaining = (endtime) => {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor(t / 1000) % 60; //остаток секунд
    const minutes = Math.floor((t / 1000 / 60) % 60); // остаток минут
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24); // остаток часов
    const days = Math.floor(t / (1000 * 60 * 60 * 24)); // остаток дней

    return {
      total: t,
      days: days,
      minutes: minutes,
      hours: hours,
      seconds: seconds,
    };
  };

  const setClock = (selector, endtime) => {
    //прописываем значения таймера непосредственно в элементы страницы
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");
    let timeInterval = setInterval(updateClock, 1000);

    updateClock(); // запускам заранее таймер, переписывая дуфолтные значения при верстке

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.textContent = addZero(t.days);
      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      if (t.total <= 0) {
        //остановка таймера при достижении дедлайна
        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        clearInterval(timeInterval);
      }
    }
  };
  setClock(id, deadline);
};

export default timer;
