import { getStatements } from './get-statements.js';
import { parse } from "java-parser";

const javaText = `
public class HelloWorldExample{
  public static void main(String args[]){
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n; j++) {}
    }
    for (int k = 0; k < n; k++) {
      for (int l = 0; l < n; l++) {}
    }
  }
}
`;



function getSourceCodeBigO(javaCode) {
  const cst = parse(javaCode);
  const stmtTree = buildStmtTree(cst);

  console.log(stmtTree);
}

function buildStmtTree(cst, parent = null) {
    const stmts = getStatements(cst);
    if (stmts.length == 0) return null;
  
    stmts.forEach((stmt, index) => {
      stmts[index]['parent'] = parent;
      stmts[index]['childStmts'] = [];
      
      console.log(stmt.hasOwnProperty('blockCst'));
      console.log(stmt.blockCst);
      const childStmt = stmt.hasOwnProperty('blockCst') ? buildStmtTree(stmt.blockCst, stmt) : null;
      if (stmt.hasOwnProperty('blockCst')) {
        buildStmtTree(stmt.blockCst, stmt);
        if (childStmt != null && childStmt.length > 1) throw ('Too many items in child statement array'); // TODO: For dev purposes only, remove later
        if (childStmt != null) stmts[index]['childStmts'].push(childStmt[0]);
      }
    })

    return stmts;
}

getSourceCodeBigO(javaText);







