
import { BaseJavaCstVisitorWithDefaults } from "java-parser";

import { getForLoops } from './get-for-loops.js'
import { getWhileLoops } from "./get-while-loops.js";

class StatementCollector extends BaseJavaCstVisitorWithDefaults {
    constructor() {
        super();
        this.blocks = [];
        this.validateVisitor();
    }

    statement(ctx) {
        for (const stmt in ctx) {
            if (stmt == 'statementWithoutTrailingSubstatement' || stmt == 'labeledStatement')
                this.visit(ctx[stmt]);
            else
                this.blocks.push(ctx[stmt]);
        }
    }
}

export function getStatements(cst) {
    let stmtCollector = new StatementCollector();
    stmtCollector.visit(cst);
    let stmts = [...stmtCollector.blocks];

    stmts.forEach((stmt, index) => {
        if (stmt.length > 1) throw 'Statement has more than one element'; // TODO: For dev purposes only, remove later

        switch (stmt[0].name) {
            case 'forStatement':
                stmts[index] = getForLoops(stmt);
                break;
            case 'ifStatement':
                stmts[index] = stmt[0];
                break;
            case 'whileStatement':
                stmts[index] = getWhileLoops(stmt);
                break;
            default:
                getStatements(stmts);
        }
    })
    return stmts;
}