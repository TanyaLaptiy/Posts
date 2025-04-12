import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function formatCompanyText(companyData: CompanyProps) {
  return `${companyData?.name}\n${companyData?.catchPhrase}\n${companyData?.bs}`;
}

function formatAddressText(companyData: AddressProps) {
  return `${companyData?.city}\n${companyData?.street}\n${companyData?.suite}\n${companyData?.geo.lat} - ${companyData?.geo.lng}\n${companyData?.zipcode}`;
}

type CompanyProps = {
  bs: string;
  catchPhrase: string;
  name: string;
};

type AddressProps = {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
  geo: {lat: string; lng: string};

};

type UserBlockProps = {
  address: any;
  company: any;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
};

export type PostBlockProps = {
  userId: number;
  userData: UserBlockProps | undefined;
  id: number;
  title: string;
  body: string;
};

export const PieBlock: React.FC<PostBlockProps> = (props) => {
  const formatedCompanyText = formatCompanyText(props.userData?.company);
  const formatedAddressText = formatAddressText(props.userData?.address)
  const navigate = useNavigate();


  return (
    <div className="pie-block">
      <h4
        className="pie-block__title">
        {props.title}
      </h4>
      <em className="pie-block__second-title">{props.body}</em>
      <div className="pie-block__selector"
        onClick={() => {
          navigate(`/users/${props.userId}`);
        }}>
        <p>{props.userData?.username}</p>
        {props.userData?.email && <p>{props.userData?.name}</p>}
        <ul>
          {formatedCompanyText && (
            <li className="active tooltip">
              Company
              <span className="tooltiptext">{formatedCompanyText}</span>
            </li>
          )}
          {formatedAddressText && (
            <li className="active tooltip">
              Address
              <span className="tooltiptext">{formatedAddressText}</span>
            </li>

          )}
        </ul>
      </div>
    </div>
  );
};
