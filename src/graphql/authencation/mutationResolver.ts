import { TUser } from '../../types/authencate';

const mutation = {
  /** 유저 정보 셋팅 */
  setUser: (_: any, { user }: {user: TUser}, context: any ) => {
    // console.log('> setUser: ', user)
    context.cache.writeData({
      data: {
        user
      }      
    });
    return user;
  },
};

export default mutation;