const formEl = document.querySelector(".contacts__form");
const nameEl = document.querySelector(".contacts__form-name");
const phoneEl = document.querySelector(".contacts__form-phone");

formEl.addEventListener("submit", formSubmitHandler);
nameEl.addEventListener("input", nameClickHandler);
phoneEl.addEventListener("input", phoneClickHandler);

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const showError = (input) => {
  input.classList.remove("success");
  input.classList.add("error");
};

const showSuccess = (input) => {
  input.classList.remove("error");
  input.classList.add("success");
};

const checkName = () => {
  let valid = false;

  const min = 2,
    max = 25;
  const name = nameEl.value.trim();

  if (!isRequired(name)) {
    showError(nameEl);
  } else if (!isBetween(name.length, min, max)) {
    showError(nameEl);
  } else {
    showSuccess(nameEl);
    valid = true;
  }

  return valid;
};

const checkPhone = () => {
  let valid = false;

  const min = 10,
    max = 15;
  const phone = phoneEl.value.trim();

  if (!isRequired(phone)) {
    showError(phoneEl);
  } else if (!isBetween(phone.length, min, max)) {
    showError(phoneEl);
  } else {
    showSuccess(phoneEl);
    valid = true;
  }

  return valid;
};

function nameClickHandler(evt) {
  checkName();
  if (evt.target.value === "") {
    nameEl.classList.remove("error");
    nameEl.classList.remove("success");
  }
}

function phoneClickHandler(evt) {
  checkPhone();
  if (evt.target.value === "") {
    phoneEl.classList.remove("error");
    phoneEl.classList.remove("success");
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  let isNameValid = checkName();
  let isPhoneValid = checkPhone();

  if (isNameValid && isPhoneValid) {
    const name = nameEl.value.trim();
    const phone = phoneEl.value.trim();
    const data = {
      name: name,
      phone: phone,
    };
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Дані відправлено успішно");
          formEl.reset();
          phoneEl.classList.remove("error");
          phoneEl.classList.remove("success");
          nameEl.classList.remove("error");
          nameEl.classList.remove("success");
        } else {
          console.error("Помилка відправлення даних");
        }
      })
      .catch((error) => {
        console.error("Помилка відправлення даних:", error);
      });
  }
}
