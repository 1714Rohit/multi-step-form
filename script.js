const formSteps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const progress = document.getElementById("progress");
const steps = document.querySelectorAll(".step");
const form = document.getElementById("multiStepForm");

let currentStep = 0;

function updateFormSteps() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });

  steps.forEach((step, index) => {
    if (index <= currentStep) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  progress.style.width = `${(currentStep) / (steps.length - 1) * 100}%`;
}


function validateCurrentStep() {
  const inputs = formSteps[currentStep].querySelectorAll("input");
  for (let input of inputs) {
    if (!input.checkValidity()) {
      input.reportValidity();
      return false;
    }
  }
  return true;
}
nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (validateCurrentStep()) {
      currentStep++;
      updateFormSteps();
    }
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    currentStep--;
    updateFormSteps();
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateCurrentStep()) {
    alert("Form submitted successfully!");
    form.reset();
    currentStep = 0;
    updateFormSteps();
  }
});

// Initialize form
updateFormSteps();
