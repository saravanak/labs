import { FlexJustifySpread } from "../ui-hoc/flex-justify-spread";

export default function ListItem({ children }: any) {
  return <FlexJustifySpread className="border-b border-gray-200 border-b-[1px]">{children}</FlexJustifySpread>;
}
