import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const GoBackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/'); // Navigate to a fallback route, e.g., the home page
    }
  };

  return (
    <Button
      onClick={handleGoBack}
      bg="rgb(0, 0, 200)"
      color="black"
      _hover={{ bg: 'blue.600' }}
      _active={{ bg: 'blue.700' }}
      padding="10px 20px"
      borderRadius="5px"
      boxShadow="md"
    >
      Go Back
    </Button>
  );
};

export default GoBackButton;
