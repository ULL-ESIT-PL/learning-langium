grammar MiniLogo

entry Model:  (stmts+=Stmt | defs+=Def)*;

Stmt: Cmd | Macro;
Cmd: Pen | Move | Color | For;
Macro: def=[Def:ID] '(' (args+=Expr (',' args+=Expr)*)? ')'; // Macro call

Def: 'def' name=ID '(' (params+=Param (',' params+=Param)*)? ')' Block;