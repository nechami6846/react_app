import * as React from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Item from '../Item'
import { fetchGetData } from "../../redux/actions/data.action";
import './style.css';
import Button from "react-bootstrap/Button";
import {SearchField} from "../../redux/reducers/data.reducer";


const BasicTabs = (props) => {
  const dispatch = useDispatch();

  const searchValue = useSelector(state => state.data.searchValue);
  const sortType = useSelector(state => state.data.sortType);
  const fullData = useSelector(state => state.data.fullData);
  const [data, setData] = useState({});
  const [dataToDisplay, setDataToDisplay] = useState({});
  const [view, setView] = useState('list');

  useEffect(() => {
    dispatch(fetchGetData());
  } ,[]);

  useEffect(() => {
    const result = fullData && fullData.results && Object.groupBy(fullData.results, ({ type }) => type);
    setData(result);
    setDataToDisplay(result);
    sort();
  } ,[fullData]);

  useEffect(() => {
      const result = {};
      data && Object.keys(data).map((type) => {
        result[type] = data[type].filter(item =>
          item.Title.toLowerCase().includes(searchValue.toLowerCase()) || item.Year.toLowerCase().includes(searchValue.toLowerCase())
        )}
      );
      setDataToDisplay(result);
  } , [searchValue]);

  useEffect(() => {
    sort();
  } , [sortType]);

  const sort = () => {
      const result = {};
    dispatch(SearchField(''));
    data && Object.keys(data).map((type) => {
        result[type] = data[type].sort((a, b) => sortType ? a.Year.localeCompare(b.Year) : b.Year.localeCompare(a.Year))
      });
      setDataToDisplay(result);
  }

  const handleChangeView = () => {
    setView(prevState => prevState == 'list' ? 'grid' : 'list');
  }

  return (
    <div className={`basicTabs ${view}`}>
      <Button onClick={handleChangeView}>Change view</Button>
      <Tabs
        defaultActiveKey={data && Object.keys(data)[0]}
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {dataToDisplay && Object.keys(dataToDisplay).map((type) => {
          return (
            <Tab eventKey={type} title={`${type} (${dataToDisplay[type].length})`}>
              {Object.keys(dataToDisplay[type]).map((item) => {
                return (
                  <Item
                    key={item.imdbID}
                    item={dataToDisplay[type][item]}
                    extendedView={false}
                  ></Item>
                )
              })}
            </Tab>
          )})}
      </Tabs>
    </div>

  );
}

export default BasicTabs