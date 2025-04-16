import React from 'react';
import styles from './page.module.scss';
import NoticeForm from '@/components/Form/NoticeForm';
import { fetchWithSession } from '@/lib/fetchWithSession';

/**
 * 알림 데이터를 가져오는 함수
 * @param {string} id - 알림 ID
 * @returns {Promise<Object>} - 알림 데이터
 */
async function getNoticeData(id) {
  return await fetchWithSession(
    `http://localhost:8080/api/notice/${id}`,
    {
      cache: "no-store",
      credentials: "include",
    },
  );
}

/**
 * 알림 전송 페이지 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.params - URL 파라미터
 * @returns {JSX.Element} - 페이지 JSX
 */
export default async function NoticePage({ params }) {
  const { id } = params || { id: 'default' };
  const noticeData = await getNoticeData(id);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <NoticeForm noticeData={noticeData} />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
