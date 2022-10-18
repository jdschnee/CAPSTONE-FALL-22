import { getForLoopBigO } from "./for-loops.js";
import { parseCodeToTree } from "./parse-code.js";

const javaText = `
public class HelloWorldExample{
  public static void main(String args[]){

    for (int i = 0, j = 3; i < n; i++) {}
    for (;y < n;y++) {}
  }
}
`;

function getSourceCodeBigO(javaCode) {
  // TODO: catch exception with incorrect java code
  const stmtTree = parseCodeToTree(javaCode);

  traverseTree(stmtTree);

}

function traverseTree(tree) {
  tree.forEach(stmt => {
    if (stmt.childStmts.length > 0) {
      traverseTree(stmt.childStmts);
    }
    addStmtBigO(stmt);
  })

}

function addStmtBigO(stmt) {
  let bigO = 0;
  switch (stmt.type) {
    case 'forLoop':
      bigO = getForLoopBigO(stmt);
      break;
    case 'whileLoop':
      break;
    case 'ifStmt': 
      break;
  }
}

getSourceCodeBigO(javaText);