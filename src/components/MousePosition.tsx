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
  verticalAlign: 'middle',
  display: 'inline-flex',
  lineHeight: '20px',
};

const colorBox = {
  display: 'inline-block',
  width: 15,
  height: 15,
  margin: '0 10px',
  border: '1px solid #aaa',
}

export const MousePosition = ({ x, y, color }: Props): React.ReactElement<Element> => {
  return (
    <div style={styles}>
      {x},
      {' '}
      {y}
      {' '}
      <span style={{
        ...colorBox,
        backgroundColor: `#${color}`,
      }} />
      {' '}
      {color}
    </div>
  );
};
