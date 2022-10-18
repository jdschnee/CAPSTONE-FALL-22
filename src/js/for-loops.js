import { BaseJavaCstVisitorWithDefaults } from "java-parser";
import { getLeafNodes } from "./util.js";

class ForLoopCollector extends BaseJavaCstVisitorWithDefaults {
    constructor() {
        super();
        this.loops = [];
        this.validateVisitor();
    }

    basicForStatement(ctx) {
        const forLoop = {
            type: 'forLoop',
            init: ctx.hasOwnProperty('forInit') ? getLeafNodes(ctx.forInit[0].children) : null,
            expr: ctx.hasOwnProperty('expression') ? getLeafNodes(ctx.expression[0].children) : null,
            update: ctx.hasOwnProperty('forUpdate') ? getLeafNodes(ctx.forUpdate[0].children) : null,
            blockCst: ctx.hasOwnProperty('statement') ? ctx.statement[0] : null
        };
        this.loops.push(forLoop);
    }
}

export function getForLoops(cst) {
    let forLoopCollector = new ForLoopCollector();
    forLoopCollector.visit(cst);
    if (forLoopCollector.loops > 0) throw ('Too many loops in forLoopCollector'); //For dev purposes only, delete later
    return forLoopCollector.loops[0];
}

export function getForLoopBigO(stmt) {
    
}
