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

  console.log(stmtTree);
}

getSourceCodeBigO(javaText);