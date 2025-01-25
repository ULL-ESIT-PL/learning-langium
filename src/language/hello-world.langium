grammar MiniLogo

entry Model:  (stmts+=Stmt | defs+=Def)*;

Stmt: Cmd | Macro;
Cmd: Pen | Move | Color | For;
Macro: def=[Def:ID] '(' (args+=Expr (',' args+=Expr)*)? ')'; // Macro call

Def: 'def' name=ID '(' (params+=Param (',' params+=Param)*)? ')' Block;
Param: name=ID;

fragment Block: '{' body+=Stmt* '}';

Pen: 'pen' '(' mode=('up' | 'down') ')';
Move: 'move' '(' ex=Expr ',' ey=Expr ')';
Color: 'color' '(' (r=Expr ',' g=Expr ',' b=Expr) | color=ID | color=HEX ')';
For: 'for' '(' var=Param ',' e1=Expr ',' e2=Expr ')' Block;

Expr: Add;
Add infers Expr:
    Mult ({infer BinExpr.e1=current} op=('+'|'-') e2=Mult)*;
Mult infers Expr:
    PrimExpr ({infer BinExpr.e1=current} op=('*'|'/') e2=PrimExpr)*;
PrimExpr: Lit | Ref | Group | NegExpr;

Lit: val=INT;
Ref: var=[Param:ID];
Group: '(' ge=Expr ')';
NegExpr: '-' ne=PrimExpr;

terminal HEX returns string: /#(\d|[a-fA-F]){3,6}/;
terminal ID returns string: /[_a-zA-Z]\w*/;
terminal INT returns number: /\d+/;