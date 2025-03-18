'use client';

import React, { Suspense } from 'react';

import { Box , Spinner, Center } from '@chakra-ui/react';

import Navbar from '@/components/Navbar'  ;

import EnquiriesTable from '@/components/EnquiryTable'  ;


const TableLoader = () => (
  <Center py={10}>
    <Spinner size="xl" />
  </Center>
);


export default function EnquiriePage() {

    return (

      <Box padding="20px" textAlign="center">

      <Navbar />

      <Suspense fallback={<TableLoader />}>
        <EnquiriesTable />
      </Suspense>
      
      
      </Box>

    )  ;

}