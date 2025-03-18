'use client';

import { useParams } from 'next/navigation';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import GoBackButton from './GoBackButton';

import { remote_base_url } from '../api/index';



type Address = {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

type Enquiry = {
  studentName: string;
  gender: string;
  currentClass: string;
  dateOfBirth: string;
  currentSchool: string;
  lastYearGrade: string;
  guardianName: string;
  relation: string;
  guardianPhoneNumber: string;
  guardianMobileNumberOpt: string;
  guardianEmail: string;
  address: Address;
  enquirySource: string;
  wantHostel: boolean;
  wantTransport: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
};

const fetchEnquiry = async (id: string) => {
  const response = await axios.get( `${remote_base_url}/admin/${id}`);
  return response.data.existingEnquiryForm;
};

const updateEnquiry = async (id: string, data: Enquiry) => {
  const response = await axios.patch(
    `${remote_base_url}/admin/${id}`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export default function EnquiryDetails() {
  const params = useParams();
  const { id } = params;

  const {
    data: enquiry,
    isLoading,
    isError,
    error,
  } = useQuery<Enquiry, Error>(['enquiry', id], () => fetchEnquiry(id as string), {
    enabled: !!id,
  });

  const { control, handleSubmit, reset } = useForm<Enquiry>(

      {
        defaultValues : {

            guardianName : ""  ,
  
            relation : "father"  ,
          
            guardianEmail : ""  ,
          
            guardianPhoneNumber : ""  ,
          
            guardianMobileNumberOpt : ""  ,
          
            studentName : ""  ,
          
            gender: "male"  ,
          
            currentClass : "Pre-School"  ,
          
            dateOfBirth : ""  ,
          
            currentSchool : ""  ,
          
            lastYearGrade : "not applicable"  ,
          
            address : {
          
              street : ""  ,
          
              city : ""  ,
          
              state : ""  ,
          
              pincode : ""  ,
          
              country : "India"  ,
          
            }  ,
          
            enquirySource: "referral"  ,
          
            description : ""  ,
          
            wantHostel : true  ,
          
            wantTransport : true
          
        }
      }
  );

  const { mutate: saveChanges, isLoading: isSaving } = useMutation(
    (newData: Enquiry) => updateEnquiry(id as string, newData),
    {
      onSuccess: () => alert('Enquiry updated successfully!'),
      onError: () => alert('Failed to update enquiry.'),
    }
  );

  useEffect(() => {
    if (enquiry) {
      reset(enquiry); // Initialize the form with fetched data
    }
  }, [enquiry, reset]);

  const onSubmit = (data: Enquiry) => {
    saveChanges(data);
  };

  if (isLoading) {
    return <p>Loading enquiry details...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  if (!enquiry) {
    return <p>Enquiry not found</p>;
  }

  return (
    <Box maxW="800px" mx="auto" p="6" boxShadow="lg" borderRadius="md">
      <Heading mb="4">Enquiry Details</Heading>

      <GoBackButton />

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="4" align="stretch">
          {/* Student Information */}
          <Box>
            <Heading size="md" mb="2">Student Information</Heading>
            <Stack spacing="3">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Controller
                  name="studentName"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Current Class</FormLabel>
                <Controller
                  name="currentClass"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Date of Birth</FormLabel>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field }) => <Input type="date" {...field} />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Current School</FormLabel>
                <Controller
                  name="currentSchool"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Last Year Grade</FormLabel>
                <Controller
                  name="lastYearGrade"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
            </Stack>
          </Box>

          {/* Guardian Information */}
          <Box>
            <Heading size="md" mb="2">Guardian Information</Heading>
            <Stack spacing="3">
              <FormControl>
                <FormLabel>Guardian Name</FormLabel>
                <Controller
                  name="guardianName"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Relation</FormLabel>
                <Controller
                  name="relation"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Controller
                  name="guardianEmail"
                  control={control}
                  render={({ field }) => <Input type="email" {...field} />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Controller
                  name="guardianPhoneNumber"
                  control={control}
                  render={({ field }) => <Input type="tel" {...field} />}
                />
              </FormControl>
            </Stack>
          </Box>

          {/* Additional Information */}
          <Box>
            <Heading size="md" mb="2">Additional Information</Heading>
            <Stack spacing="3">
              <FormControl>
                <FormLabel>Enquiry Source</FormLabel>
                <Controller
                  name="enquirySource"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>

              <FormControl>
                <Controller
                    name="wantHostel"
                    control={control}
                    render={({ field }) => (
                    <Checkbox isChecked={field.value} onChange={field.onChange}>
                        Want Hostel
                    </Checkbox>
                    )}
                />
              </FormControl>

              <FormControl>
                <Controller
                    name="wantTransport"
                    control={control}
                    render={({ field }) => (
                    <Checkbox isChecked={field.value} onChange={field.onChange}>
                        Want Transport
                    </Checkbox>
                    )}
                />
              </FormControl>


              <FormControl>
                <FormLabel>Description</FormLabel>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => <Textarea {...field} />}
                />
              </FormControl>
            </Stack>
          </Box>

          {/* Address */}
          <Box>
            <Heading size="md" mb="2">Address</Heading>
            <Stack spacing="3">
              <FormControl>
                <FormLabel>Street</FormLabel>
                <Controller
                  name="address.street"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>City</FormLabel>
                <Controller
                  name="address.city"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>State</FormLabel>
                <Controller
                  name="address.state"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Pincode</FormLabel>
                <Controller
                  name="address.pincode"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Country</FormLabel>
                <Controller
                  name="address.country"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
            </Stack>
          </Box>

          {/* Save Button */}
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isSaving}
            width="full"
          >
            Save Changes
          </Button>
        </VStack>
      </form>

    </Box>
  );
}
