
function Box({ children, width = 260 }: {children: React.ReactNode, width: number | undefined | string}) {
  return (
    <div
    className='px-4'
      style={{
        display: 'block',
        lineHeight: 2,
        marginBottom: '0.5rem',
        width,
      }}
    >
      {children}
    </div>
  );
}

export default Box;
