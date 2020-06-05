/** @jsx jsx */
import React, { useCallback, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import { 
  AppBar, 
  Container, 
  IconButton,
  Drawer,
  Icon
} from 'react-carrot-ui';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import SideNav from '../../mocules/SideNav';
import { COMMON } from '../../../modules/common/commonQuery';
import { SET_DRAWER_SW } from '../../../modules/common/commonMutation';

// ===== type
type TTodoTemplate = {
  /** 컨텐츠 */
  children: React.ReactNode,
  /** 메뉴버튼 노출 여부 */
  menuButton?: boolean;
  /** 뒤로가기 버튼 노출 여부 */
  backButton?: boolean;
  /** 글작성 버튼 노출 여부 */
  writeLinkButton?: boolean;
  /** submit 버튼 */
  submitButton?: boolean;
  /** loginButton */
  loginButton?: boolean;
  /** submit 버튼 클릭시 이벤트 */
  onSubmitButtonClick?: () => void;
  /** 로그인 버튼 클릭 */
  onLoginButtonClick?: () => void;
};

// ===== component
/** todo 템플릿 */
function TodoTemplate({
  children,
  menuButton = true,
  backButton = false,
  writeLinkButton = false,
  submitButton = false,
  loginButton = false,
  onSubmitButtonClick,
  onLoginButtonClick,
}: TTodoTemplate) {
  const { data } = useQuery(COMMON);
  const [ setDrawerSw ] = useMutation(SET_DRAWER_SW);
  const history = useHistory();
  // console.log('> render')

  // # 마운트
  useEffect(() => {

    // # 언마운트
    return () => {
      setDrawerSw({ 
        variables: {
          sw: false
        }
      });
    }
  }, [])

  // # drawer
  const handleOpenDrawer = useCallback(() => {
    setDrawerSw({ 
      variables: {
        sw: true
      }
    });
  }, [setDrawerSw]);
  const handleCloseDrawer = useCallback(() => {
    setDrawerSw({ 
      variables: {
        sw: false
      }
    });
  }, [setDrawerSw]);

  // # back
  const handleBackButtonClick = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <div>
      {/* ===== header ===== */}
      <AppBar align="space-between"
        borderBottom
        borderColor="grey-lighten-1"
      >
        {/* 왼쪽 */}
        <div>
          {menuButton && 
            <IconButton 
              iconName="bars"
              rippleColor="grey"
              onClick={handleOpenDrawer}
            />
          }
          {backButton && 
            <IconButton
              iconName="angleLeft"
              rippleColor="grey"
              onClick={handleBackButtonClick}
            />
          }
        </div>

        {/* 오른쪽 */}
        <div>
          {writeLinkButton && 
            <Link to="/todo/write" >
              <IconButton iconName="pen" />
            </Link>
          }
          {submitButton && 
            <IconButton 
              iconName="send" 
              onClick={onSubmitButtonClick}
            />
          }
          {loginButton && 
            <IconButton
              iconName="user" 
              onClick={onLoginButtonClick}
            />
          }
        </div>
      </AppBar>

      {/* ===== contents ===== */}
      <Container paddingTop={4}>
        {children}
      </Container>

      {/* ===== drawer ===== */}
      <Drawer 
        sw={data.drawerSw} 
        width="320px"
        anchor="left"
        onClose={handleCloseDrawer}
      >
        <SideNav onCloseDrawer={handleCloseDrawer} />
      </Drawer>
    </div>
  )
}

// ===== style

export default TodoTemplate;