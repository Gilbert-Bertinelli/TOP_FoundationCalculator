document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  const display1 = document.querySelector("#display-segment1");
  const display2 = document.querySelector("#display-segment2");
  let input = "";
  let calculationList = [];
  let a = NaN;
  let b = NaN;
  let operation = "";
  // let result = "0";

  const calculateResult = (a, b, operation) => {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operation) {
      case "plus":
        return a + b;
      case "minus":
        return a - b;
      case "multiply":
        return a * b;
      case "divide":
        return a / b;
    }
  };

  display1.textContent = "";
  display2.textContent = "0";

  /** @param {MouseEvent} event */
  body.addEventListener("click", function (element) {
    /** @type {HTMLElement} */
    const e = element.target;
    // console.log(e.classList.value);
    if (e.classList.value.includes("number")) {
      input = input + e.id;
      display2.textContent = input;
    } else if (e.classList.value.includes("operation")) {
      // if the input is not NaN so the user has already entered some numbers, the funciton will be executed
      if (input !== "") {
        if (isNaN(a) && isNaN(b)) {
          a = parseFloat(input);
          operation = e.id;
          display1.textContent = input + " " + e.textContent;
          input = "";
        } else if (!isNaN(a) && isNaN(b)) {
          b = parseFloat(input);
          operation = e.id;
          display1.textContent =
            display1.textContent + " " + input + " " + e.textContent;
          // a = calculateResult(a, b, operation);
          // b = NaN;
          // display2.textContent = a;
          input = "";
        } else if (!isNaN(a) && !isNaN(b)) {
          a = calculateResult(a, b, operation);
          console.log(a);
          operation = e.id;
          b = NaN;
          display1.textContent = display1.textContent + " " + operation;
          display2.textContent = a;
        }
        console.log("a:" + a + " b:" + b + " operation:" + operation);
      }
    } else if (e.id === "equal") {
      console.log("equal");
      console.log("a:" + a + " b:" + b + " operation:" + operation);
      if (!isNaN(a) && isNaN(b)) {
        b = parseFloat(input);
        console.log("a:" + a + " b:" + b + " operation:" + operation);
        display1.textContent = display1.textContent + " " + a;
        a = calculateResult(a, b, operation);
        display2.textContent = a;
        b = NaN;
        input = "";
      }
    }
  });
});
