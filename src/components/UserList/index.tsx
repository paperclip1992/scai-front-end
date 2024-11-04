import { useEffect, useState } from 'react';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserListProps {
  token: string;
}

export const UserList = ({ token }: UserListProps): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/view', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.log(response);
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al obtener los usuarios');
        }

        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error: any) {
        console.error('Error al obtener los usuarios:', error.message);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} boxShadow="lg" borderRadius="md" borderWidth="1px">
      <Heading as="h2" mb={6} textAlign="center">
        Usuarios Registrados
      </Heading>
      <List spacing={4}>
        {users.map(({id, name, email}) => (
          <ListItem key={id} p={4} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold">Nombre: {name}</Text>
            <Text>Email: {email}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
