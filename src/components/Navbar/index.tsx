import { Button, Heading, HStack } from "@chakra-ui/react";

interface NavbarProps {
  onShowUsers: () => void;
  showUsers: boolean;
}

export const Navbar = ({ onShowUsers, showUsers }: NavbarProps): JSX.Element => {
  return (
    <HStack bg="blue.500" p={4} justify="space-between">
      <Heading as="h1" color="white" size="md">
        Fktest
      </Heading>
      <Button colorScheme="teal" onClick={onShowUsers}>
        {showUsers ? 'Ver Posts' : 'Ver Usuarios'}
      </Button>
    </HStack>
  );
};
