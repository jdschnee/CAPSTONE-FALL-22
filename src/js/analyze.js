// const getStatements = require('.\get-statements.js');
import { getStatements } from './get-statements.js';

const javaText = `
public class HelloWorldExample{
  public static void main(String args[]){
    for (;;) {

    }
    for (int i = 0; i < n; i++) {

    }
    if (x == 0) {
        for (int y = 9; y < n; y++) {

        }
    }
    
    int x = 0;
    while (x < y) {
        for (int item : items) {}
    }
  }
}
`;

const stmts = getStatements(javaText);



console.log(stmts);
