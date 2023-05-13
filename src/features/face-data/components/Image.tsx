export function Image({
  img,
  style,
}: {
  img: {
    src: string;
    alt: string;
  } | null;
  style?: React.CSSProperties;
}) {
  console.log(img);

  return (
    <div
      style={{
        borderRadius: '1rem',
        width: 500,
        height: 500,
        background: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        ...style,
      }}
    >
      <img
        style={{
          objectFit: 'contain',
        }}
        width={500}
        alt={img?.alt ?? 'Placeholder user image'}
        src={
          img?.src ??
          'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
        }
      />
    </div>
  );
}
