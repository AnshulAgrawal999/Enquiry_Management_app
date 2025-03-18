
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import NavigationButtons from "@/components/NavigationButtons";

export default function Home() {
  return (
    <Box p={6} minHeight="100vh">
      <Box maxW="800px" mx="auto">
        <Heading as="h1" size="xl" mb={6} textAlign="center">
          Student Enquiry Management System
        </Heading>
        
        <Text fontSize="lg" mb={8} textAlign="center">
          Welcome to our student enquiry management portal. This system helps manage prospective student 
          enquiries from initial submission through the entire communication process. Please select whether 
          you want to submit a new enquiry or access the administrative dashboard.
        </Text>
        
        <Flex 
          direction={{ base: "column", md: "row" }} 
          gap={6} 
          justify="center"
        >
          <NavigationButtons />
        </Flex>
      </Box>
    </Box>
  );
}