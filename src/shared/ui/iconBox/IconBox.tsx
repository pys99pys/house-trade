import classNames from "classnames";
import { FC } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";

import css from "./IconBox.module.css";

interface IconBoxProps {
  type: "loading" | "empty";
}

const IconBox: FC<IconBoxProps> = ({ type }) => {
  return (
    <div className={classNames(css.iconBox, "box flex direction-column justify-content-center align-items-center")}>
      {type === "loading" && (
        <>
          <i className={css.rotate}>
            <VscLoading />
          </i>
          <p className="font-bold">로딩중</p>
        </>
      )}

      {type === "empty" && (
        <>
          <i>
            <RiErrorWarningLine />
          </i>
          <p className="font-bold">데이터 없음</p>
        </>
      )}
    </div>
  );
};

export default IconBox;
