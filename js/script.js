(function () {
  let form = document.querySelector('.contact-form');
  let emailInput = document.querySelector('#contact-email');
  let telephoneInput = document.querySelector('#telephone');
  let clearTelephoneInput = document.querySelector('#btn-clear');

  clearTelephoneInput.addEventListener('click', () => {
    console.log(`clear button clicked`)
    telephoneInput.value = '';
    showErrorMessage(telephoneInput, null);
  })

  telephoneInput.addEventListener('keydown', (event) => {
    console.log(event); // all event related info
    console.log(event.type);
    console.log(event.key);
    console.log(event.code);

    //get the cursor position in the textbox (I'm only concerned with startPos for the purpose of handling cases where the user hits the Backspace key)
    let startPos = telephoneInput.selectionStart;
    let endPos = telephoneInput.selectionEnd;

    if (event.key === "ArrowRight") {
      console.log(`arrow right was pressed`);
      startPos++;
      endPos++;
    }

    if (event.key === "ArrowLeft") {
      console.log(`arrow right was pressed`);
      startPos--;
      endPos--;
    }
    console.log(`startPos: ${startPos}, endPos: ${endPos}`);


    //case where Backspace is pressed when cursor is to the right of a hyphen (-)
    if (event.key === "Backspace") {
      if (startPos === 4) {
        telephoneInput.value = telephoneInput.value.slice(0, 3);
      }

      if (startPos === 8) {
        telephoneInput.value = telephoneInput.value.slice(0, 7);
      }
    }//end case for Backspace

  });

  function showErrorMessage(input, message) {
    let container = input.parentElement; // The .input-wrapper

    // Remove an existing error
    let error = container.querySelector('.error-message');
    if (error) {
      container.removeChild(error);
    }

    // Now add the error, if the message is not empty
    if (message) {
      let error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      container.appendChild(error);
    }
  }

  function validateEmail() {
    let value = emailInput.value;

    if (!value) {
      showErrorMessage(emailInput, 'E-mail is a required field.');
      return false;
    }

    if ((value.indexOf('@') === -1) || (value.indexOf('.') === -1)) {
      showErrorMessage(emailInput, 'Invalid email format');
      return false;
    }

    showErrorMessage(emailInput, null);
    return true;
  }

  function validatePhoneNum(event) {
    let value = telephoneInput.value;

    //add hyphen (-) to format telephone number correctly
    if (value.length === 0) {
      showErrorMessage(telephoneInput, null);
      return true;
    }

    if (value.length === 3) {
      value += '-';
      telephoneInput.value = value;
      console.log(`telephone value now: ${value}`)
    }

    //add hyphen (-) to format telephone number correctly
    if (value.length === 7) {
      value += '-';
      telephoneInput.value = value;
      console.log(`telephone value now: ${value}`)
    }

    if (value.length !== 12) {
      showErrorMessage(telephoneInput, 'Telephone number must be 10 digits long.');
      return false;
    }

    //if no validation flags, then remove the error message
    showErrorMessage(telephoneInput, null);
    return true;
  }

  function validateForm() {
    let isValidEmail = validateEmail();
    let isValidTelephone = validatePhoneNum();
    return isValidEmail && isValidTelephone;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Do not submit to the server
    if (validateForm()) {
      alert('Opening email client - you may close this window now');
    }
  });

  emailInput.addEventListener('input', validateEmail);
  telephoneInput.addEventListener('input', validatePhoneNum);
})();

function sendEmailToMe() {
  console.log(`sending email to me...`);
  let subject = document.querySelector('#subject');
  let message = document.querySelector('#message');

  window.location = 'mailto:kdaysal123@gmail.com?subject=' + subject.value + '&body=' + message.value;
}