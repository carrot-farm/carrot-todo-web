// ===== common
export interface TUseData<U> {
  [fieldName: string] : U
}

// ===== 유저 정보
export type TUser = {
  /** 기준 id */
  id: number;
  /** 유저 아이디  */
  user_id: string;
  /** 이메일 */
  email: string;
  /** 타입 */
  __typename?: 'user';
};


// ===== todo
// # todo 단일 데이터
export type TTodo = {
  /** 아이디 */
  id: number;
  /** 할일 */
  todo: string;
  /** 완료 유무 */
  is_completed: 0|1;
};

// # todo의 배열
export type TTodos = TTodo[];


// ===== category
/** 카테고리 */
export type TCategory = {
  id: number;
  category: string;
}

/** 카테고리 배열 */
export type TCategories = TCategory[];


// ===== client
// # client store 정보
export type TClientStore = {
  /** drawer 스위치 */
  drawerSw: boolean;
  user: TUser | null;
  categories: TCategories;
  selectedCategory: TCategory & {
    __typename: "todo_category"
  }
}

