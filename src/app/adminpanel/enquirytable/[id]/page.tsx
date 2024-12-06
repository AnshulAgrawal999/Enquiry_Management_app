'use client'

import Navbar from '@/components/Navbar';

import { useParams } from 'next/navigation';

export default function EnquiriePage() {
    
  const params = useParams();
  
  const { id } = params;

  if (!id) {
    return <div>Loading...</div>; // Or handle the case when the id is not available
  }

  return (
    <div>
      <Navbar />
      
    </div>
  );
}
