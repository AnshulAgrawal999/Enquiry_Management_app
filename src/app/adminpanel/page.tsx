import { Box, Heading } from "@chakra-ui/react"  ;

import Navbar from "@/components/Navbar";

export default function AdminPanel() {
    

  return (

    <Box padding="20px" textAlign="center">

      <Navbar />
      
      <Heading >
        Admin Panel Page
      </Heading>
      
    </Box>

  )  ;

}
