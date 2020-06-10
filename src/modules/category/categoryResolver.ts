import { deleteListItem, updateListItem } from '../../utils/apolloUtils';

import { CLIENT_CATEGORIES } from '../category/categoryQuery';


export const queryResolver = {
  clientCategory: (_:any, args:any, ctx:any) => {
    const categories = ctx.cache.readQuery({ query: CLIENT_CATEGORIES });
    // console.log(categories)
    return null;
  }
}

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

}