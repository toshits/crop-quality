'use client'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/CropAdminSection.module.css'
import { toast } from 'react-toastify'
import CropCard from './CropCard'

const CropAdminSection = () => {

    const [crops, setCrops] = useState([])
    const [refetchCrops, setRefetchCrops] = useState(0)

    useEffect(()=>{
        const fetchCrops = async ()=>{
            try {
                const cropsRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/crops/find-all`, {
                    next: {
                        revalidate: 0
                    }
                })
                const cropsJson = await cropsRes.json()
                if(cropsJson.error != null){
                    toast.error(cropsJson.error.message)
                }
                else{
                    setCrops(cropsJson.result)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }

        fetchCrops()

    }, [refetchCrops])

    return (
        <div className={styles.cardContainer}>
            {
                crops.map((crop) => {
                    return (
                        <CropCard key={crop.id} crop={crop} setRefetchCrops={setRefetchCrops} />
                    )
                })
            }
        </div>
    )
}

export default CropAdminSection