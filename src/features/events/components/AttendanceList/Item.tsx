import { Event } from '@/features/home';
import { compareAsc, format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Field } from '../Field';
import { Attendance } from '../../hooks/useEvent';

export function Item({ item }: { item: Attendance }) {
  return (
    <>
      <div
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '0.5rem',
          overflow: 'hidden',
        }}
      >
        <img
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src={
            item.imageUrl ??
            'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
          }
          alt={item.username}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <h4>{item.username}</h4>
          <span
            style={{
              backgroundColor: item.attendedDate ? '#4caf50' : '#f44336',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            {item.attendedDate ? 'attended' : 'not attended'}
          </span>
        </div>

        <Field label="Username" value={item.email} />

        {item.attendedDate && (
          <Field
            label="Attended date"
            value={format(new Date(item.attendedDate), "PPP 'at' p")}
          />
        )}
      </div>
    </>
  );
}
