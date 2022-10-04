import { BaseJavaCstVisitorWithDefaults } from "java-parser";

class ForLoopCollector extends BaseJavaCstVisitorWithDefaults {
    constructor() {
        super();
        this.loops = [];
        this.validateVisitor();
    }

    basicForStatement(ctx) {
        const forLoop = {
            type: 'basicForLoop',
            init: ctx.hasOwnProperty('forInit') ? this.getElements(ctx.forInit[0].children) : null,
            expr: ctx.hasOwnProperty('expression') ? this.getElements(ctx.expression[0].children) : null,
            update: ctx.hasOwnProperty('forUpdate') ? this.getElements(ctx.forUpdate[0].children) : null,
            blockCst: ctx.hasOwnProperty('statement') ? ctx.statement[0] : null
        };
        this.loops.push(forLoop);
    }


    getElements(ctx) {
        const nodes = [];
        this.getLeafNodes(ctx, nodes);
        return nodes;
    }

    getLeafNodes(ctx, arr) {
        const props = Object.getOwnPropertyNames(ctx);
        props.forEach(prop => {
            ctx[prop].forEach(elem => {
                const childCtx = elem.children;
                if (childCtx != null) {
                    this.getLeafNodes(childCtx, arr);
                } else {
                    arr.push({
                        [prop]: elem.image
                    });
                }
            });
        })
    }
}

export function getForLoops(cst) {
    let forLoopCollector = new ForLoopCollector();
    forLoopCollector.visit(cst);

    return forLoopCollector.loops[0];
}
