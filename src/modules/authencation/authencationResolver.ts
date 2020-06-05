import { TUser } from '../../types/authencate';

const mutation = {
  // # set drawer sw
  setUser: (_: any, { user }: {user: TUser}, context: any ) => {
    console.log('> setUser: ', user)
    context.cache.writeData({
      data: {
        user
      }      
    });

    return user;
  },
};

export default mutation;