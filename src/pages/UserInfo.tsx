import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchItemById } from '../redux/slices/postSlice';
import { NotFoundBlock } from '../components/NotFoundBlock';
import loadingGIF from '../assets/img/load.gif';
import { useAppDispatch } from '../redux/store';
import { RootState } from '../redux/store';

export const UserInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { currentItem, status } = useSelector((state: RootState) => state.post);

  React.useEffect(() => {
    dispatch(fetchItemById(Number(id)));
  }, []);

  return status === 'loaded' ? (
    !currentItem ? (
      <NotFoundBlock />
    ) : (
      <div className="full-page">
        <img
          src="https://cdn-icons-png.flaticon.com/256/1177/1177568.png"
          alt="user"
        /> 
        <h4 className="pie-block__title">{currentItem.username}</h4>
        <em className="pie-block__second-title">{currentItem.name}</em>
        <div className="full-page__selector">
          <ul>
            {currentItem.email && <li>Email: {currentItem.email}</li>}
            {currentItem.phone && <li>Phone: {currentItem.phone}</li>}
            {currentItem.website && <li>Website: {currentItem.website}</li>}
          </ul>
        </div>

       <ul>
       <li>
        {currentItem.company && <h5>Company</h5>}
        <p>{currentItem.company && currentItem.company.name}</p>
        <p>{currentItem.company && currentItem.company.catchPhrase}</p>
        <p>{currentItem.company && currentItem.company.bs}</p>
        </li>
        <li>
        {currentItem.address && <h5 >Address</h5>}
        <p>{currentItem.address && currentItem.address.city}</p>
        <p>{currentItem.address && currentItem.address.street}</p>
        <p>{currentItem.address && currentItem.address.suite}</p>
        <p>{currentItem.address && currentItem.address.zipcode}</p>
        </li>
        </ul>

        <Link to="/" className="button button--black full-page__button">
          <span>Вернуться назад</span>
        </Link>
      </div>
    )
  ) : (
    <div className="full-page">
      <h3>Loading</h3>
      <img className="pay" src={loadingGIF} alt="Thank you" />
    </div>
  );
};
