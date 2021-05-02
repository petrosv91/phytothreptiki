import { css } from '@emotion/react';

const GlobalStyles = css`
  body {
    overflow: hidden;
  }
  .js-focus-visible:focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
  @media print {
    html,
    body {
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
      table.print > thead > tr > th {
        padding: 5px;
        font-size: 16px;
        line-height: 16px;
      }
      table.print > tbody > tr > td {
        padding: 5px;
        font-size: 16px;
        line-height: 20px;
      }
      table.print > tbody > tr {
        page-break-inside: avoid;
      }
      table.print > thead {
        display: table-row-group;
      }
    }
    // keep colors to light theme
    td,
    input,
    label {
      color: #333333 !important;
    }
    #formula {
      /* A6AFBD */
      color: #718096 !important;
    }
    #label {
      color: #008d42 !important;
    }
    /* ---------------- */
    #page,
    #page * {
      page-break-inside: avoid;
      visibility: visible;
    }
    @page {
      size: auto;
      margin: 5mm 10mm;
    }
  }
`;

export default GlobalStyles;
