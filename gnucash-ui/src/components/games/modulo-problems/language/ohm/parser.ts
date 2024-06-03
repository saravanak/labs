import ohm from "ohm-js";
const debug = require("debug")("parser");
export default class ModuloParser {
  moduloGrammar: ohm.Grammar;

  constructor(colors: string[]) {
    const colorsAtom = `${colors
      .map((c) => `"${c.toUpperCase()}"`)
      .join(" | ")}`;

    this.moduloGrammar = ohm.grammar(String.raw`
  Arithmetic {
    Line = IfExpr (~end IfExpr)* eol?
    IfExpr = "IF" Condition "RETURN" ReturnValue
    ReturnValue = Color
    Condition = BiCondition | MonoCondition
    BiCondition = Condition "And" Condition
    MonoCondition = AddExp Operator 
    
    AddExp = Number "+" Number  -- plus
           | Number "-" Number  -- minus
           | Number
    
    Operator = BiOperator | MonoOperator 
    MonoOperator = MonoOpName Number 
    MonoOpName = "Greater Than" 
             | "Lesser Than" 
             | "Equal To"              
    BiOperator  = "When Divided By" Number "Leaves Reminder" Number
                | "When Divided By" Number "Gives Quotient" Number
    Literal = "Row"
            | "Col"
    Color = ${colorsAtom}
    Number = Literal 
            | digit+
    eol = "\r"? "\n"
  }
`);
  }

  parse(program: string) {
    return this.moduloGrammar.match(program);
  }

  get program() {
    const results: any[] = [];
    return {
      Line(firstIf: ohm.Node, nextIfs: ohm.Node, _x: ohm.Node) {
        debug({
          row: this.args.row,
          col: this.args.col,
          lines: nextIfs.sourceString,
        });

        const value = firstIf.eval(this.args.row, this.args.col);

        results.push({ value });
        results.push(
          ...nextIfs.children.map((c) => {
            return { value: c.eval(this.args.row, this.args.col) };
          })
        );
        return results.find((r) => r.value)?.value;
      },
      _iter(...children) {
        debug(`iter: ${children}`);
      },
      _terminal() {
        debug(`terminal: ${this.sourceString}`);

        return null;
      },
      IfExpr(
        _: ohm.Node,
        condition: ohm.Node,
        _x: ohm.Node,
        retValue: ohm.Node
      ) {
        if (condition.eval(this.args.row, this.args.col)) {
          return retValue.eval(this.args.row, this.args.col);
        }
      },
      ReturnValue(a: ohm.Node) {
        return a.sourceString.toLowerCase() == "false"
          ? false
          : a.sourceString.toLowerCase();
      },
      BiCondition(lhs: ohm.Node, _: ohm.Node, rhs: ohm.Node) {
        const lhsValue = lhs.eval(this.args.row, this.args.col);
        const rhsValue = rhs.eval(this.args.row, this.args.col);
        debug(`BiCondition: lhs: ${lhsValue}; rhs: ${rhsValue}`);

        return lhsValue && rhsValue;
      },
      MonoCondition(addExpression: ohm.Node, operator: ohm.Node) {
        const opValue = operator.eval(this.args.row, this.args.col);

        const lhs = addExpression.eval(this.args.row, this.args.col);
        debug({ opValue, lhs });

        switch (opValue.condition) {
          case ">":
            return lhs > opValue.op;
          case "<":
            return lhs < opValue.op;
          case "=":
            return lhs == opValue.op;
          case "%":
            return lhs % opValue.div == opValue.op;
          case "/":
            return Math.floor(lhs / opValue.div) == opValue.op;
        }
        return null;
      },
      AddExp_plus(a: ohm.Node, _: ohm.Node, b: ohm.Node) {
        return (
          a.eval(this.args.row, this.args.col) +
          b.eval(this.args.row, this.args.col)
        );
      },
      AddExp_minus(a: ohm.Node, _: ohm.Node, b: ohm.Node) {
        return a.eval() - b.eval();
      },
      AddExp(a: ohm.Node) {
        debug({ addExp: a.sourceString });
        return a.eval(this.args.row, this.args.col);
      },
      Operator(a) {
        debug(`Operatopr: , ${a.sourceString}`);

        return a.eval(this.args.row, this.args.col);
      },
      MonoOperator(operation: ohm.Node, number: ohm.Node) {
        switch (operation.sourceString) {
          case "Greater Than":
            return {
              condition: ">",
              op: number.eval(this.args.row, this.args.col),
            };
          case "Lesser Than":
            return {
              condition: "<",
              op: number.eval(this.args.row, this.args.col),
            };
          case "Equal To":
            return {
              condition: "=",
              op: number.eval(this.args.row, this.args.col),
            };
        }
      },
      BiOperator(
        _: ohm.Node,
        divisor: ohm.Node,
        operation: ohm.Node,
        value: ohm.Node
      ) {
        switch (operation.sourceString) {
          case "Leaves Reminder":
            return {
              condition: "%",
              div: divisor.eval(this.args.row, this.args.col),
              op: value.eval(this.args.row, this.args.col),
            };
          case "Gives Quotient":
            return {
              condition: "/",
              div: divisor.eval(this.args.row, this.args.col),
              op: value.eval(this.args.row, this.args.col),
            };
        }
      },
      Literal(a: ohm.Node) {
        debug(`Literal: ${a.sourceString}`);

        return a.sourceString == "Row" ? this.args.row : this.args.col;
      },
      Color(a: ohm.Node) {
        return a.sourceString.toLowerCase();
      },
      Number(digits: ohm.Node): number {
        if (["Row", "Col"].includes(digits.sourceString)) {
          return digits.eval(this.args.row, this.args.col);
        }
        return parseInt(digits.sourceString);
      },
    };
  }

  eval(program: string, { row, col }: Record<string, number>) {
    const semantics = this.moduloGrammar.createSemantics();
    semantics.addOperation("eval(row, col)", this.program);
    try {
      return semantics(this.parse(program)).eval(row, col);
    } catch (error) {
      console.error("Unable to eval program", error);
      return null;
    }
  }
}
