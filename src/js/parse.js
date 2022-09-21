const {
    BaseJavaCstVisitor,
    BaseJavaCstVisitorWithDefaults,
    parse
} = require("java-parser");

const javaText = `
public class HelloWorldExample{
  public static void main(String args[]){
    int i;
    for (int i = 0; i < n; n++) {
        for (int j = 0; j < n; j++) {
            System.out.println("Hello");
        }
    }
    for(int y = 0; y < n; y++) {}
    //for(String x : xs) {}
  }
}
`;



class ForLoopCollector extends BaseJavaCstVisitorWithDefaults {
    constructor() {
        super();
        this.loops = [];
        this.validateVisitor();
    }

    basicForStatement(ctx) {
        const forLoop = {
            type: 'basic',
            init: this.getElements(ctx.forInit[0].children),
            expr: this.getElements(ctx.expression[0].children),
            update: this.getElements(ctx.forUpdate[0].children),
            stmt: this.getElements(ctx.statement[0].children),
            blockCst: ctx.statement[0].children
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

const cst = parse(javaText);
const forLoopCollector = new ForLoopCollector();
forLoopCollector.visit(cst);
console.log(forLoopCollector.loops);