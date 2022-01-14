import React, { VFC } from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';

import { Color, typeScale, TypeScale, useColors } from '../../style';

type Props = TextProps & {
  color?: Color;
  type?: TypeScale;
};

const Text: VFC<Props> = ({
  color = 'onSurface',
  style,
  type = 'bodyMedium',
  ...props
}) => {
  const colors = useColors();

  return (
    <RNText
      style={StyleSheet.flatten([
        typeScale[type],
        { color: colors[color] },
        style,
      ])}
      {...props}
    />
  );
};

export default Text;
