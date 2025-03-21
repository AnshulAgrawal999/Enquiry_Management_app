'use client'

import EnquiryDetails from '@/components/EnquiryDetails';
import Navbar from '@/components/Navbar';
import RemarkSection from '@/components/RemarkSection';

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

      <EnquiryDetails />

      <RemarkSection studentId={id as string} />
      
    </div>
  );
}
