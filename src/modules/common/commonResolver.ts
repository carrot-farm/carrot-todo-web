import { gql } from 'apollo-boost';


const mutation = {
  // # set drawer sw
  setDrawerSw: (_: any, variables: any, ctx: any ) => {
    // console.log('> setDrawerSw: ', variables)
    ctx.cache.writeData({
      data: {
        drawerSw: !!variables.sw
      }
    });
    return null;
  },

  
};

export default mutation;