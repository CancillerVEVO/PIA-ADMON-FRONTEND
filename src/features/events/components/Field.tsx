export function Field({ label, value }: { label: string; value: string }) {
  return (
    <p
      style={{
        padding: 0,
        margin: 0,
      }}
    >
      <span
        style={{
          fontWeight: 'bold',
        }}
      >
        {label}:
      </span>{' '}
      <span>{value}</span>
    </p>
  );
}
