import Link from 'next/link'
import React from 'react'
import styles from '@/styles/ReportId.module.css'
import Image from 'next/image';

const ReportId = async ({ params }) => {

    try {
        const options = { method: 'GET', headers: { id: params.id }, next: {
            revalidate: 0
        } };
        const reportRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/crops/find-report`, options)
        const reportJson = await reportRes.json()
    
        if (reportJson.error != null) {
            return (
                <div className={styles.error}>
                    {reportJson.error.message}
                </div>
            )
        }
    
        else {
            return (
                <div className={styles.container}>
                    <div className={styles.topNav}>
                        <Link href={'/'} className={styles.homeLink}>Home</Link>
                    </div>
                    <div className={styles.reportContainer}>
                        <h1 className={styles.title}>Commodity Digital Quality Control Report</h1>
                        <div className={styles.metadata}>
                            <p>Crop Name: {reportJson.result.crop.name}</p>
                            <p>Report Id: {reportJson.result.id}</p>
                            <p>Report Generated on: {new Date(reportJson.result.createdAt).toLocaleString()}</p>
                        </div>
                        <div className={styles.cropImgContainer}>
                            <h3 className={styles.resTitle}>Crop Image</h3>
                            <Image src={`${process.env.NEXT_PUBLIC_SERVER_URL}${reportJson.result.cropImageUrl}`} width={0} height={0} sizes='100vw' className={styles.cropImage} />
                        </div>
                        <div className={styles.reportPdfContainer}>
                            <h3 className={styles.resTitle}>Crop Report</h3>
                            <iframe src={`${process.env.NEXT_PUBLIC_SERVER_URL}${reportJson.result.reportPdfUrl}`} className={styles.pdfFrame} />
                        </div>
                        <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}${reportJson.result.reportPdfUrl}`} download={'Report'} target='_blank' style={{textDecoration: 'none', color: 'black'}}><button className={styles.btn}>Download Report</button></Link>
                    </div>
                </div>
            )
        }
        
    } catch (error) {
        <div>{error.message}</div>
    }

}

export default ReportId