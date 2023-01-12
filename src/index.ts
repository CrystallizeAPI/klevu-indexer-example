import fs from 'fs';
import convertVariantToDocument from './use-cases/convertVariantToDocument.js';
import getSessionId from './use-cases/getSessionId.js';
import pushToKlevu from './use-cases/pushToKlevu.js';

function* loopInProduct(nodes: any[]): IterableIterator<any> {
    for (const node of nodes) {
        if (node.shape === 'product') {
            yield node;
        } else if (node.children && node.children.length > 0) {
            yield* loopInProduct(node.children);
        }
    }
}
async function main() {
    const data = JSON.parse(fs.readFileSync(process.argv[2], 'utf-8'));
    let records = [];
    for (const product of loopInProduct(data.items)) {
        for (const variant of product.variants) {
            const record = convertVariantToDocument({
                product,
                ...variant
            });
            records.push({ record });
        }
    }
    const sessionId = await getSessionId();
    if (!sessionId) {
        throw new Error('No session id');
    }
    const response = await pushToKlevu(sessionId, records, process.argv?.[3] === 'update');
    console.log(response);
}
main().catch(console.error)
