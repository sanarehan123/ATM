import inquirer from "inquirer"

let myBalance = 10000; // Dollar
let myPin = 1234;

let pinAnswer = await inquirer.prompt(
  [  {
        name: "pin",
        message:"enter your pin",
        type:"number"
    }
  ]
);

if (pinAnswer.pin === myPin) {
    console.log("Correct pin code!!!")

    let operationAns = await inquirer.prompt(
        [
            {
                name:"operation",
                message:"please select option",
                type:"list",
                choices:["withdraw","check balance"]
            }
        ]
    );
    if (operationAns.operation === "withdraw") {
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                message: "Select amount or choose 'Other amount':",
                type: "list",
                choices: ["1000", "2000", "5000", "10000", "Other amount"]
            }
        ]);

        if (amountAns.amount === "Other amount") {
            amountAns = await inquirer.prompt([
                {
                    name: "customAmount",
                    message: "Enter your custom amount:",
                    type: "number"
                }
            ]);
        }

        let withdrawAmount = amountAns.amount === "Other amount" ? amountAns.customAmount : parseInt(amountAns.amount);
        if (myBalance - withdrawAmount < 0) {
            console.log("Insufficient balance");
        } else {
            myBalance -= withdrawAmount;
            console.log(`Your remaining balance is: $${myBalance}`);
        }
    } else if (operationAns.operation === "Check balance") {
        console.log(`Your balance is: $${myBalance}`);
    }
} else {
    console.log("Incorrect pin number");
}
