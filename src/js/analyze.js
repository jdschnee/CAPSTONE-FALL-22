import { getForLoopBigO } from "./for-loops.js";
import { parseCodeToTree } from "./parse-code.js";
import { mapTree } from "./util.js";


const javaText = `
public class HelloWorldExample{
  public static void main(String args[]){
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n; j++) {
        for (int k = 0; k < n; k++) {}
      }
    }

    for (int x = 0; x < n; x++) {}
  }
}
`;

function getSourceCodeBigO(javaCode) {
  const stmtTree = parseCodeToTree(javaCode);

  mapTree(stmtTree, addStmtBigO);

  const res = findLargestBigO(stmtTree);
  console.log(res);
}

function findLargestBigO(tree) {
  mapTree(tree, bigOs);
  return Math.max(...bigOList);
}
var bigOList = [];
function bigOs(stmt) {
  bigOList.push(stmt.bigO);
}

function addStmtBigO(stmt) {
  let bigO = 0;
  switch (stmt.type) {
    case 'forLoop':
      bigO = getForLoopBigO(stmt);
      break;
    case 'whileLoop':
      bigO = 0;
      // TODO: Add BigO Function
      break;
    case 'ifStmt':
      bigO = 0;
      // TODO: Add BigO Function
      break;
    default:
      bigO = 0;
      // TODO: Throw error?
      break;
  }
  if (stmt.parent != null) {
    stmt.bigO = stmt.parent.bigO + bigO;
  } else {
    stmt.bigO = bigO;
  }
}

getSourceCodeBigO(javaText);