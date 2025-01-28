import { Model } from '../language/generated/ast.js';

export function generate (model: Model): string {
    return model?.stmts?.length.toString() || '@error!@';
}