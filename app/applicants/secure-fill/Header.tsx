import { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <div>
      {" "}
      <h1 className="text-3xl font-semibold mb-2 text-gray-800">
        Secure Personal Information Form
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Please provide accurate information. All data is encrypted and kept
        confidential.
      </p>
    </div>
  );
};

export default Header;
