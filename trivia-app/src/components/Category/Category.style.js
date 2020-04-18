/** @format */

import styled from 'styled-components';

export const HeaderForm = styled.form`
  display: flex;
  flex-direction: flex-end;
  align-items: center;
  flex-wrap: wrap;
  background-color: white;
  padding: 0 1.5rem;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
`;
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  label {
    color: #777;
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }
`;
export const Button = styled.button`
  background-color: hsl(200, 100%, 50%);
  color: white;
  padding: 0.5em 1em;
  border-radius: 0.3em;
  border: none;
  cursor: pointer;
  :hover {
    background-color: hsl(200, 100%, 40%);
  }
`;
