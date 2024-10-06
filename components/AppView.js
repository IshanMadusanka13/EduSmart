import { View } from 'react-native';

import { useThemeColor } from './../hooks/useThemeColor';

export function AppView({ style, lightColor, darkColor, ...otherProps }) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
