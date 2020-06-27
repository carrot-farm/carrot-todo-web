import { deleteListItem, updateListItem, findListItem } from '../../utils/apolloUtils';

import { CLIENT_CATEGORIES } from '../category/categoryQuery';

// ===== query
export const queryResolver = {
}

// ===== mutation
export const categoryMutationResolver = {
  // # 카테고리 삭제
  deleteCategory: (_:any, args: {id:number}, ctx: any) => {
    return deleteListItem((a) => a.id === args.id, {
      query: CLIENT_CATEGORIES,
      cache: ctx.cache,
      listName: 'categories'
    });
  },

  // # 카테고리 업데이트
  updateCategory: async (_:any, args:any, ctx:any) => {
    const f = (a: any) => {
      if(a.id === args.id) {
        a.category = args.category;
      }
      return a;
    };
    
    return updateListItem(f,
      {
        query: CLIENT_CATEGORIES,
        cache: ctx.cache,
        listName: 'categories'
      }
    )
  },

  // # 카테고리 선택
  clientSelectCategory: (_: any, args: { categoryId: number }, ctx: any ) => {
    // 카테고리 찾기
    const findedCategory = findListItem((a: TCategory) => {
      return !!(a.id === args.categoryId);
    }, {
      query: CLIENT_CATEGORIES,
      cache: ctx.cache,
      listName: 'categories',
    })
    // 선택된 카테고리 쓰기
    ctx.cache.writeData({
      data: {
        selectedCategory: findedCategory
      },
    });
    console.log('> clientSelectCategory', findedCategory);
    return findedCategory
  }

}