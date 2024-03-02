'use client'
import React from 'react'
import styles from '@/styles/TopSection.module.css'
import { useRouter } from 'next/navigation'

const TopSection = () => {
    const router = useRouter()
    return (
        <div className={styles.backBtnContainer}>
            <button className={styles.backBtn} onClick={() => router.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={25} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                Back
            </button>
            <p className={styles.title}>Note: Authentication was not implemented for simplicity</p>
        </div>
    )
}

export default TopSection