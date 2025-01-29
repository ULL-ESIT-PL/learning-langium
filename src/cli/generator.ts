//import { inspect } from 'util';
//const ins = (x: any) => inspect(x, { depth: 3 });
import { Model } from '../language/generated/ast.js';

import { createMiniLogoServices } from '../language/minilogo-module.js';
import { NodeFileSystem } from 'langium/node';

export function generate (model: Model): string {

    const services = createMiniLogoServices(NodeFileSystem).miniLogoServices;

    // invoke the serializer
    const json = services.serializer.JsonSerializer.serialize(model, { space: 2});

    //console.dir(model, { depth: 4 });
    return json;
}