/** @format */

import React, { useRef } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { HeaderForm, FormGroup, Button } from './Category.style';

const Category = ({ handleSubmit }) => {
  const [categories, loading, error] = useCategories();
  const categoryEl = useRef();
  const amountEl = useRef();
  return (
    <HeaderForm
      onSubmit={e =>
        handleSubmit(e, amountEl.current.value, categoryEl.current.value)
      }
    >
      <FormGroup>
        <label htmlFor='category'>Category</label>
        <select id='category' ref={categoryEl}>
          {categories.map(category => {
            return (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </FormGroup>
      <FormGroup>
        <label htmlFor='amount'>Number of Questions</label>
        <input
          type='number'
          id='amount'
          min='1'
          step='1'
          defaultValue={10}
          ref={amountEl}
        />
      </FormGroup>
      <FormGroup>
        <Button>Generate</Button>
      </FormGroup>
    </HeaderForm>
  );
};

export default Category;
