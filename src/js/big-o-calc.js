// when button is clicked, gets the text from the text area:
var getBigOBtn = document.getElementById("calculate-btn");
console.log(getBigOBtn);
getBigOBtn.onclick = function() {
    var codeInput = document.getElementById("editor")
    var code = codeInput.value.trim();
    code = code.replace( /\r?\n|\r/g, "" );

    processUserCode(code);
}

function processUserCode(code) {
    let url = 'https://rl43w8txr4.execute-api.us-east-1.amazonaws.com/getBigO'
    const data = { "code": code }
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(data => {return data.json()})
    .then(result => { 
        createQuiz(result);
    })

}

function createQuiz(result){
    let bigOValues = ["O(N)", "O(N^2)", "O(N^3)", "O(logN)", "O(NlogN)"];
    let newValue = bigOValues.filter(x => x != result);
    
    let quizArr = []
    for(let i = 0; i < 4; i++)
    {
        quizArr.push("");
    }

    let randomIndex = Math.floor(Math.random() * 4);
    quizArr[randomIndex] = result;
    let arr = shuffle(newValue);
    for(let i = 0; i < 4; i++)
    {
        if(quizArr[i] != result)
        {
            quizArr[i] = arr[i]
        }
    }
    showQuiz(quizArr, result);
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function parseInput(code) {

    let newlineSplit = code.split("\n")
    let forStatements = getForStatements(newlineSplit);
    let result = getBigONotation(forStatements);
    console.log(result);
    return result;
}

const comparisonOperators = [">", "<", ">=", "<=", "==", "!="]
const operations = ["+=", "-=", "/=", "*=", "++", "--", "="]
const arithOperations = ["+", "-", "/", "*"]


/* 
    Sort the Big O strings based on below criteria:
        1. The number of N's in the string
        2. The number of logN's in the string
*/

function getBiggestBigOString(bigOStrings) {
    var numberNsList = [];
    var maxNs = 0;
    for(var i = 0; i < bigOStrings.length; i++) {
        var bigOStr = bigOStrings[i];
        var numberNs = 0;
        for(var k = 0; k < bigOStr.length; k++) {
            var c = bigOStr[k];
            if (c == 'N') {
                numberNs++;
            }
        }

        if(numberNs > maxNs) {
            maxNs = numberNs;
        }

        numberNsList.push(numberNs);
    }


    topBigNStrings = [];
    for(var i = 0; i < numberNsList.length; i++) {
        if(numberNsList[i] == maxNs) {
            topBigNStrings.push(bigOStrings[i]);
        }
    }


    // if there is only one top N string, stop there
    if(topBigNStrings.length == 1) {
        return topBigNStrings[0];
    }

    // if not, check the next criteria of logs
    var maxLsIndex = 0;
    var maxLsCount = 0;
    for(var i = 0; i < topBigNStrings.length; i++) {
        var str = topBigNStrings[i];
        var LsCount = 0;
        for(var k = 0; k < str.length; k++) {
            var c = str[k];
            if(c == 'L') {
                LsCount++;
            }
        }

        if(LsCount > maxLsCount) {
            maxLsCount = LsCount;
            maxLsIndex = i;
        }
    }
    
    return topBigNStrings[maxLsIndex];

}

function translateBigOStringToBigO(bigOString) {
    
    var nCount = 0;
    var lCount = 0;

    for(var i = 0; i < bigOString.length; i++) {
        var c = bigOString[i];
        if (c == 'N') {
            nCount++;
        }
        else if(c == 'L') {
            lCount++;
        }
    }

    res = "";
    if(nCount > 0) {
        if(nCount > 1) {
            res += "N^" + nCount;
        }
        else {
            res += "N";
        }
    }

    if(lCount > 0) {
        if(lCount > 1) {
            res += "log^" + lCount + "(N)";
        }
        else {
            res += "log(N)";
        }
    }

    if(nCount == 0 && lCount == 0) {
        res += "1";
    }

    return "O(" + res + ")";
}


/* 
    This function should strip out all the for statements in the code
*/
function getForStatements(linesOfCode) {
    let forStatements = [];
    var level = 1;
    linesOfCode.forEach(line => {
        let isFor = line.indexOf("for");
        let isClosingStatement = line.indexOf("}")
        if(isFor > -1) {
            lineObj = {
                "line": line,
                "level": level
            }
            forStatements.push(lineObj);

            // up the level because we are now within the for loop
            level += 1;
        }

        if(isClosingStatement > -1) {
            // down the level because we are now out of a for loop
            level -= 1;
        }
    });
    
    //Returns an array of objects
    return forStatements;
}

function checkAlphaNumeric(lexicon) {
    
    const alphaRegex = "^[a-zA-Z]*$"
    const numericRegex = "^[0-9]*$"
    const alphaNumericRegex = "^[a-zA-Z0-9]*$"

    lexicon = lexicon.trim();

    let mN = lexicon.match(numericRegex)
    let mAN = lexicon.match(alphaNumericRegex)

    var res;
    if(mN) {
        res = "num";
    }
    else if(mAN) {
        if(lexicon[0].match(alphaRegex)) {
            res = "var";
        }
        else {
            res = "err";
        }
    }
    else {
        res = "err";
    }
    
    return res;

}

function evaluateForStatement(forLine) {
    let forLineSplit = forLine['line'].split("(");
    let level = forLine['level'];
    let forLineLogic = forLineSplit[1].split(";");

    let varInstantiation = forLineLogic[0];
    let range = forLineLogic[1];
    let operation = forLineLogic[2].split(")")[0];

    // read init value
    var initValue = varInstantiation.split("=");
    initValue = initValue[initValue.length - 1];

    // read range stop
    var rangeStop;
    for(var i = 0; i < comparisonOperators.length; i++) {
        let op = comparisonOperators[i];
        if(range.indexOf(op) > -1) {
            let rangeStopSplit = range.split(op);
            rangeStop = rangeStopSplit[rangeStopSplit.length - 1];
            break;
        }
    }

    // read operation
    var operationDone;
    for(var i = 0; i < operations.length; i++) {
        let op = operations[i];
        if(operation.indexOf(op) > -1) {
            if(op === "=") {
                // a little more complex
                // ensure right side format is => variable op val

                // this is just a use case that is wayyy too variable.
                operationDone = "lazy"
                
            }
            else {
                if(op === "++" || op === "--") {
                    let lex = operation.split(op)[0];
                    let typeCheck = checkAlphaNumeric(lex)
  
                    if(typeCheck === "var") {
                        operationDone = "lin";
                    }
                    else {
                        operationDone = "err";
                    }   
                }
                if (op === "+=" || op === "-=") {
                    // ensure right side is numeric and > 0
                    let operationSplit = operation.split(op);
                    let leftLex = operationSplit[0];
                    let rightLex = operationSplit[1];
                    
                    let leftTypeCheck = checkAlphaNumeric(leftLex);
                    let rightTypeCheck = checkAlphaNumeric(rightLex);

                    if(leftTypeCheck === "var") {
                        if(rightTypeCheck === "num") {
                            rightLex = rightLex.trim();
                            let rightLexVal = Number(rightLex);
                            if(rightLexVal > 0) {
                                operationDone = "lin";
                            }
                            else {
                                operationDone = "err";
                            }
                        }
                        else {
                            operationDone = "err";
                        }
                    }
                    else {
                        operationDone = "err";
                    }
                }

                if(op === "*=" || op === "/=") {
                    // ensure right side is numeric and > 1
                    // ensure right side is numeric and > 0
                    let operationSplit = operation.split(op);
                    let leftLex = operationSplit[0];
                    let rightLex = operationSplit[1];
                    
                    let leftTypeCheck = checkAlphaNumeric(leftLex);
                    let rightTypeCheck = checkAlphaNumeric(rightLex);

                    if(leftTypeCheck === "var") {
                        if(rightTypeCheck === "num") {
                            rightLex = rightLex.trim();
                            let rightLexVal = Number(rightLex);
                            if(rightLexVal > 1) {
                                operationDone = "log";
                            }
                            else {
                                operationDone = "err";
                            }
                        }
                        else {
                            operationDone = "err";
                        }
                    }
                    else {
                        operationDone = "err";
                    }
                }
            }
            break;
        }
        operationDone = "err";
    }

    
    return {
        "eval": operationDone,
        "level": level
    }

}

function getBigONotation(forStatements) {
    var val_results = [];
    forStatements.forEach(forLine => {
        // evaluate the notation of the for loop
        let r = evaluateForStatement(forLine);
        val_results.push(r);
    })
    

    var bigORes;
    var bigOString = "";
    var bigOList = [];
    var hasError = false;
    var isLazy = false;
    for(var i = 0; i < val_results.length; i++) {
        let val_result = val_results[i];
        let eval = val_result['eval'];
        let level = val_result['level'];

        if(i != 0 && level == 1) {
            bigOList.push(bigOString);
            bigOString = "";
        }

        if(eval === "err") {
            hasError = true;
            break;
        }

        if(eval == "lazy") {
            isLazy = true;
            break;
        }

        else if(eval === "lin") {
            bigOString += "N";
        }

        else if(eval == 'log') {
            bigOString += "L"
        }
        
        else if(eval == "const") {
            bigOString += "O"
        }

        else {
            hasError = true;
        }

    }
    
    bigOList.push(bigOString);


    bigORes = getBiggestBigOString(bigOList);
    var finalResult = translateBigOStringToBigO(bigORes);

    return finalResult;

}