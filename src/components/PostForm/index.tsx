import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading, VStack } from '@chakra-ui/react';

interface PostFormProps {
  token: string;
}

export const PostForm = ({ token }: PostFormProps): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el post');
      }

      alert('Post creado');
    } catch (error: any) {
      console.error('Error al crear el post:', error.message);
    }
  };

  return (
    <Box maxW="md" mx="auto" p={6} boxShadow="lg" borderRadius="md" borderWidth="1px">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Crear Post
      </Heading>
      <form onSubmit={handleCreatePost}>
        <VStack spacing={4}>
          <FormControl id="title" isRequired>
            <FormLabel>Título</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Escribe el título"
            />
          </FormControl>
          <FormControl id="content" isRequired>
            <FormLabel>Contenido</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe el contenido del post"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            Crear Post
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
