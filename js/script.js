const form = document.getElementById("loanForm");
const loanList = document.getElementById("loanList");
const modeToggle = document.getElementById("modeToggle");
const modeLabel = document.getElementById("modeLabel");

let loans = JSON.parse(localStorage.getItem("loans")) || [];

// Theme toggle
modeToggle.addEventListener("change", ()=>{
  if(modeToggle.checked){
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
    modeLabel.innerText = "Light Mode";
  } else {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    modeLabel.innerText = "Dark Mode";
  }
});

// Render loans
function renderLoans(){
  loanList.innerHTML = "";
  loans.forEach((loan,index)=>{
    const tr = document.createElement("tr");
    const remaining = loan.amount - loan.paid;
    tr.innerHTML = `
      <td>${loan.name}</td>
      <td>PKR ${loan.amount}</td>
      <td>PKR ${remaining}</td>
      <td class="${remaining===0?'status-paid':'status-unpaid'}">${remaining===0?'Paid':'Unpaid'}</td>
      <td>
        ${remaining>0?`<input type="number" min="1" max="${remaining}" placeholder="Pay" id="pay-${index}">
        <button onclick="makePayment(${index})">Pay</button>`:"-"}
      </td>`;
    loanList.appendChild(tr);
  });
}

// Add loan
form.addEventListener("submit", e=>{
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  const amount=parseFloat(document.getElementById("amount").value);
  if(!name || !amount) return;
  loans.push({name,amount,paid:0});
  localStorage.setItem("loans",JSON.stringify(loans));
  form.reset();
  renderLoans();
});

// Make partial payment
function makePayment(index){
  const input=document.getElementById(`pay-${index}`);
  const payment=parseFloat(input.value);
  if(isNaN(payment) || payment<=0 || payment>(loans[index].amount-loans[index].paid)){
    alert("Enter valid amount");
    return;
  }
  loans[index].paid+=payment;
  localStorage.setItem("loans",JSON.stringify(loans));
  renderLoans();
}

// Initial render
renderLoans();
