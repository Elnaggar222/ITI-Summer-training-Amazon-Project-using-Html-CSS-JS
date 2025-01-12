const loginForm = document.querySelector(".form");
const emailInput = document.querySelector("input[name='email']");
const passInput = document.querySelector("input[name='password']");
const errorMessages = document.querySelectorAll(".input-error-text");

// Sample of valid email ==> s@ss.com
const isEmail = (emailValue) => {
  return /^[\w]+[a-zA-Z0-9]*@[a-zA-Z0-9]+\.(com|net|org)$/.test(emailValue);
};
// Sample of valid password ==> 1aA#sd
const isPassword = (passValue) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
    passValue
  );
};
const clearAnyErrors = (inputField) => {
  inputField.parentNode.classList.remove("form-container-error");
  inputField.nextElementSibling.innerText = "";
};
const highlightError = (inputField, errorMessage) => {
  inputField.parentNode.classList.add("form-container-error");
  inputField.nextElementSibling.innerText = errorMessage;
};
const validateFormInputs = () => {
  const emailValue = emailInput.value.trim();
  const passValue = passInput.value.trim();
  if (!emailValue) {
    highlightError(emailInput, "email is required");
  } else if (!isEmail(emailValue)) {
    highlightError(emailInput, "please enter a valid email");
  }
  if (!passValue) {
    highlightError(passInput, "password is required");
  } else if (passValue.length < 6) {
    highlightError(passInput, "password must be at least 6");
  } else if (!isPassword(passValue)) {
    highlightError(
      passInput,
      "Password must contain uppercase, lowercase, digits, and special characters,"
    );
  }
};
const validateFormEmail = () => {
  const emailValue = emailInput.value.trim();
  if (!emailValue) {
    highlightError(emailInput, "email is required");
  } else if (!isEmail(emailValue)) {
    highlightError(emailInput, "please enter a valid email");
  }
};
const validateFormPassword = () => {
  const passValue = passInput.value.trim();
  if (!passValue) {
    highlightError(passInput, "password is required");
  } else if (passValue.length < 6) {
    highlightError(passInput, "password must be at least 6");
  } else if (!isPassword(passValue)) {
    highlightError(
      passInput,
      "Password must contain uppercase, lowercase, digits, and special characters,"
    );
  }
};
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   clear any error from inputs before validation
  clearAnyErrors(emailInput);
  clearAnyErrors(passInput);
  //   start validation
  validateFormInputs();
  // Submit
  if (!errorMessages[0].innerText && !errorMessages[1].innerText) {
    const userInfo_Stored = JSON.parse(localStorage.getItem("userInfo"));
    if (emailInput.value.trim() !== userInfo_Stored.email) {
      Toastify({
        text: "This Email is not existed",
        duration: 3000,
        close: true,
        stopOnFocus: true,
        backgroundColor: "#e74c3c",
        className: "toastify-top",
      }).showToast();
    } else if (passInput.value.trim() !== userInfo_Stored.password) {
      Toastify({
        text: "Password is not correct",
        duration: 3000,
        close: true,
        stopOnFocus: true,
        backgroundColor: "#e74c3c",
        className: "toastify-top",
      }).showToast();
    } else {
      Toastify({
        text: "Login Successfully",
        duration: 3000,
        close: true,
        stopOnFocus: true,
        backgroundColor: "darkblue",
        className: "toastify-top",
      }).showToast();
      location.assign('../HomePage.html')
    }
  }
});
emailInput.addEventListener("blur", () => {
  clearAnyErrors(emailInput);
  validateFormEmail();
});
emailInput.addEventListener("input", () => {
  clearAnyErrors(emailInput);
  validateFormEmail();
});
passInput.addEventListener("blur", () => {
  clearAnyErrors(passInput);
  validateFormPassword();
});
passInput.addEventListener("input", () => {
  clearAnyErrors(passInput);
  validateFormPassword();
});
