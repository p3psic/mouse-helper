import * as React from 'react';

interface Props {
  x: number,
  y: number,
  color: string,
}

const styles = {
  margin: 0,
  padding: '5px 12px',
  color: '#777',
};

export const MousePosition = ({ x, y, color }: Props): React.ReactElement<Element> => {
  return (
    <div style={styles}>
      {x}, {y}, {color}
    </div>
  );
};
