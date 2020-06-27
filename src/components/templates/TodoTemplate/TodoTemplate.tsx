/** @jsx jsx */
import React, { useCallback, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import { 
  AppBar, 
  Container, 
  IconButton,
  Drawer,
} from 'react-carrot-ui';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { TCategory } from '../../../types/category';
import SideNav from '../../mocules/SideNav';
import { CLIENT_COMMON } from '../../../modules/common/commonQuery';
import { SET_DRAWER_SW } from '../../../modules/common/commonMutation';
import { 
  DELETE_CATEGORY, 
  CLIENT_DELETE_CATEGORY, 
  CLIENT_SELECT_CATEGORY,
} from '../../../modules/category/categoryMutation';
import List from '../../mocules/List';
import ListItem from '../../atoms/ListItem';


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
  /** header text */
  headerText?: string;
  /** 현재 선택 되어진 카테고리 데이터 */
  selectedCategory?: TCategory;
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
  headerText,
  selectedCategory,
  onSubmitButtonClick,
  onLoginButtonClick,
}: TTodoTemplate) {
  const { data } = useQuery(CLIENT_COMMON);
  const [ setDrawerSw ] = useMutation(SET_DRAWER_SW);
  const [ clientDeleteCategory ] = useMutation(CLIENT_DELETE_CATEGORY);
  const [ clientSelectCategory ] = useMutation(CLIENT_SELECT_CATEGORY);
  const [ deleteCategory ] = useMutation(DELETE_CATEGORY, {
    onCompleted: (res) => {
      const id = res.deleteCategory.id;
      // console.log('> deleteCategory:', id)
      // client 카테고리 삭제
      clientDeleteCategory({ variables: {id} })
      .finally(() => {
        console.log('> finally')
        setDrawerSw({
          variables: {
            sw: false
          }
        });
      })
    }
  });
  const history = useHistory();
  // console.log(headerText)

  // # 마운트
  useEffect(() => {
    console.log('> todo template moutn : ', selectedCategory)
    // # 언마운트
    return () => {
      setDrawerSw({ 
        variables: {
          sw: false
        }
      });
    }
  }, []);

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

  // # 카테고리 삭제
  const deleteCategoryButtonClick = useCallback((id: number) => {
    if(confirm('정말 삭제 하시겠습니까?')) {
      // console.log('> ', id)
      deleteCategory({ 
        variables: {
          id
        }
      })
    }
  }, []);

  // # 카테고시 선택
  const handleCategoryClick = useCallback(async (categoryId: number) => {
    await setDrawerSw({ variables: { sw: false } });
    await clientSelectCategory({
      variables: {
        categoryId
      }
    });
    // console.log('> d')
    history.push(`/todos/${categoryId}`);
  }, [data]);


  return (
    <div>
      {/* ===== header ===== */}
      <AppBar align="space-between"
        borderBottom
        borderColor="grey-lighten-1"
      >
        {/* 왼쪽 */}
        <div css={flexAlignMiddleCenter}>
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
          {
            headerText && 
            <div>
              {headerText}
            </div>
          }
        </div>

        {/* 오른쪽 */}
        <div>
          {writeLinkButton && selectedCategory && 
            <Link to={`/todo/write/${selectedCategory.id}`} >
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
        {/* side nav  */}
        <SideNav onCloseDrawer={handleCloseDrawer} >
          <List>
            {data.categories.length && data.categories.map((c: TCategory) => (
              <ListItem 
                key={c.id} 
                flexAlign={'space-between'}
                ripple={false}
                onClick={() => handleCategoryClick(c.id)}
              >
                <div>
                  {c.category}
                </div>
                <div css={[categoryModifyLinkStyle, listItemButtonsStyle]} >
                  <IconButton 
                    iconName="close"
                    color="grey-darken-2" 
                    rippleColor="grey" 
                    backgroundColor="transparent"
                    onClick={() => deleteCategoryButtonClick(c.id)}
                  />

                  <Link to={`/category/update/${c.id}`}>
                    <IconButton 
                      iconName="pen" 
                      color="grey-darken-2" 
                      rippleColor="grey" 
                      backgroundColor="transparent" 
                    />
                  </Link>
                </div>
              </ListItem>
            ))}
          </List>
        </SideNav>
      </Drawer>
    </div>
  )
}

// ===== style
const categoryModifyLinkStyle = css`
  z-index: 1;
`
const listItemButtonsStyle = css`
  display: flex;
`
const flexAlignMiddleCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
const writeButtonContainer = css`
  position: fixed;
`;

export default TodoTemplate;