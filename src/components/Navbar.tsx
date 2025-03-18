'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Box, Button, Flex, Link as ChakraLink, Text, Spinner } from '@chakra-ui/react';
import NextLink from 'next/link';

import { remote_base_url } from '@/api';

const validateToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch( `${remote_base_url}/admin/validate-token` , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error('Invalid or expired token');
  }

  const data = await response.json();
  return data;
};

const Navbar: React.FC = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery('validateToken', validateToken, {
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('token'),
    onError: () => {
      router.push('/adminpanel/login');
    },
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      router.push('/adminpanel/login');
    }
  }, [router]);

  const handleLogin = () => {
    router.push( `${remote_base_url}/adminpanel/login` )  ;
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found in localStorage');

      const response = await axios.post(
        `${remote_base_url}/admin/logout` ,
        {},
        {
          headers: { Authorization: token },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('adminName');
        setIsLoggedIn(false);
        router.push('/adminpanel/login');
      } else {
        console.error('Logout failed', response.data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error during logout:', error.message);
        alert('Failed to log out.');
      } else {
        console.error('Unexpected error during logout:', error);
      }
    }
  };

  return (
    <Box >
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        {/* Logo Section */}
        <ChakraLink as={NextLink} href="/adminpanel" fontWeight="bold" fontSize="lg" color="black">
          Admin Panel
        </ChakraLink>
  
        {/* Navigation Links */}
        <Flex gap={4}>
          <Button as={NextLink} href="/adminpanel/dashboard" colorScheme="teal" variant="outline">
            Dashboard
          </Button>
          <Button as={NextLink} href="/adminpanel/enquirytable" colorScheme="teal" variant="outline">
            Enquiry Table
          </Button>
        </Flex>
  
        {/* Authentication Section */}
        <Flex align="center" gap={4}>
          {isLoading ? (
            <Spinner size="sm" />
          ) : (
            <Text color="black">{isError ? 'Error' : data?.adminName}</Text>
          )}
          {isLoggedIn ? (

              <Button onClick={handleLogout} colorScheme="red">
                Logout
              </Button>
            
          ) : (
            <Button onClick={handleLogin} colorScheme="green">
              Login
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
  

};

export default Navbar;
