import styles from "./layout.module.scss";
import MarketingSideNavigation from "@/components/SideNavigation/MarketingSideNavigation";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.content}>
      <MarketingSideNavigation />
      {children}
    </div>
  );
}
