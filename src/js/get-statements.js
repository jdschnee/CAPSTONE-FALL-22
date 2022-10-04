
import {
    BaseJavaCstVisitorWithDefaults,
    parse
} from "java-parser";

import { getForLoops } from './get-for-loops.js'

class StatementCollector extends BaseJavaCstVisitorWithDefaults {
    constructor() {
        super();
        this.blocks = [];
        this.validateVisitor();
    }

    statement(ctx) {
        for (const stmt in ctx) {
            this.blocks.push(ctx[stmt]);
        }
    }
}

export function getStatements(javaCode) {
    const cst = parse(javaCode);
    let stmtCollector = new StatementCollector();
    stmtCollector.visit(cst);
    let stmts = [...stmtCollector.blocks];

    stmts.forEach((stmt, index) => {
        switch (stmt[0].name) {
            case 'forStatement':
                stmts[index] = getForLoops(stmt);
                break;
            case 'ifStatement':
                break;
            case 'whileStatement':
                break;
        }
    })
    return stmts;
}