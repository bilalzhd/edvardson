
function Box({ children, width = 260 }: {children: React.ReactNode, width: number | undefined | string}) {
  let classes: string;
  if(width === "100%") classes = "px-2 w-full"
  else classes = "px-2 w-[180px] md:w-[320px]"
  return (
    <div
    className={classes}
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
