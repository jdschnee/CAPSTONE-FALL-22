export function getLeafNodes(ctx) {
    const nodes = {};
    recursiveGetLeafNodes(ctx, nodes);
    return nodes;
}

function recursiveGetLeafNodes(ctx, obj) {
    const props = Object.getOwnPropertyNames(ctx);
    props.forEach(prop => {
        ctx[prop].forEach(elem => {
            const childCtx = elem.children;
            if (childCtx != null) {
                recursiveGetLeafNodes(childCtx, obj);
            } else {
                obj[prop]= elem.image
            }
        });
    })
}
