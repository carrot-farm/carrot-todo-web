/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { Icon, Ripple, Divider } from 'react-carrot-ui';
import { Link } from 'react-router-dom';

// ===== type
type TSideMenu = {
  /** drawer 닫기 */
  onCloseDrawer: () => void,
};



// ===== component
function SideNav({ 
  onCloseDrawer
 }: TSideMenu) {

  return (
    <div css={rootStyle}>
      {/* ===== 카테고리 등록 ===== */}
      <div css={writeButtonStyle}>
        <Link to="/category/write" >
          <Icon name="plus" />
        </Link>
      </div>
      <Divider color="grey-lighten-2" />

      
    </div>
  );
}

// ===== style
const rootStyle = css`
  position: relative
`;
const writeButtonStyle = css`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 60px;
  & > a {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default SideNav;

