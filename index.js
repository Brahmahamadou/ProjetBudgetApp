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
let btnHistory = document.getElementById("buton_quatre");


// Vérifiez s'il existe un budget enregistré dans le stockage local
let savedBudget = localStorage.getItem("budget");
if (savedBudget) {
  btnMontantBudget.innerText = savedBudget + " F";
}

// Vérifiez s'il existe une dépense enregistrée dans le stockage local
// let savedExpense = localStorage.getItem("expense");
// if (savedExpense) {
//     btnMontantExpense.innerText = savedBalance - inputAmount.value  + " F";
// }

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
    alert('Veuillez saisir une valeur pour le budget.');
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

    // Mettre à jour btnMontantExpense avec le nouveau calcul
    btnMontantExpense.innerText = savedBalance - parseFloat(inputAmount.value) + " F";
    // btnMontantAmount.innerText = parseFloat(inputBudget.value) - savedBalance + " F";
    const tableau = {
      inputExpen: inputExpen.value,
      inputAmount: inputAmount.value + " F",
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
})
function supprimer(index) {
  // Supprimer la tâche correspondant à l'index du tableau
  tabLocalStorage.splice(index, 1);
  // Mettre à jour le localStorage
  console.log('supprimer');
  localStorage.setItem("tabLocalStorage", JSON.stringify(tabLocalStorage));
  notification2.classList.remove("hidden")
  setTimeout(() => {
    notification2.classList.add("hidden")
  }, 3000);
  // Mettre à jour l'affichage
  myBudget();
}
function myBudget() {
  tbody.innerHTML = "";
  tabLocalStorage.forEach((element, index) => {
    console.log(element);
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

// btnHistory.addEventListener("click", function (event) {
//   event.preventDefault();
//   if (condition) {
    
//   }
//   myHistory()
// })
// //funtion pour afficher history
// function myHistory() {
//   thead.innerHTML = "";
//   tbody.innerHTML = "";
//   tabLocalStorage.forEach((history, index) => {
//     thead.innerHTML += `
//     <tr>
//     <td class="">#</td>
//     <td>Expense title</td>
//     <td></td>
//     <td class="">Expense Value</td>
//      /tr>
//     `;
//     tbody.innerHTML += `
//     <tr id="">
//     <td class=""></td>
//     <td>${history.inputExpen}</td>
//     <td></td>
//     <td class="">${history.inputExpen} </td>
//      </tr
//     `
//   })
// }
// myHistory()








































    // btnAddExpense.addEventListener("click", function () {
    //     let expenseTitle = inputExpen.value;
    //     let expenseAmount = inputAmount.value;

    //     // Obtenez la dépense actuelle enregistrée et ajoutez la nouvelle dépense
    //     let currentExpense = localStorage.getItem("expense") || 0;
    //     currentExpense = parseFloat(currentExpense) + parseFloat(expenseAmount);

    //     // Enregistrez la dépense mise à jour dans le stockage local
    //     localStorage.setItem("expense", currentExpense);

    //     btnMontantExpense.innerText = currentExpense + " F";

    //     // Mettez à jour le solde
    //     let budget = parseFloat(localStorage.getItem("budget")) || 0;
    //     let balance = budget - currentExpense;

    //     // Enregistrez le solde mis à jour dans le stockage local
    //     localStorage.setItem("balance", balance);

    //     btnMontantAmount.innerText = balance + " F";
    // });




// let btnBudget = document.getElementById("budge");
// let btnExpense = document.getElementById("expen");
// let btnAmount = document.getElementById("amount");
// let btnCalcu = document.getElementById("calculate");
// let btnAddExpense = document.getElementById("expense");
// let btnMontantBudget = document.getElementById("montant_budget");
// let btnMontantExpense = document.getElementById("montant_expense");
// let btnMontantAmount = document.getElementById("montant_balance");
// let inputBudget = document.getElementById("budge");
// let inputExpen = document.getElementById("expen");
// let inputAmount = document.getElementById("amount");
// let prix_un = document.getElementById("prix_un");
// let prix_deux = document.getElementById("prix_deux");
// let prix_trois = document.getElementById("prix_trois");

// let bugetTab = [];
// if (!JSON.parse(localStorage.getItem("bugetTab"))) {
//   bugetTab = localStorage.setItem("bugetTab", JSON.stringify(bugetTab))
// }

// bugetTab = JSON.parse(localStorage.getItem("bugetTab"))

// btnCalcu.addEventListener("click", function (event) {
//   event?.preventDefault()
//   if (inputBudget.value === "" || inputBudget.value < 0) {
//     alert("veuillez mettre une valeur")
//   }
//   else {
//     const tableau = {
//       prix_un: inputBudget.value,
//       prix_trois: inputBudget.value,
//     }
//     bugetTab.push(tableau);
//     localStorage.setItem("bugetTab", JSON.stringify(bugetTab))
//     inputBudget.value = ""
//     inputExpen.value = ""
//     inputAmount.value = ""
//     notification.classList.remove("hidden")
//     setTimeout(() => {
//       notification.classList.add("hidden")
//     }, 3000);
//   }
// })
