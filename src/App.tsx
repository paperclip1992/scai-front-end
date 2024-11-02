import { useState } from 'react';
import { Box, Button, VStack, HStack, Heading } from '@chakra-ui/react';
import { RegisterForm, LoginForm, PostForm, PostList, UserList } from './components';

const App = (): JSX.Element => {
  const [token, setToken] = useState<string | null>(null);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [showUsers, setShowUsers] = useState<boolean>(false); 

  const appTitle = 'FK{test}';

  const toggleView = () => {
    setShowUsers((prevState) => !prevState);
  };

  return (
    <Box maxW="container.md" mx="auto" p={4}>
      <VStack spacing={8}>
        {!token ? (
          <>
            {!showRegister ? (
              <>
                <LoginForm setToken={setToken} />
                <Button colorScheme="blue" variant="link" onClick={() => setShowRegister(true)}>
                  ¿No tienes una cuenta? Regístrate aquí
                </Button>
              </>
            ) : (
              <>
                <RegisterForm setToken={setToken} />
                <Button colorScheme="blue" variant="link" onClick={() => setShowRegister(false)}>
                  ¿Ya tienes una cuenta? Inicia sesión aquí
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <HStack justify="space-between" w="100%">
              <Heading as="h1" size="lg">{appTitle}</Heading>
              {token && (
                <Button colorScheme="teal" onClick={toggleView}>
                  {showUsers ? 'Ver Posts' : 'Ver Usuarios'}
                </Button>
              )}
            </HStack>
            {!showUsers ? (
              <HStack alignItems="flex-start">
                <Box position="sticky" top="20px">
                  <PostForm token={token} />
                </Box>
                <PostList />
              </HStack>
            ) : (
              <UserList token={token} />
            )}
          </>
        )}
      </VStack>
    </Box>
  );
};

export default App;
