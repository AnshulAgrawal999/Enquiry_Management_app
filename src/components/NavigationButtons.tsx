"use client";

import { Box, Button, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

export default function NavigationButtons() {
  const router = useRouter();
  const cardBgColor = useColorModeValue("white", "gray.700");

  const navigateToUserPanel = () => {
    router.push("/userpanel");
  };

  const navigateToAdminPanel = () => {
    router.push("/adminpanel");
  };

  return (
    <>
      <MotionBox 
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        w={{ base: "full", md: "45%" }}
        bg={cardBgColor}
        p={5}
        borderRadius="lg"
        boxShadow="md"
      >
        <Heading as="h3" size="md" mb={3}>
          User Panel
        </Heading>
        <Text mb={4}>
          Submit a new student enquiry.
        </Text>
        <Button 
          colorScheme="blue" 
          onClick={navigateToUserPanel}
          rightIcon={<ChevronRightIcon />}
          w="full"
        >
          Submit Enquiry
        </Button>
      </MotionBox>
      
      <MotionBox 
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        w={{ base: "full", md: "45%" }}
        bg={cardBgColor}
        p={5}
        borderRadius="lg"
        boxShadow="md"
      >
        <Heading as="h3" size="md" mb={3}>
          Admin Panel
        </Heading>
        <Text mb={4}>
          Access the administrative dashboard to manage student enquiries.
        </Text>
        <Button 
          colorScheme="purple" 
          onClick={navigateToAdminPanel}
          rightIcon={<ChevronRightIcon />}
          w="full"
        >
          Admin Login
        </Button>
      </MotionBox>
    </>
  );
}