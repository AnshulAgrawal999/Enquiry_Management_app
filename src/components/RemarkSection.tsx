import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Textarea, Text, Stack, List, ListItem, Heading, Flex, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { local_base_url } from '@/api';

interface Comment {
  _id: string;
  username: string;
  comment: string;
  student: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminCommentSectionProps {
  studentId: string;
}

const RemarkSection: React.FC<AdminCommentSectionProps> = ({ studentId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');

  // Fetch existing remarks when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get( `${local_base_url}/admin/remarklist/${studentId}` )  ;
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching remarks:', error);
      }
    };

    fetchComments();
  }, [studentId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUsername(localStorage.getItem('adminName') || '');
    }
  }, []);

  // Handle new comment submission
  const handleAddComment = async () => {
    if (!newComment) {
      alert('Please enter a comment!');
      return;
    }

    try {
      const response = await axios.post( `${local_base_url}/admin/addremark/${studentId}` , {
        username,
        comment: newComment,
      });

      // Append the new comment to the list
      setComments([response.data, ...comments])  ;

      setNewComment(''); // Clear the input after submission

    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };


  // Handle delete comment
  const handleDeleteComment = async (remarkId: string) => {

    const confirmed = window.confirm("Are you sure you want to delete this comment?")  ;
    if (!confirmed) return  ;

    try {

      await axios.delete( `${local_base_url}/admin/deleteremark/${studentId}/${remarkId}` ) ;
      
      setComments(comments.filter((comment) => comment._id !== remarkId))  ;


    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <Box width="80%" margin="0 auto" padding="20px" bg="gray.50" borderRadius="8px" boxShadow="lg">
      <Heading size="lg" mb={6}>Admin Remarks</Heading>

      {/* New Comment Form */}
      <Box mb={6}>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Enter a new remark"
          rows={4}
          resize="vertical"
          mb={4}
        />
        <Button colorScheme="green" onClick={handleAddComment}>Add Remark</Button>
      </Box>

      {/* Display existing comments */}
      <Box mt={6}>
        <Heading size="md" mb={4}>Previous Remarks:</Heading>
        {comments.length > 0 ? (
          <List spacing={4}>
            {comments.map((comment) => (
              <ListItem key={comment._id} bg="white" p={4} borderRadius="6px" boxShadow="md">
                <Flex justifyContent="space-between" alignItems="center">
                  <Box>
                    <Text fontWeight="bold" color="blue.500">{comment.username}</Text>
                    <Text fontSize="sm" color="gray.600">{new Date(comment.createdAt).toLocaleString()}</Text>
                    <Text mt={2}>{comment.comment}</Text>
                  </Box>
                  <IconButton
                    aria-label="Delete remark"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDeleteComment(comment._id)}
                  />
                </Flex>
              </ListItem>
            ))}
          </List>
        ) : (
          <Text color="gray.500" fontStyle="italic">No remarks yet.</Text>
        )}
      </Box>
    </Box>
  );
};

export default RemarkSection;
