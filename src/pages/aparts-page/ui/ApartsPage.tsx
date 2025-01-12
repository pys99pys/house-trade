import { FC } from "react";

import { ApartList } from "@/features/apart-list";

interface ApartsPageProps {}

const ApartsPage: FC<ApartsPageProps> = () => {
  return <ApartList />;
};

export default ApartsPage;
