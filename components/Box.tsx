
function Box({ children, width = 260 }: {children: React.ReactNode, width: number | undefined | string}) {
  return (
    <div
    className={`px-2 w-[180px] md:w-[320px]`}
      style={{
        display: 'block',
        lineHeight: 2,
        marginBottom: '0.5rem',
      }}
    >
      {children}
    </div>
  );
}

export default Box;
