import { FC } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";

import { Box } from "@/shared/ui";

import css from "./IconBox.module.css";

interface IconBoxProps {
  type: "loading" | "empty";
}

const IconBox: FC<IconBoxProps> = ({ type }) => {
  return (
    <Box className={css.iconBox}>
      {type === "loading" && (
        <>
          <i className={css.rotate}>
            <VscLoading />
          </i>
          <strong className="font-bold">로딩중</strong>
        </>
      )}

      {type === "empty" && (
        <>
          <i>
            <RiErrorWarningLine />
          </i>
          <strong>데이터 없음</strong>
        </>
      )}
    </Box>
  );
};

export default IconBox;
