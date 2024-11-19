'use client'
import React from 'react';
import { Shop } from '@/constants/Shop';
import { useQueryState } from 'nuqs';

const FilterArray = ({ category }: { category: Shop['category'] }) => {
  const array = category; // Array of categories
  const [filters, setFilters] = useQueryState('filters', {
    defaultValue: [""], // Initialize as an empty array
  });

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      // Add the filter to the state if checked
      setFilters((prev) => [...prev, value]);
    } else {
      // Remove the filter from the state if unchecked
      setFilters((prev) => prev.filter((filter) => filter !== value));
    }
    if(filters.length === 0){
     
    }
  };

  return (
    <div className='flex bg-gray-800/60 top-24 sticky h-full p-4 flex-col gap-2 w-[200px]'>
      <h3 className='text-dark200_light800 h3-bold'>Filters</h3>
      {array.map((categoryItem, index) => (
        <div key={index} className='flex items-center justify-between gap-4'>
          {categoryItem}
          <input
            type='checkbox'
            value={categoryItem}
            onChange={handleFilter}
            checked={filters.includes(categoryItem)} // Ensure checkbox reflects state
            className='w-5 h-5 text-dark400_light700 rounded-md'
          />
        </div>
      ))}
    </div>
  );
};

export default FilterArray;
