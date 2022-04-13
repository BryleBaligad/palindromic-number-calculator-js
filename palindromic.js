const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Enter number (d=196): ", number => {
    if (!number) number = 196;
    readline.question("Enter iterations (d=1024): ", iterations => {
        if (!iterations) iterations = 1024;
        readline.question("Slow mode? (y/n, d=n): ", slow => {
            if (!slow) slow = "n";
            if (slow.startsWith("y", 0)) {
                readline.question("Delay between iterations (ms): ", delay => {
                    let time = new Date();
                    checkPalindromic(number, 0, time, iterations, true, parseInt(delay));
                });
            } else {
                let time = new Date();
                checkPalindromic(number, 0, time, iterations, false, 0);
            }
        });
    });
})

function checkPalindromic(number, index, time, iterations, slow, delay) {
    var iteration = (index + 1);
    var a = number.toString();
    var b = a.split("").reverse().join("");
    var c = BigInt(a) + BigInt(b);

    if (index >= iterations) {
        setTerminalTitle("Iteration " + index + " of " + iterations);
        console.log("\nMaximum iterations reached, not palindromic as of iteration " + index);
        console.log(`Slow Mode: ${slow}, Delay: ${delay}`);
        console.log("Time taken: " + processTimeDifference(time, new Date()));
        process.exit();
    }
    index++;

    process.stdout.write(`\nIteration ${iteration}: ${a} + ${b} = ${c}... `);
    if (c != c.toString().split('').reverse().join('')) {

        process.stdout.write("not palindromic");

        if (slow == true) {
            setTerminalTitle("Iteration " + iteration + " of " + iterations);
            setTimeout(() => {
                checkPalindromic(c.toString(), index, time, iterations, slow, delay);
            }, delay);
            return;
        } else {
            if (index % 4000 == 0) {
                process.nextTick(() => {
                    setTerminalTitle("Iteration " + iteration + " of " + iterations);
                    checkPalindromic(c.toString(), index, time, iterations, slow, delay);
                });
            } else {
                checkPalindromic(c.toString(), index, time, iterations, slow, delay);
            }
            return;
        }

    } else {
        setTerminalTitle("Iteration " + iteration + " of " + iterations);
        process.stdout.write("palindromic, calculated in " + processTimeDifference(time, new Date()) + " seconds");
        console.log(`\nSlow Mode: ${slow}, Delay: ${delay}`);
        process.exit();
    }
}

function processTimeDifference(initial, final) {
    diff = (final - initial) / 1000;
    return diff;
}

function setTerminalTitle(title) {
    process.stdout.write(
        String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7)
    );
}
