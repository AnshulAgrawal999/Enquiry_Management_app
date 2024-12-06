'use client';

import { useForm } from 'react-hook-form';
import { Box, Button, FormControl, FormLabel, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';

const loginUser = async ({ username, password }: { username: string; password: string }) => {
  const response = await fetch('http://localhost:4000/admin/login', {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();
  const router = useRouter();

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('adminName', data.username);
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/adminpanel');
    },
    onError: (error: any) => {
      toast({
        title: 'Login failed',
        description: error.message || 'An unexpected error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
  
    <Box
      minH="100vh"
      bg="gray.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        bg="white"
        p={8}
        rounded="md"
        shadow="md"
        width="full"
        maxWidth="400px"
      >
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>
          Admin Login
        </Text>

        <VStack spacing={4}>
          {mutation.isError && (
            <Text color="red.500" textAlign="center">
              {(mutation.error as any)?.message || 'An unexpected error occurred'}
            </Text>
          )}

          <FormControl isInvalid={!!errors.username}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && (
              <Text fontSize="sm" color="red.500">
                {String(errors.username.message)}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <Text fontSize="sm" color="red.500">
                {String(errors.password.message)}
              </Text>
            )}
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={mutation.isLoading}
          >
            {mutation.isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </VStack>
      </Box>
    </Box>


  );
};

export default Login;
