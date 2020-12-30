import clsx from 'clsx';
import { FC } from 'react';
import './Loading.css';

export const Loading: FC<{ visible?: boolean }> = ({ visible = true, children = 'Loading...' }) => {
  return (
    <div
      className={clsx('simple-loading-spinner', { visible: visible })}
      onClick={() => console.log('clicked')}
    >
      {children}
    </div>
  );
};
