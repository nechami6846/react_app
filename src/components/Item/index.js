import * as React from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import {fetchUpdateData} from "../../redux/actions/data.action";
import {SetCurrentItem, UpdateItem} from "../../redux/reducers/data.reducer";
import { useNavigate } from "react-router-dom";
import './style.css';



const Item = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [itemName, setItemName] = useState(props.item?.Title);
  const [isEditing, setIsEditing] = useState(false);

  const displayDefault = (error) => {
    error.target.src = '/defaultImage.png';
  }

  const handleInputChange = (e) => {
    setItemName(e.target.value);
    dispatch(SetCurrentItem(props.item));
    console.log(props.item);
  };

  const handleBlur = () => {
    if (itemName !== props.item?.Title) {
      const id = props.item.imdbID;
      dispatch(fetchUpdateData({id, itemName}));
      dispatch(UpdateItem({id: id, name: itemName}))
    }
    setIsEditing(false);
  };

  const handleImgClick = () => {
    if(!props.extendedView) {
      console.log('handleClick');
      console.log(props.item);
      dispatch(SetCurrentItem(props.item));
      navigate("/item");
    }
  }

  return (
    <div className={'wrap-card'}>
      {props.extendedView ? <Link to="/">back</Link>: ''}
      <Card  >
        <img variant="top" src={props.item?.Poster} onError={displayDefault} onClick={handleImgClick}/>
        <Card.Body>
          <div onClick={() => setIsEditing(true)}>
            {isEditing ? (
              <input
                type="text"
                value={itemName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                autoFocus
              />
            ) : (
            <Card.Title>{itemName}</Card.Title>
            )}
          </div>
            <Card.Text>{props.item?.Year?.substring(0, 4)}</Card.Text>
        </Card.Body>
      </Card>
    </div>
);

}

export default Item