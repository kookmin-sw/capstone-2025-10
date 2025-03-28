"use client"

import Image from "next/image";
import styles from "./page.module.css";
import TextInput from "@/components/Input/TextInput";
import ImageUploader from "@/components/Input/ImageUploader";
import { useModal } from "@/contexts/ModalContext";
import ProductCard from "@/components/Card/ProductCard";

export default function Dashboard() {
  const { openModal } = useModal();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
