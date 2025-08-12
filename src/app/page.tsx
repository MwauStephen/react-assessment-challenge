import { Suspense } from 'react';
import ItemList from '@/components/items/ItemList';

export default function Home() {
  return (
    <div className="">
      <Suspense fallback={<div>Loading...</div>}>
        <ItemList />
      </Suspense>
    </div>
  );
}
