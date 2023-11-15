import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

export const Cart = ({ color, ...props }: SvgProps) => (
  <Svg width={25} height={24} fill="none" viewBox="0 0 25 24" {...props}>
    <G
      clipPath="url(#style)"
      stroke={color}
      strokeWidth={2.438}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
    </G>
    <Defs>
      <ClipPath id="style">
        <Path fill="#fff" transform="translate(.002)" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
