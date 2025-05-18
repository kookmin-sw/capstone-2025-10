"use client";

import React from "react";
import { useRouter } from "next/navigation"; // ✅ Next.js 13+ App Router
import styles from "./index.module.scss";
import CardContainer from "@/components/CardContainer";
import RequireLogin from "@/components/Login/RequireLogin";
import EventTable from "@/components/Table/EventTable";

const EventSection = ({ events }) => {
  const router = useRouter();

  const handleAddEvent = () => {
    router.push("/event/create");
  };

  return (
    <RequireLogin>
      <section className={styles.section}>
        <div className={styles["header"]}>
          <p className={styles["title"]}>이벤트</p>
          <p className={styles["description"]}>
            이벤트는 팝업스토어 공간에서 방문자의 특정 행동 또는 상호작용을
            정의하고 기록합니다. <br />
            예를 들어 체류 시간이 30초 이상 머무름, 섹션A 체류 시간이 2분을
            초과한 경우와 같은 조건입니다. <br />
            실제 오프라인 공간에서의 관심 행동을 지표화하고, 관심 여정 경로,
            체류 시간, 관심도 등을 정량적으로 분석할 수 있게 해줍니다. <br />
            이벤트는 대시보드에서 주요 지표로 활용되며, 마케팅 성과 분석 및 공간
            운영 개선에 유용하게 사용됩니다.
          </p>
          <button className={styles["add-button"]} onClick={handleAddEvent}>
            + 이벤트 추가
          </button>
        </div>

        <CardContainer showDivider={false} margin="40px">
          <EventTable events={events} />
        </CardContainer>
      </section>
    </RequireLogin>
  );
};

export default EventSection;
