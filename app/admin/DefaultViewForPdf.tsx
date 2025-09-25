import { FC } from "react";

interface DefaultViewForPdfProps {}

const DefaultViewForPdf: FC<DefaultViewForPdfProps> = ({}) => {
  return (
    <div className="mx-auto flex items-center justify-center text-2xl h-96">
      No Tool Selected Yet
    </div>
  );
};

export default DefaultViewForPdf;
