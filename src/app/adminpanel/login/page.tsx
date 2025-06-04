'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Alert,
  AlertIcon,
  Text
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';

import { remote_base_url } from '@/api';

const loginUser = async ({ username, password }: { username: string; password: string }) => {
  const response = await fetch( `${remote_base_url}/admin/login` , {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
};

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('adminName', username);
      router.push('/adminpanel');
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        setError(error.message || 'An unexpected error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Enter both username and password');
      return;
    }

    setError('');
    mutation.mutate({ username, password });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="gray.50"
      px={6}
    >
      <Heading mb={6} color="teal.500">
        Admin Login
      </Heading>
      <Box mb={6} textAlign="center" color="gray.600" fontSize="sm">
        <Text>Sample Admin</Text>
        <Text>Sample Username: anshul and Password: anshul@12</Text>
      </Box>
      <Box
        as="form"
        bg="white"
        p={6}
        borderRadius="md"
        boxShadow="md"
        width="100%"
        maxW="400px"
        onSubmit={handleSubmit}
      >
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <FormControl id="username" mb={4}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </FormControl>
        <FormControl id="password" mb={6}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          isLoading={mutation.isLoading}
        >
          {mutation.isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
