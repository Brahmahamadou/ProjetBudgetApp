const ctx = document.getElementById('canvas')

new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
      label: '',
      data: [12, 19, 10],
      borderWidth: 1
    }]
  },
  options: {
  }
});

let btnBudget = document.getElementById("budge");
let btnExpense = document.getElementById("expen");
let btnAmount = document.getElementById("amount");
let btnCalcu = document.getElementById("calculate");
let btnAddExpense = document.getElementById("expense");
let btnAddExpenseDeux = document.getElementById("expense2");
let btnMontantBudget = document.getElementById("montant_budget");
let btnMontantExpense = document.getElementById("montant_expense");
let btnMontantAmount = document.getElementById("montant_balance");
let inputBudget = document.getElementById("budge");
let inputExpen = document.getElementById("expen");
let inputAmount = document.getElementById("amount");
let prix_un = document.getElementById("prix_un");
let prix_deux = document.getElementById("prix_deux");
let prix_trois = document.getElementById("prix_trois");
let btnbi1 = document.getElementById("bi1");
let btnbi2 = document.getElementById("bi2");
let btnHistory = document.getElementById("butonquatre");
let ta = document.getElementById("ta");
let table = document.getElementById("table");
let tbody = document.getElementById("tbody");
let tbody2 = document.getElementById("tbody2");
let myButtonClose = document.getElementById("mybu");
let btnValu = document.getElementById("valu")

// Vérifiez s'il existe un budget enregistré dans le stockage local
let savedBudget = localStorage.getItem("budget");
if (savedBudget) {
  btnMontantBudget.innerText = savedBudget + " F";
}

// Vérifiez s'il existe une dépense enregistrée dans le stockage local
let savedExpense = localStorage.getItem("expense");
if (savedExpense) {
    btnMontantExpense.innerText = inputAmount.value  + " F";
}

// Vérifiez s'il existe un solde enregistré dans le stockage local
let savedBalance = localStorage.getItem("balance");
if (savedBalance) {
  btnMontantAmount.innerText = savedBalance + " F";
}

btnCalcu.addEventListener("click", function (event) {
  // Empêcher le comportement par défaut du formulaire (s'il y en a un)
  event.preventDefault();
  // Vérifier si la valeur du budget est vide
  if (inputBudget.value === "") {
    alert('Veuillez saisir une valeur pour le budget!');
  } else {
    // Récupérer la valeur du budget en tant que nombre 
    let budgetValue = parseFloat(inputBudget.value);

    // Récupérer le solde actuel du stockage local (initialisé à zéro si non défini)
    let currentBalance = parseFloat(localStorage.getItem("balance")) || 0;
    let currentBalanc_deux = parseFloat(localStorage.getItem("budget")) || 0;

    // Ajouter le nouveau budget à l'ancien solde
    let newBalance = currentBalance + budgetValue;
    let newBalance2 = currentBalanc_deux + budgetValue;

    // Enregistrer le nouveau budget dans le stockage local
    localStorage.setItem("budget", newBalance2);
    localStorage.setItem("balance", newBalance);

    // Mettre à jour l'affichage du budget et du solde
    btnMontantBudget.innerText = newBalance2 + " F";
    btnMontantAmount.innerText = newBalance + " F";

    // Effacer la valeur dans le champ de saisie du budget
    inputBudget.value = "";
  }
  notification.classList.remove("hidden")
  setTimeout(() => {
    notification.classList.add("hidden")
  }, 3000);
  myBudget();
});
// localStorage pour le tableau de mon table
let tabLocalStorage = [];
if (!JSON.parse(localStorage.getItem("tabLocalStorage"))) {
  tabLocalStorage = localStorage.setItem("tabLocalStorage", JSON.stringify(tabLocalStorage))
}

tabLocalStorage = JSON.parse(localStorage.getItem("tabLocalStorage"));
btnAddExpense.addEventListener('click', function (event) {
  event.preventDefault();
  if (parseFloat(inputAmount.value) < 0) {
    notification4.classList.remove("hidden");
    setTimeout(() => {
      notification4.classList.add("hidden");
    }, 3000);
    inputExpen.value = "";
    inputAmount.value = "";
    return; // Quitter la fonction si inputAmount est inférieur à 0

  }
  if (inputExpen.value === "" || inputAmount.value === "") {
    alert('Veuillez saisir les valeurs.');
  } else {
    let savedBalance = parseFloat(localStorage.getItem("balance")) || 0;
    let expenseAmount = parseFloat(inputAmount.value) || 0;

    // Mettre à jour btnMontantExpense avec le nouveau calcul
    btnMontantExpense.innerText = parseFloat(btnMontantExpense.innerText) + parseFloat(inputAmount.value) + " F";
    btnMontantAmount.innerText = parseFloat(btnMontantAmount.innerText) - parseFloat(inputAmount.value) + " F";
    const tableau = {
      inputExpen: inputExpen.value,
      inputAmount: inputAmount.value,
    }
    tabLocalStorage.push(tableau);
    localStorage.setItem("tabLocalStorage", JSON.stringify(tabLocalStorage));
    inputExpen.value = "";
    inputAmount.value = "";
    notification3.classList.remove("hidden")
    setTimeout(() => {
      notification3.classList.add("hidden")
    }, 3000);

    myBudget();
  }
});
let myprice = 0
tabLocalStorage.forEach(element => {
  let expenseAmount = parseFloat(element.inputAmount) || 0;
  myprice+= expenseAmount
  console.log(myprice);
 });
 btnMontantExpense.textContent = myprice + " F"
// function pour modifier
function modifier(index) {
    btnAddExpenseDeux.classList.remove("hid");
    btnAddExpense.classList.add("hid");
  // Pré-remplir les champs avec les détails de la tâche sélectionnée
  inputExpen.value = tabLocalStorage[index].inputExpen;
  inputAmount.value = tabLocalStorage[index].inputAmount;
  btnAddExpenseDeux.addEventListener("click", function (e) {
    e.preventDefault();
    btnAddExpenseDeux.classList.add("hid");
    btnAddExpense.classList.remove("hid");
    // nouelles valeurs
    tabLocalStorage[index].inputExpen = inputExpen.value;
    tabLocalStorage[index].inputAmount = inputAmount.value;

    inputExpen.value = "";
    inputAmount.value = "";
    localStorage.setItem("tabLocalStorage", JSON.stringify(tabLocalStorage));
    // Mettre à jour l'affichage
    myBudget();
  })
  localStorage.setItem("tabLocalStorage", JSON.stringify(tabLocalStorage));
  // Mettre à jour l'affichage
  myBudget();
}
//function pour supprimer
function supprimer(index) {
  location.reload()
  // Supprimer la tâche correspondant à l'index du tableau
  tabLocalStorage.splice(index, 1);
  // Mettre à jour le localStorage
  localStorage.setItem("tabLocalStorage", JSON.stringify(tabLocalStorage));
  notification2.classList.remove("hidden")
  setTimeout(() => {
    notification2.classList.add("hidden")
  }, 3000);
  // Mettre à jour l'affichage
  myBudget();
}
// function pour le tableau des valeurs
function myBudget() {
  tbody.innerHTML = "";
  tabLocalStorage.forEach((element, index) => {
    // console.log(element);
    tbody.innerHTML += `
      <tr id="">
      <td class="text-start">${element.inputExpen}</td>
      <td></td>
      <td>${element.inputAmount}</td>
      <td class="">
          <i id="bi1" onclick="modifier(${index})"  class="bi bi-pencil-square"></i>
          <i id="bi2" onclick="supprimer(${index})" class="bi bi-trash-fill"></i>
      </td>
    </tr>
      `
  });
}
myBudget();
//function pour le tableau de history
btnHistory.addEventListener("click", function (event) {
  event.preventDefault();
  ta.classList.remove("hidden");
  tbody2.innerHTML = ""; // Effacer le contenu existant
  tabLocalStorage.forEach((element, index) => {
    tbody2.innerHTML += `
      <tr class="text-center">
        <td>${index + 1}</td>
        <td></td>
        <td class="text-start" >${element.inputExpen}</td>
        <td>${element.inputAmount}</td>
      </tr>
    `;
  });
  myButtonClose.addEventListener('click', function () {
    ta.classList.add('hidden')
  })
})

// function pour vider la contenu

btnValu.addEventListener("click", function (e) {
  tabLocalStorage.forEach(element => {
    tbody.innerHTML = "";
    tbody2.innerHTML = "";
  });
})