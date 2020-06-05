

const mutation = {
  // # set drawer sw
  setDrawerSw: (_: any, variables: any, context: any ) => {
    // console.log('> setDrawerSw: ', variables.sw)
    context.cache.writeData({
      data: {
        drawerSw: variables.sw
      }      
    });
    return null;
  },
};

export default mutation;