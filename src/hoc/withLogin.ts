import React from 'react';


const WithLogin = () => (WrappedComponent: any) => {
  console.log('> wrapped component', WrappedComponent.prototype.test = '당근')
  // return <WrappedComponent />
  return WrappedComponent
}

export default WithLogin;