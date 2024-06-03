import { BiColor } from "../language/predicates/two-colors/two-colors";

export type LevelDefintion = {
  id: string, 
  type: "help" | "challenge",
  config: CheckerProblemDefinition | HelpDefinition
}

export type HelpDefinition = {
  topic: string
}
export type CheckerProblemDefinition = {
  gridSize: number;
  colors: BiColor;
  predicateFactory: (c: BiColor) => (a: number, b: number) => string;
  initialBlocks: Record<any,any> 
};

export default ({
  gridSize,
  colors,
  predicateFactory,
}: CheckerProblemDefinition) => {
  const defaultColor = colors[1]; 
  const predicate = predicateFactory(colors);
  const range = Array(gridSize).fill(defaultColor);
  return range.map((_, row) => {
    return Array(gridSize)
      .fill(defaultColor)
      .map((_, col: number) => {
        return predicate(row, col);
      });
  });
};
