import { parseCodeToTree } from "./parse-code.js";

const javaText = `
public class HelloWorldExample{
  public static void main(String args[]){
    while (x < n) {
      if (x < n) {
        break;
      }
    }
    for (int i = 0; i < n; i++) {}
  }
}
`;

function getSourceCodeBigO(javaCode) {
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
  // TODO: Add logic
}

getSourceCodeBigO(javaText);