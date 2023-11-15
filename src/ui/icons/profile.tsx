  import * as React from 'react';
  import type { SvgProps } from 'react-native-svg';
  import Svg, { Path } from 'react-native-svg';
  
  export const Profile = ({ color = '#000', ...props }: SvgProps) => {
    return (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
        <Path
          d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"
          fill={color}
        />
      </Svg>
    );
  };
