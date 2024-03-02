import React from 'react'
import styles from '@/styles/Report.module.css'
import Link from 'next/link'
import ReportCard from '@/component/ReportCard'

const PastReports = async () => {

    const reportsRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/crops/find-all-reports`, {
        next: {
            revalidate: 0
        }
    })
    const reports = await reportsRes.json()

    if (reports.error != null) {
        return (
            <div>
                {reports.error.message}
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
                    <h1 className={styles.title}>Past Crop Quality Reports</h1>
                    {
                        reports.result.length != 0 ?
                            <div className={styles.pastReports}>
                                {
                                    reports.result.map((report) => {
                                        return (
                                            <ReportCard key={report.id} report={report} />
                                        )
                                    })
                                }
                            </div> : <p style={{textAlign: 'center', fontSize: '18px', fontWeight: 500, height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>No Reports Found</p>
                    }
                </div>
            </div>
        )
    }

}

export default PastReports