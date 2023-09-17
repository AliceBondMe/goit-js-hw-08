import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector(".feedback-form"),
    email: document.querySelector(".feedback-form input"),
    message: document.querySelector(".feedback-form textarea"),
}

const FORM_STATE_KEY = "feedback-form-state";
const formStateObj = JSON.parse(localStorage.getItem(FORM_STATE_KEY)) ?? {};

refs.email.value = formStateObj.email ?? "";
refs.message.value = formStateObj.message ?? "";

refs.form.addEventListener("input", throttle(handleInput, 500));
refs.form.addEventListener("submit", handleSubmit);

function handleInput(evt) {
    if (evt.target.name === "email") {
        formStateObj.email = evt.target.value;
    } else if (evt.target.name === "message") {
        formStateObj.message = evt.target.value;
    }

    localStorage.setItem(FORM_STATE_KEY, JSON.stringify(formStateObj));
}

function handleSubmit(evt) {
    evt.preventDefault();
  const { email, message } = evt.currentTarget.elements;
  if (email.value.trim() === "" || message.value.trim() === "") {
    return alert("All fields must be filled! Space doesn`t count");
  }
    const formSubmitObj = {
    email: email.value.trim(),
    message: message.value.trim(),
  };
    console.dir(formSubmitObj);
    evt.currentTarget.reset();
    localStorage.removeItem(FORM_STATE_KEY);
    formSubmitObj = {};
}