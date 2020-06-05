import React from 'react';
import { Base } from 'react-carrot-ui';

import TodoTemplate from '../../templates/TodoTemplate';

// ===== type
type TListProps = {
  /** 생성될 HTML 명. default: "ul" */
  component?: "ul" | "a" | "article" | "button" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "i" | "li" | "p" | "section" | "span" | "table" | undefined,
  /** 내부 컴포넌트 */
  children?: React.ReactNode,
};

// ===== component
function List({
  component = 'ul',
  children,
}: TListProps) {

  return (
    <Base component={component}>
      {children}
    </Base>
  );
}

export default List;