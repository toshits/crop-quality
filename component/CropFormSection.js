'use client'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import styles from '@/styles/CropFormSection.module.css'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Spinner from './Spinner'

const CropFormSection = () => {

    const barRef = useRef()
    const captureRef = useRef()
    const router = useRouter()
    const [crops, setCrops] = useState([])
    const [capturedImage, setCapturedImage] = useState('')
    const [selectedCrop, setSelectedCrop] = useState(-1)
    const [loading, setLoading] = useState(false)
    const [initLoading, setInitLoading] = useState(true)

    const handleGenerateReport = async () => {
        if(crops.length == 0){
            toast.info('Add crops from admin panel')
            return
        }
        setLoading(true)
        const data = new FormData()
        data.append('cropImage', capturedImage)
        data.append('cropId', selectedCrop)
        barRef.current.style.width = '30%'
        const reportRes = await fetch('http://127.0.0.1:6600/crops/generate-report', {
            method: 'POST',
            body: data
        })
        barRef.current.style.width = '60%'
        const reportJson = await reportRes.json()
        if (reportJson.error != null) {
            toast.error(reportJson.error.message)
        }
        else {
            router.push(`/reports/${reportJson.result.id}`)
            barRef.current.style.width = '100%'
        }
    }

    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const cropsRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/crops/find-all`, {
                    next: {
                        revalidate: 0
                    }
                })
                const cropsJson = await cropsRes.json()
                if (cropsJson.error != null) {
                    toast.error(cropsJson.error.message)
                }
                else {
                    setCrops(cropsJson.result)
                }
                setInitLoading(false)
                
            } catch (error) {
                toast.error(error.message)
                setInitLoading(false)
            }
        }

        fetchCrops()
    }, [])

    return (
        <div className={styles.formContainer}>
            <div className={styles.cropSelectInp}>
                <p className={styles.cropSelectLabel}>Select the crop</p>
                <div className={styles.cropSelect} style={{display: initLoading ? 'none' : 'grid'}}>
                    {
                        crops.length != 0 ? crops.map((crop) => {
                            return (
                                <React.Fragment key={crop.id}>
                                    <input className={styles.radioInp} type="radio" id={`${crop.name}${crop.id}_home`} name="cropList" value={crop.id} onChange={(e) => setSelectedCrop(e.target.value)} />
                                    <label className={styles.label} htmlFor={`${crop.name}${crop.id}_home`}>
                                        <Image src={`${process.env.NEXT_PUBLIC_SERVER_URL}${crop.iconUrl}`} width={70} height={70} style={{ borderRadius: '50%' }} />
                                        {crop.name}
                                    </label>
                                </React.Fragment>
                            )
                        }) : 'No Crop Found - Add new crop from admin panel'
                    }
                </div>
                <div style={{display: initLoading ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', height: '140px'}}>
                    <Spinner width={35} thickness={12} color={'black'} />
                </div>
            </div>
            <div className={styles.captureImageInp}>
                <p className={styles.label}>Click the crop image</p>
                <input type='file' accept='image/png, image/webp, image/jpeg' capture="user" ref={captureRef} onChange={(e) => setCapturedImage(e.target.files[0])} />
            </div>

            <div className={styles.progressContainer} style={{display: loading ? 'block' : 'none'}}>
                <div className={styles.progressBar}>
                    <div className={styles.bar} ref={barRef}>

                    </div>
                </div>
            </div>

            <div className={styles.reportBtnContainer} style={{display: loading ? 'none' : 'block'}}>
                <button disabled={loading} className={styles.btn} onClick={handleGenerateReport}>Generate Report</button>
            </div>

        </div>
    )
}

export default CropFormSection