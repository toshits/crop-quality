import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import CropCard from '@/component/CropCard'
import CropAdminSection from '@/component/CropAdminSection'

const AdminPanel = async () => {

    return (
        <div className={styles.container}>
            <div className={styles.btnContainer}>
                <Link className={styles.link} href={'/admin-panel/add'}><button className={styles.btn}>Add New Crop</button></Link>
            </div>
            <CropAdminSection />
        </div>
    )
}

export default AdminPanel