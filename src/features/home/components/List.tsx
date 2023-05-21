export interface ListProps<T> {
  data: T[];
  selected: T[];
  onSelectedChange: (selected: T[]) => void;
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => string;
  readOnly?: boolean;
}

export function List<T>({
  data,
  selected,
  onSelectedChange,
  renderItem,
  getKey,
  readOnly,
}: ListProps<T>) {
  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
      }}
    >
      {data.map((item) => (
        <li
          key={getKey(item)}
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            padding: '1rem',
            borderBottom: '1px solid #ccc',
            backgroundColor: selected.includes(item) ? '#ddd' : 'transparent',
          }}
        >
          {!readOnly && (
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={(e) => {
                if (e.target.checked) {
                  onSelectedChange([...selected, item]);
                } else {
                  onSelectedChange(selected.filter((m) => m !== item));
                }
              }}
              style={{
                cursor: 'pointer',
              }}
            />
          )}
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
