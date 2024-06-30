"use client";

import { Header } from "@/app/_components/component";
import styles from "./druginfo.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SearchDrugDetail } from "@/app/util/controller/drugController";
import parseXML from 'xml2js'; // 예시로 xml2js 사용

export default function DrugInfo({ params }: { params: { id: number } }) {
  const drugId = params.id;
  const [like, setLike] = useState(false);
  const [drug, setDrug] = useState({});
  const [eeDoc, setEeDoc] = useState("");
  const [nbDoc, setNbDoc] = useState("");
  const [udDoc, setUdDoc] = useState("");
  useEffect(() => {
    /* 약 검색하는 API 호출 해야함! */
    SearchDrugDetail(drugId)
      .then((response) => {
        setDrug(response.data);
        setEeDoc(getText(response.data.eeDocData));
        setNbDoc(getText(response.data.nbDocData));
        setUdDoc(getText(response.data.udDocData));
      })
      .catch((e)=> {
        console.log(e)
    })

  },[])

  function getText(xmlString: string) {
    let str = "";
    parseXML.parseString(xmlString, (err, result) => {
      if (err) {
        console.error('XML 파싱 오류:', err);
        return;
      }
      const titleRegex = /<DOC\s+title="([^"]+)"/;
      const titleMatch = xmlString.match(titleRegex);
      const cdataRegex = /<!\[CDATA\[(.*?)]]>/gs;
      let cdataMatches = [];
      let cdataMatch;
      while ((cdataMatch = cdataRegex.exec(xmlString)) !== null) {
        cdataMatches.push(cdataMatch[1]);
      }
      cdataMatches.forEach((data, index) => {
        str += (`${index}. ${data}`);
        str += "\n";
      }
      );
    })
    return str.replaceAll("0. &nbsp;","").replaceAll("<tbody>","").replaceAll("</td>","").replaceAll("</tr>","").replaceAll("&#x","").replaceAll("</p>","").replaceAll("<p>","").replaceAll("<td>","").replaceAll("</tbody>","").replaceAll("&lt","");
  };


  const handleLikeChange = () => {
    /* 좋아요 눌렀을 때 혹은 취소했을 때 */
    setLike((prevLike) => !prevLike);
  };

  return (
    <div className={styles.container}>

      
      <Header title={drug.itemName} right like={like} handleLikeChange={handleLikeChange} />
      <div className={styles.body_container}>
        <div className={styles.druginfo_body_container}>
          <div className={styles.druginfo_image_container}>
            <Image src={drug.drugImage ? `data:image/png;base64,${drug.drugImage}`: "/drug_icon.png"} width={300} height={200} alt="Picture of the author" />
          </div>
          <DrugInfoDetailBox number="1" title="약품 명" content={drug.itemName+"\n"+drug.itemEngName} />
          <DrugInfoDetailBox number="2" title="분류" content={ drug.prductType} />
          <DrugInfoDetailBox number="3" title="제조원" content={ drug.entpName} />
          <DrugInfoDetailBox number="4" title="보관 및 유통기한" content={ drug.storageMethod} />
          <DrugInfoDetailBox number="5" title="효능효과" content={eeDoc} />
          <DrugInfoDetailBox number="6" title="용법용량" content={ udDoc} />
          <DrugInfoDetailBox number="7" title="사용 상의 주의사항" content={nbDoc} />

        </div>
      </div>
    </div>
  );
}

interface DrugInfoDetailBoxProps {
  number: string;
  title: string;
  content: string;
}
function DrugInfoDetailBox({ number, title, content }: DrugInfoDetailBoxProps) {
  return (
    <div className={styles.druginfo_title_box}>
      <div className={styles.druginfo_title}>
        <div className={styles.druginfo_title_number}>{number}</div>
        <div className={styles.druginfo_title_text}>{title}</div>
      </div>
      <div className={styles.druginfo_content}>{content}</div>
    </div>
  );
}
