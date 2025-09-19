const form = document.getElementById("loanForm");
const loanList = document.getElementById("loanList");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;

  if (name && amount) {
    const li = document.createElement("li");
    li.textContent = `${name} owes Rs. ${amount}`;

    const btn = document.createElement("button");
    btn.textContent = "Paid Back";
    btn.onclick = () => loanList.removeChild(li);

    li.appendChild(btn);
    loanList.appendChild(li);

    form.reset();
  }
});
