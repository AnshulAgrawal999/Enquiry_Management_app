'use client'

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Box, Center, Heading, Text, Spinner } from '@chakra-ui/react';

export default function AdminPanel() {
  const [studentCount, setStudentCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the number of students from the backend
    const fetchStudentCount = async () => {
      try {
        const response = await fetch('http://localhost:4000/admin/studentcount'); // Adjust the endpoint based on your setup
        if (!response.ok) {
          throw new Error('Failed to fetch student count');
        }
        const data = await response.json();
        setStudentCount(data.studentCount);
      } catch (err) {
        // Use TypeScript-safe handling for `err`
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchStudentCount();
  }, []);

  return (
    <>
      <Navbar />
      <Box textAlign="center" bg={'yellow'} border={"1px solid "} borderColor={'red'}>
          <Heading as="h1" size="xl" mb={6}>
            Admin Dashboard
          </Heading>
          {error ? (
            <Text color="red.500" fontSize="lg">
              Error: {error}
            </Text>
          ) : studentCount !== null ? (
            <Box
              p={8}
              bg="white"
              borderRadius="md"
              borderWidth="1px"
              borderColor="gray.200"
              shadow="sm"
            >
              <Text fontSize="lg" fontWeight="medium" mb={4}>
                Number of Student Enquiries:
              </Text>
              <Heading as="h2" size="2xl" color="blue.500">
                {studentCount}
              </Heading>
            </Box>
          ) : (
            <Spinner color="blue.500" size="lg" />
          )}
        </Box>

    </>
  );
}
