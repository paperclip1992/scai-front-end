import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, useToast } from '@chakra-ui/react';

interface LoginFormProps {
  setToken: (token: string) => void;
}

export const LoginForm = ({ setToken }: LoginFormProps): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const toast = useToast(); // Hook para lanzar toasts

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      const data = await response.json();
      setToken(data.token);
    } catch (error: any) {

      toast({
        title: 'Error al iniciar sesión',
        description: error.message || 'Hubo un problema durante el inicio de sesión',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} boxShadow="lg" borderRadius="md" borderWidth="1px">
      <Heading as="h2" mb={6} textAlign="center">
        Iniciar Sesión
      </Heading>
      <form onSubmit={handleLogin}>
        <FormControl id="email" mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" mb={6} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">
          Iniciar Sesión
        </Button>
      </form>
    </Box>
  );
};
