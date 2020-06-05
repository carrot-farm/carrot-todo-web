/** 유저 정보 */
export type TUser = {
  /** 기준 id */
  id: number;
  /** 유저 아이디  */
  user_id: string;
  /** 이메일 */
  email: string;
} | null;