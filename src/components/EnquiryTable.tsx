'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
  Select,
  useToast,
  Spinner,
} from '@chakra-ui/react';

type Enquiry = {
  _id: string;
  guardianName: string;
  relation: string;
  guardianEmail: string;
  guardianPhoneNumber: string;
  guardianMobileNumberOpt: string;
  studentName: string;
  gender: string;
  currentClass: string;
  dateOfBirth: string;
  currentSchool: string;
  lastYearGrade: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  enquirySource: string;
  description: string;
  wantHostel: boolean;
  wantTransport: boolean;
  createdAt?: string;
};

const EnquiriesTable: React.FC<{ initialFilters?: Record<string, any> }> = ({
  initialFilters = {},
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const toast = useToast();

  // Initialize filters from URL or defaults
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(searchParams.toString());
    return {
      limit: parseInt(params.get('limit') || '10', 10),
      page: parseInt(params.get('page') || '1', 10),
      state: params.get('state') || '',
      enquirySource: params.get('enquirySource') || '',
      searchedName: params.get('searchedName') || '',
      sort: params.get('sort') || '',
      nameSort: params.get('nameSort') || '',
      ...initialFilters,
    };
  });

  const [pagination, setPagination] = useState({
    currentPage: filters.page || 1,
    totalPages: 1,
  });

  const fetchEnquiries = async (filters: Record<string, any>) => {
    const response = await axios.get('http://localhost:4000/admin', {
      params: filters,
    });
    setPagination({
      currentPage: response.data.pagination.currentPage || 1,
      totalPages: response.data.pagination.totalPages || 1,
    });
    return response.data;
  };

  const { data, error, isLoading } = useQuery(
    ['enquiries', filters],
    () => fetchEnquiries(filters),
    { keepPreviousData: true }
  );

  const enquiries = data?.enquiryFormsData || [];

  const handleFilterUpdate = (updatedFilters: Record<string, any>) => {
    const newFilters = { ...filters, ...updatedFilters, page: 1 };
    setFilters(newFilters);
    router.replace(`?${new URLSearchParams(newFilters as any).toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    router.replace(`?${new URLSearchParams(newFilters as any).toString()}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await axios.delete(`http://localhost:4000/admin/${id}`);
        toast({
          title: 'Enquiry deleted successfully.',
          status: 'success',
          duration: 3000,
        });

        queryClient.setQueryData(['enquiries', filters], (oldData: any) => {
          if (!oldData) return;
          return {
            ...oldData,
            enquiryFormsData: oldData.enquiryFormsData.filter(
              (enquiry: Enquiry) => enquiry._id !== id
            ),
          };
        });
      } catch (error) {
        toast({
          title: 'Error deleting enquiry.',
          description: 'Please try again later.',
          status: 'error',
          duration: 3000,
        });
      }
    }
  };

  return (
    <Box>
      <Heading as="h1" size="lg" mb={6}>
        Enquiries Table
      </Heading>

      {isLoading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{(error as Error).message}</Text>
      ) : (
        <>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Student Name</Th>
                <Th>Gender</Th>
                <Th>Class</Th>
                <Th>Date of Birth</Th>
                <Th>Guardian Name</Th>
                <Th>Relation</Th>
                <Th>Guardian Phone</Th>
                <Th>Guardian Email</Th>
                <Th>Enquiry Source</Th>
                <Th>Hostel Required</Th>
                <Th>Transport Required</Th>
                <Th>Address</Th>
                <Th>Description</Th>
                <Th>Created At</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {enquiries.length ? (
                enquiries.map((enquiry: Enquiry, index: number) => (
                  <Tr
                    key={enquiry._id}
                    onClick={() =>
                      router.push(`/adminpanel/enquirytable/${enquiry._id}`)
                    }
                    cursor="pointer"
                  >
                    <Td>
                      {(filters.page - 1) * filters.limit + index + 1}
                    </Td>
                    <Td>{enquiry.studentName}</Td>
                    <Td>{enquiry.gender}</Td>
                    <Td>{enquiry.currentClass}</Td>
                    <Td>{enquiry.dateOfBirth}</Td>
                    <Td>{enquiry.guardianName}</Td>
                    <Td>{enquiry.relation}</Td>
                    <Td>{enquiry.guardianPhoneNumber}</Td>
                    <Td>{enquiry.guardianEmail}</Td>
                    <Td>{enquiry.enquirySource}</Td>
                    <Td>{enquiry.wantHostel ? 'Yes' : 'No'}</Td>
                    <Td>{enquiry.wantTransport ? 'Yes' : 'No'}</Td>
                    <Td>
                      {enquiry.address
                        ? `${enquiry.address.street}, ${enquiry.address.city}, ${enquiry.address.state}, ${enquiry.address.pincode}, ${enquiry.address.country}`
                        : 'Not Available'}
                    </Td>
                    <Td>{enquiry.description}</Td>
                    <Td>
                      {enquiry.createdAt
                        ? new Date(enquiry.createdAt).toLocaleString()
                        : 'Not Available'}
                    </Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(enquiry._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={16}>
                    <Text>No Student Enquiries Found</Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>

          <Box mt={4} display="flex" alignItems="center" justifyContent="center">
            <Button
              onClick={() => handlePageChange(Math.max(filters.page - 1, 1))}
              disabled={filters.page === 1}
            >
              Previous
            </Button>
            <Select
              value={filters.page}
              onChange={(e) => handlePageChange(parseInt(e.target.value, 10))}
              mx={4}
              w="auto"
            >
              {Array.from({ length: pagination.totalPages }, (_, index) => (
                <option key={index} value={index + 1}>
                  Page {index + 1}
                </option>
              ))}
            </Select>
            <Button
              onClick={() =>
                handlePageChange(Math.min(filters.page + 1, pagination.totalPages))
              }
              disabled={filters.page === pagination.totalPages}
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default EnquiriesTable;
