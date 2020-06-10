/** ===============================
 * resolver 관련 유틸
 =============================== */

type TDeleteListItemParams = {
  /** 배열을 가져올 graphql 쿼리 */
  query: any;
  /** 아폴로 클라이어언트 캐시 인스턴스 */
  cache: any;
  /** 캐시에 저장된 배열의 이름 */
  listName: string;
};
/** cache에서 배열을 읽고 그중 해당하는 아이템하나를 삭제 */
export const deleteListItem = (f: (a: any) => boolean | undefined, {
  query,
  cache,
  listName,
}: TDeleteListItemParams) => {
  const data = cache.readQuery({ query });
  const list = data[listName];
  const itemIndex = list.findIndex(f);
  const item = { ...list[itemIndex] };

  cache.writeData({
    data: {
      [listName]: list.slice(0, itemIndex, 1)
    }
  })
  return item;
};


type TUpdateListItem = TDeleteListItemParams;
/** cacache에서 배열을 읽고 해당하는 아이템을 업데이트한다. */
export const updateListItem = (f: (a: any) => any, {
  query,
  cache,
  listName,
}: TUpdateListItem) => {
  const data = cache.readQuery({ query });
  const list = data[listName];
  const updatedList = list.map(f);
  cache.writeData({
    data: {
      [listName]: updatedList
    }
  })
  return updatedList;
};