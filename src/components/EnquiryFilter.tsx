"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

interface FilterProps {
  limit: number;
  page: number;
  state: string;
  enquirySource: string;
  searchedName: string;
  sort: string;
  nameSort: string;
}

const StudentFilter: React.FC<any> = ({ onFilter, currentFilters }) => {
  const initialFilters: FilterProps = {
    limit: 10,
    page: 1,
    state: "",
    enquirySource: "",
    searchedName: "",
    sort: "",
    nameSort: "",
  };

  const [filters, setFilters] = useState<FilterProps>(currentFilters);

  useEffect(() => {
    setFilters(currentFilters); // Update state whenever currentFilters change
  }, [currentFilters]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    onFilter(initialFilters); // Optional: Trigger callback with reset filters
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={4}>
        <FormControl>
          <FormLabel htmlFor="state">State</FormLabel>
          <Input
            type="text"
            id="state"
            name="state"
            value={filters.state}
            onChange={handleChange}
            aria-label="Filter by state"
          />
        </FormControl>
      </Box>

      <Box mb={4}>
        <FormControl>
          <FormLabel htmlFor="enquirySource">Enquiry Source</FormLabel>
          <Select
            id="enquirySource"
            name="enquirySource"
            value={filters.enquirySource}
            onChange={handleChange}
            aria-label="Filter by enquiry source"
          >
            <option value="">All</option>
            <option value="walk-in">Walk-in</option>
            <option value="online">Online</option>
            <option value="referral">Referral</option>
          </Select>
        </FormControl>
      </Box>

      <Box mb={4}>
        <FormControl>
          <FormLabel htmlFor="searchedName">Search Student Name</FormLabel>
          <Input
            type="text"
            id="searchedName"
            name="searchedName"
            value={filters.searchedName}
            onChange={handleChange}
            aria-label="Search by student or guardian name"
          />
        </FormControl>
      </Box>

      <Box mb={4}>
        <FormControl>
          <FormLabel htmlFor="sort">Sort By Created At</FormLabel>
          <Select
            id="sort"
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            aria-label="Sort by creation or update time"
          >
            <option value="">None</option>
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </Select>
        </FormControl>
      </Box>

      <Box mb={4}>
        <FormControl>
          <FormLabel htmlFor="nameSort">Name Sort</FormLabel>
          <Select
            id="nameSort"
            name="nameSort"
            value={filters.nameSort}
            onChange={handleChange}
            aria-label="Sort by student name"
          >
            <option value="">None</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </Select>
        </FormControl>
      </Box>

      <Box mb={4}>
        <FormControl>
          <FormLabel htmlFor="limit">Page Limit</FormLabel>
          <Select
            id="limit"
            name="limit"
            value={filters.limit}
            onChange={handleChange}
            aria-label="Select the number of students per page"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" gap={4}>
        
        
        <Button
          type="button"
          colorScheme="red"
          onClick={handleReset}
          aria-label="Remove all filters"
        >
          Remove All Filters
        </Button>


        <Button type="submit" colorScheme="blue" aria-label="Apply filters">
          Apply Filters
        </Button>


      </Box>
    </form>
  );
};

export default StudentFilter;
