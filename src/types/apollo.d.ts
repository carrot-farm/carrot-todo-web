import './category';

declare global {
  /** 카테고리 */
  type TCategory = {
    id: number;
    category: string;
  }

  /** 카테고리 리스트 */
  type TCategories = TCategory[];

  

}