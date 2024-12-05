"use client";

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Textarea,
  Stack,
  useToast,
} from "@chakra-ui/react";

type EnquiryFormData = {
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
};

export default function EnquiryForm() {
  const form = useForm<EnquiryFormData>({
    defaultValues: {
      guardianName: "",
      relation: "father",
      guardianEmail: "",
      guardianPhoneNumber: "",
      guardianMobileNumberOpt: "",
      studentName: "",
      gender: "male",
      currentClass: "Pre-School",
      dateOfBirth: "",
      currentSchool: "",
      lastYearGrade: "not applicable",
      address: {
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
      },
      enquirySource: "referral",
      description: "",
      wantHostel: true,
      wantTransport: true,
    },
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;
  const toast = useToast();

  const instance = axios.create({
    baseURL: "http://localhost:4000",
    headers: { "X-Custom-Header": "foobar" },
  });

  const handleResetForm = () => {
    reset();
  };

  const onSubmit = (data: EnquiryFormData) => {
    instance
      .post("/student", data)
      .then((response) => {
        console.log("Response:", response);
        toast({
          title: "Form Submitted",
          description: "Enquiry form submitted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reset();
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          console.log("Conflict Error:", err);
          toast({
            title: "Conflict Error",
            description: "An enquiry with this guardian phone number already exists!",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          console.log("Error:", err);
          toast({
            title: "Submission Failed",
            description: "Failed to submit enquiry form",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <Box p={6}>
      <h1>User Panel Enquiry Submission Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={4}>
          {/* Guardian Information Section */}
          <Box>
            <h2>Guardian Information</h2>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.guardianName}>
                <FormLabel htmlFor="guardianName">*Guardian Name</FormLabel>
                <Input
                  id="guardianName"
                  type="text"
                  {...register("guardianName", {
                    required: "Guardian Name is required",
                  })}
                />
                {errors.guardianName && <p>{errors.guardianName?.message}</p>}
              </FormControl>

              <FormControl isInvalid={!!errors.relation}>
                <FormLabel htmlFor="relation">*Relation with Student</FormLabel>
                <Select
                  id="relation"
                  {...register("relation", { required: "Relation is required" })}
                >
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="family">Family Relation</option>
                  <option value="other">Other</option>
                </Select>
                {errors.relation && <p>{errors.relation?.message}</p>}
              </FormControl>

              <FormControl isInvalid={!!errors.guardianEmail}>
                <FormLabel htmlFor="guardianEmail">*Guardian Email</FormLabel>
                <Input
                  id="guardianEmail"
                  type="email"
                  {...register("guardianEmail", {
                    required: "Guardian email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                {errors.guardianEmail && <p>{errors.guardianEmail?.message}</p>}
              </FormControl>

              <FormControl isInvalid={!!errors.guardianPhoneNumber}>
                <FormLabel htmlFor="guardianPhoneNumber">*Guardian Phone Number</FormLabel>
                <Input
                  id="guardianPhoneNumber"
                  type="number"
                  maxLength={10}
                  {...register("guardianPhoneNumber", {
                    required: "Guardian Phone is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                />
                {errors.guardianPhoneNumber && <p>{errors.guardianPhoneNumber?.message}</p>}
              </FormControl>

              <FormControl isInvalid={!!errors.guardianMobileNumberOpt}>
                <FormLabel htmlFor="guardianMobileNumberOpt">Guardian Mobile Number (Optional)</FormLabel>
                <Input
                  id="guardianMobileNumberOpt"
                  type="number"
                  maxLength={10}
                  {...register("guardianMobileNumberOpt", {
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid mobile number",
                    },
                  })}
                />
                {errors.guardianMobileNumberOpt && <p>{errors.guardianMobileNumberOpt?.message}</p>}
              </FormControl>
            </Stack>
          </Box>

          {/* Student Information Section */}
          <Box>
            <h2>Student Information</h2>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.studentName}>
                <FormLabel htmlFor="studentName">*Student Name</FormLabel>
                <Input
                  id="studentName"
                  type="text"
                  {...register("studentName", { required: "Student Name is required" })}
                />
                {errors.studentName && <p>{errors.studentName?.message}</p>}
              </FormControl>

              <FormControl isInvalid={!!errors.gender}>
                <FormLabel htmlFor="gender">*Gender</FormLabel>
                <Select id="gender" {...register("gender", { required: "Gender is required" })}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
                {errors.gender && <p>{errors.gender?.message}</p>}
              </FormControl>

              <FormControl isInvalid={!!errors.currentClass}>
                <FormLabel htmlFor="currentClass">*Current Class</FormLabel>
                <Select
                  id="currentClass"
                  {...register("currentClass", { required: "Current class is required" })}
                >
                  <option value="Pre-School">Pre-School</option>
                  {/* Add other classes as options */}
                </Select>
                {errors.currentClass && <p>{errors.currentClass?.message}</p>}
              </FormControl>

              <FormControl isInvalid={!!errors.dateOfBirth}>
                <FormLabel htmlFor="dateOfBirth">*Date Of Birth</FormLabel>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth", { required: "Date Of Birth is required" })}
                />
                {errors.dateOfBirth && <p>{errors.dateOfBirth?.message}</p>}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="currentSchool">Current School</FormLabel>
                <Input id="currentSchool" type="text" {...register("currentSchool")} />
                {errors.currentSchool && <p>{errors.currentSchool?.message}</p>}
              </FormControl>

              <FormControl isInvalid={!!errors.lastYearGrade}>
                <FormLabel htmlFor="lastYearGrade">*Last Year Grade</FormLabel>
                <Select
                  id="lastYearGrade"
                  {...register("lastYearGrade", { required: "Last Year Grade is required" })}
                >
                  <option value="not applicable">Not Applicable</option>
                  {/* Add other grade options */}
                </Select>
                {errors.lastYearGrade && <p>{errors.lastYearGrade?.message}</p>}
              </FormControl>
            </Stack>
          </Box>

          {/* Address Section */}
          <Box>
            <h2>Address</h2>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.address?.street}>
                <FormLabel htmlFor="street">*Street Address</FormLabel>
                <Input id="street" type="text" {...register("address.street", { required: "Street is required" })} />
                {errors.address?.street && <p>{errors.address?.street?.message}</p>}
              </FormControl>

              <FormControl isInvalid={!!errors.address?.city}>
                <FormLabel htmlFor="city">*City</FormLabel>
                <Input id="city" type="text" {...register("address.city", { required: "City is required" })} />
                {errors.address?.city && <p>{errors.address?.city?.message}</p>}
              </FormControl>

              <FormControl isInvalid={!!errors.address?.state}>
                <FormLabel htmlFor="state">*State</FormLabel>
                <Input id="state" type="text" {...register("address.state", { required: "State is required" })} />
                {errors.address?.state && <p>{errors.address?.state?.message}</p>}
              </FormControl>

              <FormControl isInvalid={!!errors.address?.pincode}>
                <FormLabel htmlFor="pincode">*Pincode</FormLabel>
                <Input
                  id="pincode"
                  type="text"
                  maxLength={6}
                  {...register("address.pincode", { required: "Pincode is required" })}
                />
                {errors.address?.pincode && <p>{errors.address?.pincode?.message}</p>}
              </FormControl>

              <FormControl isInvalid={!!errors.address?.country}>
                <FormLabel htmlFor="country">*Country</FormLabel>
                <Input
                  id="country"
                  type="text"
                  defaultValue="India"
                  {...register("address.country", { required: "Country is required" })}
                />
                {errors.address?.country && <p>{errors.address?.country?.message}</p>}
              </FormControl>
            </Stack>
          </Box>

          {/* Enquiry Section */}
          <Box>
            <h2>Enquiry Information</h2>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.enquirySource}>
                <FormLabel htmlFor="enquirySource">*How did you hear about us?</FormLabel>
                <Select
                  id="enquirySource"
                  {...register("enquirySource", { required: "Enquiry Source is required" })}
                >
                  <option value="referral">Referral</option>
                  <option value="advertisement">Advertisement</option>
                  <option value="online">Online</option>
                </Select>
                {errors.enquirySource && <p>{errors.enquirySource?.message}</p>}
              </FormControl>

              <FormControl isInvalid={!!errors.description}>
                <FormLabel htmlFor="description">*Description</FormLabel>
                <Textarea
                  id="description"
                  {...register("description", { required: "Description is required" })}
                />
                {errors.description && <p>{errors.description?.message}</p>}
              </FormControl>

              <FormControl>
                <Checkbox
                  id="wantHostel"
                  defaultChecked={true}
                  {...register("wantHostel")}
                >
                  Do you need a hostel?
                </Checkbox>
              </FormControl>

              <FormControl>
                <Checkbox
                  id="wantTransport"
                  defaultChecked={true}
                  {...register("wantTransport")}
                >
                  Do you need transportation?
                </Checkbox>
              </FormControl>
            </Stack>
          </Box>

          {/* Buttons */}
          <Stack direction="row" spacing={4} align="center">
            <Button type="submit" colorScheme="blue">
              Submit
            </Button>
            <Button type="button" onClick={handleResetForm} colorScheme="gray">
              Reset
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}
