import React from 'react';

import { Table } from '../../lib/ui';

export default function ElementTable({ elements = [], rate = '', ...rest }) {
  return (
    <Table.Table {...rest}>
      <Table.Head>
        <Table.Row>
          <Table.Header>Ά Ύλες</Table.Header>
          <Table.Header>Συμμετοχή</Table.Header>
          <Table.Header>Αμμωνιακό</Table.Header>
          <Table.Header>Νιτρικό</Table.Header>
          <Table.Header>Ουρικό</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {elements.map((el) => (
          <Table.Row key={el.id}>
            <Table.Cell>{el.label}</Table.Cell>
            <Table.Cell>{rate}</Table.Cell>
            {el.formula?.map((ingr, index) => (
              <Table.Cell key={index}>{ingr}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Table>
  );
}
