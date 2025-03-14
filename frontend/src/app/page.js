import Image from "next/image";
import styles from "./page.module.css";
import TextInput from "@/components/Input/TextInput";
import ImageUploader from "@/components/Input/ImageUploader";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div style={{display: "flex", width: "100%", height: "100%"}}>
          <div style={{display: "flex", flex: "1"}}>
            <TextInput label="상품명" placeholder={"상품명을 입력해주세요."} />
          </div>
          <div style={{display: "flex", flex: "1"}}>
            <ImageUploader />
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
