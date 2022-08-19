const forms = () => {
  const form = document.querySelectorAll("form");
  const inputs = document.querySelectorAll("input");
  const phoneIntuts = document.querySelectorAll('input[name="user_phone"]');

  phoneIntuts.forEach((item) => {
    item.addEventListener("input", () => {
      item.value = item.value.replace(/\D/, "");
    });
  });

  const message = {
    loading: "Загрузка...",
    success: "Спасибо, с вами свяжутся",
    failure: "Somthing whrong",
  };

  const postData = async (url, data) => {
    document.querySelector(".status").textContent = message.loading; //выводим сообщение: "загрузка"

    let res = await fetch(url, {
      method: "POST",
      body: data,
    });
    return await res.text();
  };

  const clearInputs = () => {
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  form.forEach((item) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();

      //создаем элемент на странице для сообщения о ходе постинга
      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      item.appendChild(statusMessage);

      const formData = new FormData(item); //собираем все данные из формы

      postData("assets/server.php", formData)
        .then((res) => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch(() => {
          statusMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  });
};

export default forms;
