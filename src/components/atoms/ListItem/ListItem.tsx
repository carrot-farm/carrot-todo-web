/**@jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { Base, Ripple, Divider } from 'react-carrot-ui';

import { ComponentType } from '../../../../node_modules/react-carrot-ui/dist/types/components/Base/Base'
import { flexAlignType } from '../../../../node_modules/react-carrot-ui/dist/types/styles'
import TodoTemplate from '../../templates/TodoTemplate';

// ===== type
type TListItemProps = {
  /** 내부 컴포넌트 */
  children?: React.ReactNode,
  /** 컴포넌트 */
  component?: ComponentType;
  /** flex align */
  flexAlign?: flexAlignType;
  /** ripple 여부 */
  ripple?: boolean;
  /** divider 여부 */
  divider?: boolean;
  /** padding 적용 여부 */
  fullWidth?: boolean;
  /** 클릭 이벤트 */
  onClick?:(e: any) => void
};


// ===== component
function ListItem({
  children,
  component = 'li',
  flexAlign,
  ripple = true,
  divider = true,
  fullWidth = false,
  onClick,
  ...args
}: TListItemProps) {

  return (
    <React.Fragment>
      <Base 
        {...args} 
        component={component} 
        css={rootStyle({ fullWidth })} 
        onClick={onClick}
        flexAlign={flexAlign}
      >
        {children}
        {ripple && 
          <Ripple color="grey-lighten-1" />
        }
      </Base>
      {divider && 
        <Divider color="grey-lighten-2" />
      }
    </React.Fragment>
  );
}

// ===== style
const rootStyle = ({ fullWidth }: any) => css`
  position: relative;
  overflow: hidden;
  height: 55px;
  display: flex;
  align-items: center;
  ${!fullWidth && 
    'padding: 0 15px;'
  }
  cursor: pointer;
`

export default ListItem;