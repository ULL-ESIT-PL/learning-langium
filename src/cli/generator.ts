//import { inspect } from 'util';
//const ins = (x: any) => inspect(x, { depth: 3 });
import { Model } from '../language/generated/ast.js';

export function generate (model: Model): string {
    //return Object.keys(model).join("\n") // ins(model?.stmts)
    return model?.stmts?.length.toString() || '@error!@';
}