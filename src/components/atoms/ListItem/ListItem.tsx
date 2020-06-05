import React from 'react';
import { Base } from 'react-carrot-ui';

import TodoTemplate from '../../templates/TodoTemplate';

// ===== type
type TListItemProps = {
  /** 내부 컴포넌트 */
  children?: React.ReactNode,
};


// ===== component
function ListItem({
  children
}: TListItemProps) {

  return (
    <li>
      {children}
    </li>
  );
}

export default ListItem;