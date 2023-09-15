//   *ARRAY*

let myArray = [12, 2, 9, 6, 7, 9, 8, 4];

//  INDEX OF
function customIndexOf(array, value) {
  let index = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      index = i;
      break;
    } else {
      index = -1;
    }
  }
  return index;
}
console.log(customIndexOf(myArray, 7));

//   FIND
function customFind(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      //if (callback(array[i])) - is for chcking the callback f cond(or result of callbackf) ,   array[i] - is what I'm looking for(th enumber for example)
      return array[i]; //matches cond
    }
  }
  return undefined; //if after iteerating there is no such nmber matches condition.
}

let result = customFind(myArray, (num) => num > 3);
console.log(result);

// FIND INDEX

function customFindIndex(array, callback) {
  let index = 0;
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      return (index = i);
    }
  }
  return (index = -1);
}

let result3 = customFindIndex(myArray, (num) => num > 9);

console.log(result3);

//     FILTER

function customFilter(array, callback) {
  let filteredArray = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      filteredArray.push(array[i]);
    }
  }
  return filteredArray;
}

let result4 = customFilter(myArray, (num) => num > 7);
console.log(result4);

//     REDUCE

function customReduce(array, callback, deaultfValue) {
  let accumulator = deaultfValue;
  for (let i = 0; i < array.length; i++) {
    accumulator = callback(accumulator, array[i]);
  }
  return accumulator;
}

let myArray5 = [1, 3, 5];
let result5 = customReduce(
  myArray5,
  (accumulator, currentValue) => (accumulator += currentValue),
  0
);
console.log(result5);

/////////////////////////////////////////////////////////////////////////////////////

 //  *STRING

 let inputString = "Hello... WORLD";


//         STARTS WITH 

function customStartsWith(inputString, searchString) {
    for (let i = 0; i < searchString.length; i++) {
        if (inputString[i] !== searchString[i]) {
            return false;
        }
    }
    return true;
}

console.log(customStartsWith(inputString,"Hello"));


/////////////////////////////////////////////////////////////////////////////////////


let pin = "";
let userPin = prompt("Add your pin for registration");
pin = userPin;

let balance = 5000;
let salary = 1000;
let hasCredit = false;
let transactions = [];
let tryCount = 3;

while (tryCount > 0) {
  let loginPin = prompt("Add pin for login");
  if (loginPin === pin) {
    console.log("Welcome!");
    mainMenu();
    break;
  } else {
    tryCount--;
    console.log(`Try again! You have: ${tryCount} tries`);
    if (tryCount == 0) {
      console.error("Your card is blocked!");
    }
  }
}

function mainMenu() {
  let operation;
  if (balance > 0) {
    operation = prompt(
      "Choose an operation: 'Cash in', 'Withdraw', 'B (for balance) , 'T'(for tarnsactions)"
    );
    switch (operation.toLowerCase()) { //add trim()//don't forget!!
      case "cash in":
        cashIn();
        break;
      case "withdraw":
        withDraw();
        break;

      case "b":
        console.log("balans:", balance);
        balanceOrTransaction = confirm("whould you like to see transactions ?");
        if (balanceOrTransaction) {
          showTransactions();
        } else {
          console.log(`thanks for chooosing us !!!`);
        }

        break;

      case "t":
        showTransactions();
        balanceOrTransaction = confirm("whould you like to see your balanse ?");
        if (balanceOrTransaction) {
          console.log("balans:", balance);
        } else {
          console.log(`thanks for choosing us !!!`);
        }
        break;

      default:
        console.error(
          "Choose an operation: 'Cash in', 'Withdraw', 'B (for balance) , 'T'(for tarnsactions)"
        );
        mainMenu();
        break;
    }
  } else if (balance === 0 && !hasCredit) {
    operation = prompt(
      "Your balance is 0. Choose an operation: 'Cash in' or 'Credit Application'"
    );
    switch (operation.toLowerCase()) {
      case "cash in":
        cashIn();
        break;
      case "credit application":
        let creditApplied = applyForCredit();

        if (creditApplied) {
          let creditOperation = prompt(
            "Choose an operation: 'Cash in', 'Withdraw', 'B' (for balance) , 'T'(for tarnsactions)"
          );
          switch (creditOperation.toLowerCase()) {
            case "cash in":
              cashIn();
              break;
            case "withdraw":
              withDraw();
              break;
            case "B":
              console.log("balans:", balance);
              balanceOrTransaction = confirm(
                "whould you like to see transactions ?"
              );
              if (balanceOrTransaction) {
                showTransactions();
              } else {
                console.log(`thanks for choosing us !!!`);
              }

              break;

            case "T":
              showTransactions();
              balanceOrTransaction = confirm(
                "whould you like to see your balanse ?"
              );
              if (balanceOrTransaction) {
                console.log("balans:", balance);
              } else {
                console.log(`thanks for choosing us !!!`);
              }
              break;
            default:
              console.error(
                "Invalid operation. Please choose 'Cash in', 'Withdraw'."
              );
              mainMenu();
              break;
          }
        }
        break;
      default:
        console.error(
          "Invalid operation. Please choose 'Cash in' or 'Credit Application'."
        );
        mainMenu();
        break;
    }
  } else if (balance === 0 && hasCredit) {
    let creditOperation = prompt("Choose an operation: 'Cash in', 'Withdraw'");
    switch (creditOperation.toLowerCase()) {
      case "cash in":
        cashIn();
        break;
      case "withdraw":
        withDraw();
        break;
      default:
        console.error(
          "Invalid operation. Please choose 'Cash in', 'Withdraw'."
        );
        mainMenu();
        break;
    }
  }
}

function showTransactions() {
 
  transactions.forEach((tr) => {

    let date = tr.date;
    let trDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;


    console.log(
      `mebleg: ${tr.amount}. Tarix: ${tr.date}, ${
        tr.deposit ? "Medaxil" : "Mexaric"
      }`
    );
  });
}

function cashIn() {
  let amount = Math.abs(Number(prompt("Enter cash in amount:")));
  if (hasCredit) {
    if (amount >= balance) {
      amount -= balance;
      // balance = 0;
      amount;
      hasCredit = false;
    } else {
      balance -= amount;
    }
  } else {
    balance += amount;
  }

  let trobj = {
    amount: amount,
    date: new Date(),
    deposit: true,
  };
  transactions.push(trobj);
  console.log(`Cash in completed. Your current balance is $${balance}`);
  mainMenu();
}

function withDraw() {
  let amount = Math.abs(Number(prompt("Enter withdrawal amount:")));
  if (amount <= balance) {
    balance -= amount;
    let trobj = {
      amount: amount,
      date: new Date(),
      deposit: false,
    };
    transactions.push(trobj);
    console.log(`Withdrawal completed. Your current balance is ${balance}`);
    mainMenu();
  } else {
    console.info("There is not enough money in your balance.");
    mainMenu();
  }
}

function applyForCredit() {
  if (balance === 0 && !hasCredit) {
    let result = CalculateCredit(salary);
    console.log(
      `Max credit amount: ${result.creditAmount}, monthly payment: ${result.mPaiment}`
    );
    const hasAcceptedCredit = confirm(`Do you accept the offer?`);
    if (hasAcceptedCredit) {
      balance += result.creditAmount;

      let trobjCredit = {
        amount: result.creditAmount,
        date: new Date(),
        deposit: true,
      };
      transactions.push(trobjCredit);

      hasCredit = true;
      console.log("Credit granted. Your new balance is:", balance);
      return true;
    } else {
      console.log("Credit application declined.");
      return false;
    }
  } else if (hasCredit) {
    console.error("You already have an active credit.");
    return false;
  } else {
    console.error("You can't apply for credit at the moment.");
    return false;
  }
}

function CalculateCredit(salary) {
  let monthlyPaiment = (salary * 45) / 100;
  let maxCreditAmount = 12 * monthlyPaiment;
  let result = maxCreditAmount - (maxCreditAmount * 10) / 100;
  return {
    mPaiment: monthlyPaiment,
    creditAmount: result,
  };
}

function showTransactions() {
  transactions.forEach((tr) => {
    let date = tr.date;
    let trDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    console.log(
      `Amount: ${tr.amount}. Date: ${trDate}, ${
        tr.deposit ? "Deposit" : "Withdrawal"
      }`
    );
  });
}



//porabotat nad funkchiyami(v chelom potom posmotret oshibki) ibo yest' nedocheti
//spustya vrema vernis i zapishi zanovo)povtori +add some extra functions or fix errors
//