'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { toast } from 'react-toastify'
import Spinner from '@/component/Spinner'

const AddCrop = () => {


    const [cropName, setCropName] = useState('')
    const [icon, setIcon] = useState()
    const [loading, setLoading] = useState(false)
    const iconInpRef = useRef()

    const handleAddNewCrop = async () => {
        try {
            const form = new FormData();
            form.append("cropIcon", icon);
            form.append("cropName", cropName);
    
            const options = {
                method: 'POST',
                body: form
            };
    
            const cropRes = await fetch('http://localhost:6600/crops/create', options)
            const cropJson = await cropRes.json()
    
            if (cropJson.error != null) {
                toast.error(cropJson.error.message)
            }
            else {
                toast.success('New Crop has been successfully added')
                setCropName('')
                setIcon('')
                iconInpRef.current.value = ''
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(() => {
        console.log(icon)
    }, [icon])

    return (
        <div>
            <div className={styles.formSection}>
                <h1 className={styles.title}>Add New Crop</h1>
                <div className={styles.inputContainer}>
                    <div className={styles.inpLabel}>
                        <label htmlFor="cropName">Crop Name</label>
                        <input value={cropName} onChange={(e) => setCropName(e.target.value)} className={styles.inp} id='cropName' type="text" />
                    </div>
                    <div className={styles.inpLabel}>
                        <label htmlFor="cropIconImage">Upload Icon</label>
                        <input ref={iconInpRef} onChange={(e) => setIcon(e.target.files[0])} className={styles.fileInp} id='cropIconImage' accept="image/png, image/webp, image/jpeg" type="file" />
                    </div>
                    <button onClick={handleAddNewCrop} disabled={loading} className={styles.btn}>
                        {
                            loading ?
                                <Spinner width={25} thickness={12} color={'black'} />
                                : 'Add New Crop'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddCrop