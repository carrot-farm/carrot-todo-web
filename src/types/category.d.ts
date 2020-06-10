/** 카테고리 */
export type TCategory = {
  id: number;
  category: string;
}

/** 카테고리 배령 */
export type TCategories = TCategory[];

declare global {
  /** 카테고리 */
  type TCategory = {
    id: number;
    category: string;
  }

  /** 카테고리 리스트 */
  type TCategories = TCategory[];
}