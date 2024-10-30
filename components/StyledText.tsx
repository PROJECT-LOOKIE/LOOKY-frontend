import { Text, TextProps } from "./Themed";

export function MediumText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "Pretendard" }]} />
  );
}

export function ThinText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "PretendardThin" }]} />
  );
}

export function BoldText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "PretendardBold" }]} />
  );
}
