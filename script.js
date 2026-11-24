// ----- Validation rules -----
const NAME_MIN = 2;
const NAME_MAX = 50;
const FEEDBACK_MIN = 20;
const FEEDBACK_MAX = 500;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const form = document.getElementById("feedbackForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const feedbackInput = document.getElementById("feedback");
const statusBox = document.getElementById("formStatus");
const counter = document.getElementById("counter");
const feedbackList = document.getElementById("feedbackList");
const emptyNote = document.getElementById("emptyNote");

function setError(input, errorId, message) {
  document.getElementById(errorId).textContent = message;
  input.classList.toggle("invalid", message !== "");
}

// ----- Input validation -----
function validateForm() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const feedback = feedbackInput.value.trim();
  let valid = true;

  if (name === "") {
    setError(nameInput, "nameError", "Name is required.");
    valid = false;
  } else if (name.length < NAME_MIN || name.length > NAME_MAX) {
    setError(nameInput, "nameError", `Name must be ${NAME_MIN} to ${NAME_MAX} characters.`);
    valid = false;
  } else {
    setError(nameInput, "nameError", "");
  }

  if (email === "") {
    setError(emailInput, "emailError", "Email is required.");
    valid = false;
  } else if (!EMAIL_PATTERN.test(email)) {
    setError(emailInput, "emailError", "Please enter a valid email address (e.g. name@example.com).");
    valid = false;
  } else {
    setError(emailInput, "emailError", "");
  }

  if (feedback === "") {
    setError(feedbackInput, "feedbackError", "Feedback is required.");
    valid = false;
  } else if (feedback.length < FEEDBACK_MIN) {
    setError(feedbackInput, "feedbackError", `Feedback must be at least ${FEEDBACK_MIN} characters.`);
    valid = false;
  } else if (feedback.length > FEEDBACK_MAX) {
    setError(feedbackInput, "feedbackError", `Feedback must be at most ${FEEDBACK_MAX} characters.`);
    valid = false;
  } else {
    setError(feedbackInput, "feedbackError", "");
  }

  return { valid, name, email, feedback };
}

// ----- Safe output handling (textContent only, never innerHTML) -----
function renderFeedback(name, email, feedback) {
  const item = document.createElement("li");

  const head = document.createElement("div");
  head.className = "entry-head";
  head.textContent = name;

  const mail = document.createElement("div");
  mail.className = "entry-email";
  mail.textContent = email;

  const text = document.createElement("p");
  text.className = "entry-text";
  text.textContent = feedback;

  item.append(head, mail, text);
  feedbackList.prepend(item);
  emptyNote.style.display = "none";
}

function showStatus(message, type) {
  statusBox.textContent = message;
  statusBox.className = "status " + type;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const result = validateForm();

  if (!result.valid) {
    showStatus("Please fix the errors above and try again.", "failure");
    return;
  }

  renderFeedback(result.name, result.email, result.feedback);
  showStatus("Thank you! Your feedback was submitted successfully.", "success");
  form.reset();
  counter.textContent = `0 / ${FEEDBACK_MAX}`;
});

feedbackInput.addEventListener("input", function () {
  counter.textContent = `${feedbackInput.value.length} / ${FEEDBACK_MAX}`;
});
