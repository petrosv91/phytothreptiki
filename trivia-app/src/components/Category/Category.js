/** @format */

import React, { useRef } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { HeaderForm, FormGroup, Button } from './Category.style';

const Category = ({ fetchdata }) => {
  const [categories, loading, error] = useCategories();
  const categoryEl = useRef();
  const amountEl = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    fetchdata(amountEl.current.value, categoryEl.current.value);
  };

  return (
    <HeaderForm onSubmit={handleSubmit}>
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
        <input type='number' id='amount' min='1' max='99' defaultValue={10} ref={amountEl} />
      </FormGroup>
      <FormGroup>
        <Button>Generate</Button>
      </FormGroup>
    </HeaderForm>
  );
};

export default Category;
