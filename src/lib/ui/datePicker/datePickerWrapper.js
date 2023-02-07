import styled from '@emotion/styled';

export const DatePickerWrapper = styled.div`
  position: relative;
  svg {
    cursor: pointer;
    position: absolute;
    top: 7px;
    right: 10px;
    z-index: 100;
  }
  .react-datepicker {
    font-size: 1.24em;
    @media screen and (max-width: ${({ breakpoints }) => breakpoints.md}) {
      font-size: 1.055em;
    }
    @media screen and (max-width: ${({ breakpoints }) => breakpoints.sm}) {
      font-size: 0.89em;
    }
  }
  .react-datepicker__triangle {
    display: none;
  }
  .react-datepicker__header {
    padding-top: 0.8em;
  }
  .react-datepicker__month {
    margin: 0.4em 1em;
  }
  .react-datepicker__day-name,
  .react-datepicker__day {
    width: 1.9em;
    line-height: 1.9em;
    margin: 0.166em;
  }
  .react-datepicker__day--keyboard-selected {
    background: ${({ theme }) => theme.colors.special[500]};
    color: ${({ theme }) => theme.colors.colorText};
  }
  .react-datepicker__current-month {
    font-size: 1em;
  }
  .react-datepicker__navigation {
    top: 1em;
  }
  .react-datepicker__navigation--previous {
    border-right-color: #ccc;
    left: 1em;
  }
  .react-datepicker__navigation--next {
    border-left-color: #ccc;
    right: 1em;
  }
`;
