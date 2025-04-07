let input = "";
let isLocked = false;

function press(value) {
  if (isLocked) return;

  const lastChar = input.charAt(input.length - 1);
  const isOperator = (ch) => ["+", "-", "*", "/"].includes(ch);

  // Avoid multiple operators in a row
  if (isOperator(lastChar) && isOperator(value)) return;

  input += value;
  document.getElementById("input-box").value = input;

  // Only evaluate if last char isn't operator
  if (!isOperator(value)) {
    try {
      const result = eval(input);
      if (!isNaN(result)) {
        document.getElementById("output-box").value = result;
      }
    } catch {
      document.getElementById("output-box").value = "";
    }
  }
}

function calculate() {
  try {
    const result = eval(input);
    document.getElementById("output-box").value = result;
    isLocked = true;
  } catch {
    document.getElementById("output-box").value = "Error";
  }
}

function clearAll() {
  input = "";
  isLocked = false;
  document.getElementById("input-box").value = "";
  document.getElementById("output-box").value = "";
}
