import { Box } from '@chakra-ui/react';

import Navbar from '@/components/Navbar'  ;

import EnquiriesTable from '@/components/EnquiryTable'  ;



export default function EnquiriePage() {

    return (

      <Box padding="20px" textAlign="center">

      <Navbar />

      <EnquiriesTable />
      
      </Box>

    )  ;

}