import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { HelloWorldAstType, Person, Cadena } from './generated/ast.js'; // Import the Cadena type from the generated AST
import type { HelloWorldServices } from './hello-world-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: HelloWorldServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.HelloWorldValidator;
    const checks: ValidationChecks<HelloWorldAstType> = {
        Person: validator.checkPersonStartsWithCapital,
        Cadena: validator.checkCadenaHasO               // You have to register the check for the Cadena type here
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class HelloWorldValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 
                    'Person name should start with a capital.', 
                    { 
                        node: person, 
                        property: 'name' 
                    });
            }
        }
    }

    checkCadenaHasO(cad: Cadena, accept: ValidationAcceptor): void {
        if (cad?.str?.includes("o")) // A Cadena has a property 'str' that is a string
          accept(
            'warning', 'strings with letter "o" are not allowed!.', 
            { node: cad, property: 'str' });
    }

}
