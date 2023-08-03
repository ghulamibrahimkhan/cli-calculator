#!/usr/bin/env node
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';
import figlet from 'figlet';
let sleep = () => {
    return new Promise((res) => { setTimeout(res, 2000); });
};
async function animation() {
    let rainbow = chalkAnimation.rainbow("Simple CLI Calculator");
    await sleep();
    rainbow.stop();
    console.log(chalk.bold.bgCyan(`      ┏━━━━━━━━━━━━━━━━┓  
      ┃  CALCULATOR    ┃  
      ┗━━━━━━━━━━━━━━━━┛  
   
       [7] [8] [9] [+]    
       [4] [5] [6] [-]    
       [1] [2] [3] [*]    
       [0] [=] [C] [/]    
                          `));
}
function displayText() {
    let data = "Ibrahim's Calculator";
    return new Promise((resolve) => {
        figlet(data, (err, data) => {
            console.log(data);
        });
    });
}
async function Calculator() {
    const ans = await inquirer
        .prompt([
        {
            type: "number",
            name: "num1",
            message: "Input 1st number"
        },
        {
            type: "number",
            name: "num2",
            message: "Input 2nd number"
        },
        {
            type: "list",
            name: "operator",
            message: "Select Operator",
            choices: [
                "Divide", "Multiply", "Addition", "Subtraction"
            ]
        }
    ]);
    let result;
    let sign;
    if (ans.operator == "Divide") {
        result = ans.num1 / ans.num2;
        sign = "/";
    }
    else if (ans.operator == "Multiply") {
        result = ans.num1 * ans.num2;
        sign = "*";
    }
    else if (ans.operator == "Addition") {
        result = ans.num1 + ans.num2;
        sign = "+";
    }
    else if (ans.operator == "Subtraction") {
        result = ans.num1 - ans.num2;
        sign = "-";
    }
    console.log(`  ${chalk.blueBright(ans.operator)}: ${chalk.yellow(ans.num1)} ${chalk.yellow(sign)} ${chalk.yellow(ans.num2)} = ${chalk.red(result)}`);
    const continueAnswer = await inquirer
        .prompt([
        {
            type: "confirm",
            name: "continue",
            message: "Do you want to continue calculation? "
        }
    ]);
    return continueAnswer.continue;
}
(async () => {
    // await displayText()
    await animation();
    console.log("-------------");
    let continueCalculation = true;
    do {
        continueCalculation = await Calculator();
    } while (continueCalculation);
})();
