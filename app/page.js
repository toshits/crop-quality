import CropFormSection from "@/component/CropFormSection";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {

  return (
    <main>
      <div className={styles.topNav}>
        <Link href={'/admin-panel'} className={styles.adminLink}><button className={styles.adminBtn}>View Admin Panel</button></Link>
        <Link href={'/reports'} className={styles.adminLink}><button className={styles.adminBtn}>Past Reports</button></Link>
      </div>
      <CropFormSection />
    </main>
  );
}
