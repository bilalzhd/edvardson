import { PropsWithChildren } from 'react'
function Box({ children }: PropsWithChildren<unknown>) {
  return (
    <div
    className='px-4'
      style={{
        display: 'block',
        lineHeight: 2,
        marginBottom: '0.5rem',
        width: 260,
      }}
    >
      {children}
    </div>
  );
}

export default Box;
