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

  const roundResult = (input) => {
    let result = input.toFixed(13).replace(/\.?0+$/, "");
    if (result.length > 13) {
      result = result.slice(0, 13);
      display2.textContent = result;
    } else {
      display2.textContent = result;
    }
  };

  display1.textContent = "";
  display2.textContent = "0";

  /** @param {MouseEvent} event */
  body.addEventListener("click", function (element) {
    /** @type {HTMLElement} */
    const e = element.target;
    // console.log(e.id);
    if (e.id === "ac") {
      a = NaN;
      b = NaN;
      operation = "";
      display1.textContent = "";
      display2.textContent = "0";
      input = "";
    } else if (e.id === "del") {
      if (display2.textContent !== "0") {
        input = input.slice(0, input.length - 1);
        if (input === "") {
          input = "0";
        }
        display2.textContent = input;
      }
    } else if (e.id === "dot") {
      input = input + ".";
      display2.textContent = input;
    } else if (e.classList.value.includes("number")) {
      input = input + e.id;
      display2.textContent = input;
    } else if (e.classList.value.includes("operation")) {
      console.log(input);
      if (input !== "") {
        // if the input is not NaN so the user has already entered some numbers, the funciton will be executed
        if (isNaN(a)) {
          a = parseFloat(input);
          operation = e.id;
          display1.textContent = input + " " + e.textContent;
          input = "";
        } else {
          b = parseFloat(input);
          display1.textContent =
            display1.textContent + " " + input + " " + e.textContent;
          operation = e.id;
          a = calculateResult(a, b, operation);
          input = "";
          display2.textContent = roundResult(a);
        }
      } else {
        display1.textContent = display1.textContent + " " + e.textContent;
        operation = e.id;
      }
    } else if (e.id === "equal") {
      // if (!isNaN(a) && isNaN(b)) {
      b = parseFloat(input);
      display1.textContent = display1.textContent + " " + b;
      a = calculateResult(a, b, operation);
      b = NaN;
      input = "";
      operation = "";
      display2.textContent = roundResult(a);
      // }
    }
  });
});
