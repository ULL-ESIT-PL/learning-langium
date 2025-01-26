// Copied from https://github.com/TypeFox/langium-minilogo/blob/397737b7e1c39530383da58cb4efec48dd5bfd81/src/language-server/minilogo-validator.ts

import { AstNode, ValidationAcceptor, ValidationChecks, ValidationRegistry } from 'langium';
import { MiniLogoAstType, isDef, isModel } from './generated/ast.js';
import type { MiniLogoServices } from './minilogo-module.js';

type MiniLogoChecks = ValidationChecks<MiniLogoAstType>

export class MiniLogoValidationRegistry extends ValidationRegistry {
    constructor(services: MiniLogoServices) {
        super(services);
        const validator = services.validation.MiniLogoValidator;

        const checks: MiniLogoChecks = {
            Model: validator.checkUniqueDefs,
            Def:   validator.checkUniqueParams
        };

        this.register(checks, validator);
    }
}

export class MiniLogoValidator {

    checkUniqueDefs(model: AstNode, accept: ValidationAcceptor): void {
        if (!isModel(model)) {
            throw new Error('Retrieve a non-model in validation');
        }
        const reported = new Set();
        model.defs.forEach(d => {
            if (reported.has(d.name)) {
                accept('error',  `Def has non-unique name '${d.name}'.`,  {node: d, property: 'name'});
            }
            reported.add(d.name);
        });
    }

    checkUniqueParams(def: AstNode, accept: ValidationAcceptor): void {
        if (!isDef(def)) {
            throw new Error('Retrieve a non-def in validation');
        }
        const reported = new Set();
        def.params.forEach(p => {
            if (reported.has(p.name)) {
                accept('error', `Param ${p.name} is non-unique for Def '${def.name}'`, {node: p, property: 'name'});
            }
            reported.add(p.name);
        });
    }

}
