grammar HelloWorld

entry Model:
    (persons+=Person | greetings+=Greeting | cadenas+=Cadena)*;

Person:
    'person' name=ID;

Greeting:
    'Hello' person=[Person:ID] '!';

Cadena:
    str=STRING;

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
