import styles from './index.module.scss';

function Indexpage() {
  return (
    <div className={styles.root}>
      <h1>《香港裁判法院示威案件判例匯編》引言</h1>
      <p>
        自2019年6月起，香港法庭突然須要處理大量社運相關的刑事案件，司法機構以及法律界均忙得不可開交。除了比較嚴重的控罪會被轉介至高等法院及區域法院之外（如暴動、嚴重傷人、爆炸品相關控罪等），大部分案件均會在裁判法院完成司法程序。<sup>1</sup>然而，法庭一般只會就區域法院或以上的案件頒下裁決及判刑理由以供公眾參閱。裁判法院的判決鮮有完整及公開的正式紀錄，只有少量案件有判決理由被上載至司法機構網頁，當中部分更只是法庭數碼錄音的口頭謄本。<sup>2</sup>
      </p>
      <p>
        有見及此，我們發起了《香港裁判法院示威案件判例匯編》計劃("Compendium Project")，目的為這些裁判法院案件做詳細記錄。我們認為裁判法院作為所有案件起始的法院，其作出的裁決同樣重要。今時今日，雖然多家新聞媒體在《香港國安法》實施後相繼停運，仍然有少量媒體<sup>3</sup>持續整理與2019年事件相關及《香港國安法》案件的分析，撰寫歷史的初稿。除了作歷史紀錄外，我們希望Compendium Project 能夠為傳媒及學者提供資料，為相關報道及學術研究出一分力。
      </p>
      <p>
        截至2024年，在被檢控的約2500人（約1400宗案件）之中，我們整合了617宗案件(約44%)，牽涉1,127條控罪，當中最多記錄的控罪為「管有攻擊性武器」（192條控罪），其次為「刑事損／毀壞」（113條控罪）。在此617宗案件中，以控罪作爲單位，有618條控罪成立（當中包括被告選擇認罪的案件），有509條不成立或獲撤控（當中包括自簽守行為），有500條控罪牽涉監禁式刑罰（包括更生中心和勞教中心）。我們所整合的數據包括主理裁判官、申請上訴期間保釋、審訊長度、還押日數等數據及資料。
      </p>
      <h1>編輯們如何撰寫 Compendium Project 的案件摘要？</h1>
      <p>
        Compendium Project 的編輯在撰寫案件摘要 (Case Digest) 時遵循兩大原則：確保資料客觀準確以及保障當事人個人私隱。
      </p>
      <p>
        編輯在撰寫摘要時，除了參考司法機構的公開資料（包括裁決書及對公眾投訴的回應）以及《法庭文字直播台》的審訊直播紀錄外，亦會對照不同媒體的相關報道，綜合不同資料來源寫成摘要，務求內容準確。基於保障個人私隱的考慮，編輯會避免輸入敏感的個人資料，以免案件當事人遭到「起底」，案件編號及當事人的全名也只會供編輯內部參考核實之用，不作公開。
      </p>

      <div className="py-4">
        <p>
          <sup className="mr-2">1</sup>
          <a target="_blank" rel="noreferrer noopener" href="https://news.rthk.hk/rthk/ch/component/k2/1584824-20210408.htm">
            反修例事件2521人涉司法程序 614人被定罪 - RTHK
          </a>
        </p>
        <p>
          <sup className="mr-2">2</sup>
          <a target="_blank" rel="noreferrer noopener" href="https://www.hklii.hk/cgi-bin/sinodisp/chi/hk/cases/hkmagc/2020/5.html?stem=&synonyms=&query=(%E4%BD%95%E4%BF%8A%E5%A0%AF%20)%20OR%20ncotherjcitationtitles(%E4%BD%95%E4%BF%8A%E5%A0%AF%20">
          香港特別行政區 訴 王愷銘 [2020] HKMagC 5; ESCC 654/2020 (10 June 2020) (hklii.hk)
          </a>
        </p>
        <p>
          <sup className="mr-2">3</sup>
          <a target="_blank" rel="noreferrer noopener" href="https://thewitnesshk.com/feature-data/">法庭線</a>、<a target="_blank" rel="noreferrer noopener" href="https://thecollectivehk.com/%e5%8f%8d%e4%bf%ae%e4%be%8b%e4%ba%94%e5%b9%b4%ef%bd%9c%e3%80%8a%e9%9b%86%e8%aa%8c%e7%a4%be%e3%80%8b%e9%82%84%e5%8e%9f%e5%9c%8b%e5%ae%89%e3%80%8c%e9%9b%99%e6%b3%95%e3%80%8d%e6%95%b8%e6%93%9a%e3%80%8023/">集誌社</a>
        </p>
      </div>
    </div>
  );
}

export default Indexpage;
