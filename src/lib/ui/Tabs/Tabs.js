import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

function DataTabs({ data }) {
  return (
    <Tabs colorScheme='special'>
      <TabList>
        {data.map((tab, index) => (
          <Tab key={index}>{tab.label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {data.map((tab, index) => (
          <TabPanel key={index} p={4} color='text' display='flex' justifyContent='center'>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default DataTabs;
