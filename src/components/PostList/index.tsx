import { useEffect, useState } from 'react';
import { Paginator } from '../Paginator';
import { Box, Heading, List, ListItem, Text, VStack, Spinner, Center, useToast } from '@chakra-ui/react';

interface Post {
  id: number;
  title: string;
  content: string;
}

export const PostList = (): JSX.Element => {
  const [allPosts, setAllPosts] = useState<Post[]>([]); // Almacena todos los posts
  const [postsToShow, setPostsToShow] = useState<Post[]>([]); // Almacena solo los posts de la página actual
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const toast = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/posts/view');
        if (!response.ok) throw new Error((await response.json()).message || 'Error al obtener los posts');

        const data = await response.json();
        setAllPosts(data);
        setError(null);
      } catch (error: any) {
        setError(error.message);
        toast({
          title: 'Error al obtener los posts',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setPostsToShow(allPosts.slice(indexOfFirstPost, indexOfLastPost));
  }, [allPosts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  return (
    <Box maxW="md" mx="auto" p={6} boxShadow="lg" borderRadius="md" borderWidth="1px">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Posts
      </Heading>
      <VStack spacing={4} align="stretch">
        {loading ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : error ? (
          <Text color="red.500" textAlign="center">{error}</Text>
        ) : postsToShow.length === 0 ? (
          <Text textAlign="center">No hay posts disponibles.</Text>
        ) : (
          <List spacing={4}>
            {postsToShow.map(({ id, title, content }) => (
              <ListItem key={id} p={4} borderWidth="1px" borderRadius="md">
                <Heading as="h3" size="md" mb={2}>{title}</Heading>
                <Text>{content}</Text>
              </ListItem>
            ))}
          </List>
        )}

        <Paginator totalPages={totalPages} onPageChange={handlePageChange} />
      </VStack>
    </Box>
  );
};
