import { useState } from 'react';
import { Box, Button, HStack, Input } from '@chakra-ui/react';

interface PaginatorProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Paginator = ({ totalPages, onPageChange }: PaginatorProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(totalPages, page)); // Asegurarse de que la página esté entre 1 y totalPages
    setCurrentPage(validPage);
    onPageChange(validPage);
  };

  return (
    <HStack spacing={4} mt={4} justify="center">
      <Button
        onClick={() => goToPage(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        Anterior
      </Button>

      <Box>
        Página {currentPage} de {totalPages}
      </Box>

      <Button
        onClick={() => goToPage(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      >
        Siguiente
      </Button>

      <Input
        width="50px"
        textAlign="center"
        type="number"
        min={1}
        max={totalPages}
        value={currentPage}
        onChange={(e) => goToPage(Number(e.target.value))}
      />
    </HStack>
  );
};
