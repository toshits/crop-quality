import React from 'react'
import styles from '@/styles/Spinner.module.css'

const Spinner = ({ width, thickness, color, hide }) => {
    return (
        <svg width={width} className={styles.svgContainer} viewBox="0 0 100 100" style={{'--color': color, '--thickness': thickness, display: hide ? 'none' : 'block' }}>
            <circle cx="50" cy="50" r="45" className={`${styles.loaderSvg} ${styles.bg}`}></circle>
            <circle cx="50" cy="50" r="45" className={`${styles.loaderSvg} ${styles.animate}`}></circle>
        </svg>
    )
}

export default Spinner