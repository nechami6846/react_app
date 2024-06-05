import {useDispatch, useSelector} from 'react-redux'
import Button from 'react-bootstrap/Button';
import {TextField} from "@mui/material";
import { SearchField, SetSortType } from '../../redux/reducers/data.reducer'
import {fetchGetData} from "../../redux/actions/data.action";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import './style.css'

const Header = () => {

  const dispatch = useDispatch();
  const searchValue = useSelector(state => state.data.searchValue)

  const handleSearch = (event) => {
    dispatch(SearchField(event.target.value));
  }

  const handleRefresh = () => {
    dispatch(fetchGetData());
    dispatch(SearchField(''));
  }

  const handleClear = () => {
    dispatch(SearchField(''));
  }

  const handleSort = () => {
    dispatch(SetSortType());
  }

  return (
    <div className='header'>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">search</InputGroup.Text>
        <Form.Control
          placeholder="search by name or year"
          aria-label="basic-addon1"
          aria-describedby="basic-addon1"
          onChange={handleSearch} value={searchValue}
        />
      </InputGroup>
        {/*<TextField id="outlined-search" label="Search field" type="search" onChange={handleSearch} value={searchValue}/>*/}
        <Button onClick={handleRefresh}>Refresh</Button>
        <Button onClick={handleClear}>Clear</Button>
        <Button onClick={handleSort}>Sort</Button>
    </div>
  )

}

export default Header