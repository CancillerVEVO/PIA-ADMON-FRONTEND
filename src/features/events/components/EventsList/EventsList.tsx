import { List } from '@/components/List';
import { Event, Group } from '@/features/home';
import { Item } from './Item';

export interface EventsListProps {
  data: Event[];
  readOnly: boolean;
  selected: Event[];
  setSelected: (e: Event[]) => void;
}

export function EventsList({
  data,
  readOnly,
  selected,
  setSelected,
}: EventsListProps) {
  return (
    <List
      data={data}
      getKey={(e) => e.id.toString()}
      onSelectedChange={setSelected}
      renderItem={(e) => <Item event={e} />}
      selected={selected}
      readOnly={readOnly}
    />
  );
}
