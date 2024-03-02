import React from 'react'
import styles from '@/styles/ReportCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

const ReportCard = ({ report }) => {
    return (
        <Link className={styles.container} href={`/reports/${report.id}`}>
            <div className={styles.imgContainer}>
                <Image src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${report.cropImageUrl}`} width={0} height={0} sizes='100vw' className={styles.reportImg} />
            </div>
            <div className={styles.details}>
                <p>Report Id: {report.id}</p>
                <p>Crop Name: {report.crop.name}</p>
                <p>Generated On: {new Date(report.createdAt).toLocaleString()}</p>
            </div>
            <div className={styles.iconContainer}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} width={30} stroke="currentColor" className={styles.rightIcon}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        </Link>
    )
}

export default ReportCard