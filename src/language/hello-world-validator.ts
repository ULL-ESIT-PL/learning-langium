import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { HelloWorldAstType, Model, Def } from './generated/ast.js';
import type { HelloWorldServices } from './hello-world-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: HelloWorldServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.HelloWorldValidator;
    const checks: ValidationChecks<HelloWorldAstType> = {
        Model: validator.checkModel,
        Def: validator.checkDef,
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class HelloWorldValidator {

    /**
     * Check model for duplicated def names
     * 
     * @param model 
     * @param accept 
     */
    checkModel(model: Model, accept: ValidationAcceptor): void {

        // Check for duplicated def names
        let defs = model.defs;
        let defNames = new Set<string>();
        for (let def of defs) {
            if (defNames.has(def.name)) {
                accept('error', 'Duplicate def name.', { node: def, property: 'name' });
            } else {
                defNames.add(def.name);
            }
        }
    }

    /**
     * Check definitions for duplicated params
     * 
     * @param def 
     * @param accept 
     */
    checkDef(def: Def, accept: ValidationAcceptor): void {
        const params = def.params;
        const paramNames = new Set<string>();
        for (let param of params) {
            if (paramNames.has(param.name)) {
                accept('error', `Duplicate parameter name. '${param.name}'`, { node: param, property: 'name' });
            } else {
                paramNames.add(param.name);
            }
        }

    }

}

