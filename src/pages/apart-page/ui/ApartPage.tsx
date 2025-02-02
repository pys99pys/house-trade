import { FC } from "react";
import { useParams } from "react-router-dom";

import { ApartDetail } from "@/features/apart-detail";

interface ApartPageProps {}

const ApartPage: FC<ApartPageProps> = () => {
  const { regionCode, apartName } = useParams<{ regionCode: string; apartName: string }>();

  if (!regionCode || !apartName) {
    return null;
  }

  return <ApartDetail queryKey={{ regionCode, apartName }} />;
};

export default ApartPage;
