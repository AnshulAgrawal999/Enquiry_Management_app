import { Box, Button, Input, Select, Text, Flex, FormLabel, Checkbox } from '@chakra-ui/react';

export const formContainerStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#ACE1AF',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

export const formTitleStyle = {
  fontSize: '1.5rem',
  marginBottom: '15px',
  color: '#0056b3',
  textAlign: 'left',
};

export const fieldsContainerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
  marginBottom: '20px',
};

export const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
};

export const labelStyle = {
  fontSize: '1rem',
  fontWeight: 'bold',
  marginBottom: '5px',
  color: '#333',
};

export const inputStyle = {
  padding: '10px',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  marginBottom: '10px',
};

export const inputFocusStyle = {
  borderColor: '#007BFF',
  outline: 'none',
};

export const errorMessageStyle = {
  fontSize: '0.875rem',
  color: 'red',
  marginTop: '5px',
};

export const checkboxItemStyle = {
  gap: '8px', // Space between the checkbox and the label
};

export const buttonsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const buttonStyle = {
  padding: '10px 20px',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '20px',
  transition: 'background-color 0.3s ease',
};

export const submitButtonStyle = {
  backgroundColor: '#0056b3',
  color: 'white',
};

export const submitButtonHoverStyle = {
  backgroundColor: 'blue',
};

export const cancelButtonStyle = {
  backgroundColor: 'crimson', // Red color
  color: 'white',
};

export const cancelButtonHoverStyle = {
  backgroundColor: 'red', // Darker red
};

export const mobileMediaQueryStyle = {
  '@media (max-width: 768px)': {
    '.enqFields': {
      gridTemplateColumns: '1fr',
    },
  },
};
