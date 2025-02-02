import cheerio, { CheerioAPI, Element } from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";

import { formatToAmount } from "../../server/utils";

interface Response {
  address: string;
  housholdsCount: string;
  parking: string;
  floorAreaRatio: number;
  buildingCoverageRatio: number;
  tradeItems: {
    tradeDate: string;
    size: number;
    floor: number;
    tradeAmount: number;
  }[];
}

const calculateApartInfo = ($: CheerioAPI) => {
  const getTradeInfoTable = () => {
    let tradeInfoTable: Element | null = null;

    $("table").each((_, table) => {
      if (!tradeInfoTable && $(table).text().includes("주소복사")) {
        tradeInfoTable = table;
      }
    });

    return tradeInfoTable as unknown as Element;
  };

  const getApartInfo = (tradeInfoTable: Element): Omit<Response, "tradeItems"> => {
    const texts = $(tradeInfoTable)
      .find("td")
      .text()
      .replace(/^\s+|\s+$/gm, "")
      .replaceAll("<br />", "")
      .split("\n");

    const address = texts[1];
    const housholdsCount = texts[2].replace("세대수(동수) : ", "");
    const parking = texts[3].replace("주차 : ", "");

    const rateTexts = texts[4].split("%");
    const floorAreaRatio = Number(rateTexts[0].replace("용적률 : ", ""));
    const buildingCoverageRatio = Number(rateTexts[1].replace("건폐율:", ""));

    return { address, housholdsCount, parking, floorAreaRatio, buildingCoverageRatio };
  };

  return getApartInfo(getTradeInfoTable());
};

const calculateTradeItems = ($: CheerioAPI): Response["tradeItems"] => {
  const getTrs = () => {
    const trs: Element[] = [];

    $("table").each((_, table) => {
      if ($(table).text().includes("계약일")) {
        $(table)
          .find("tr:not(:first-child)")
          .each((_, tr) => {
            trs.push(tr);
          });
      }
    });

    return trs;
  };

  const getTradeItems = (trs: Element[]) => {
    const tradeItems: Response["tradeItems"] = [];

    $(trs).each((_, tr) => {
      const tds = $(tr).find("td");

      const firstTdText = $(tds[0])
        .text()
        .replace(/^\s+|\s+$/gm, "")
        .split("\n");
      const secondTdText = $(tds[1])
        .text()
        .replace(/^\s+|\s+$/gm, "")
        .split("\n");
      const thirdTdText = $(tds[2])
        .text()
        .replace(/^\s+|\s+$/gm, "")
        .split("\n");

      const tradeDate = firstTdText[0].replaceAll(".", "-");
      const size = Number(secondTdText[0].split(" ")[0]);
      const floor = Number(secondTdText[1].split("층")[0]);
      const text = thirdTdText[0];
      const tradeAmount = formatToAmount(thirdTdText[0].replace("(고)", ""));

      tradeItems.push({ tradeDate, size, floor, tradeAmount });
    });

    return tradeItems;
  };

  return getTradeItems(getTrs());
};

const fetchTradeDetail = async ({ area, danji_nm }: { area: string; danji_nm: string }): Promise<string> => {
  const response = await fetch(`https://apt2.me/apt/AptReal.jsp?area=${area}&danji_nm=${danji_nm}`);

  return await response.text();
};

const createResponse = async ({ area, danji_nm }: { area: string; danji_nm: string }): Promise<Response> => {
  const html = await fetchTradeDetail({ area, danji_nm });
  const $ = cheerio.load(html);

  const apartInfo = calculateApartInfo($);
  const tradeItems = calculateTradeItems($);

  return { ...apartInfo, tradeItems };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response | { message: string }>) => {
  if (typeof req.query.regionCode !== "string" || typeof req.query.apartName !== "string") {
    return res.status(500).json({ message: "필수 파라미터가 누락되었습니다." });
  }

  res.status(200).json(await createResponse({ area: req.query.regionCode, danji_nm: req.query.apartName }));
};

export default handler;
