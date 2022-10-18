import { parseCodeToTree } from "./parse-code.js";
import { mapTree } from "./util.js";


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

  mapTree(stmtTree, addStmtBigO);
}

function addStmtBigO(stmt) {
  // TODO: Add logic
}

getSourceCodeBigO(javaText);