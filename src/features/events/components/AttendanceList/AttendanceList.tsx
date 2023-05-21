import { List } from '@/components/List';
import { Item } from './Item';
import { Attendance } from '../../hooks/useEvent';

export interface AttendanceListProps {
  data: Attendance[];
}

export function AttendanceList({ data }: AttendanceListProps) {
  return (
    <List
      data={data}
      getKey={(e) => e.id.toString()}
      renderItem={(e) => <Item item={e} />}
      readOnly
    />
  );
}
