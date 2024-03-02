'use client'
import React from 'react'
import styles from '@/styles/CropCard.module.css'
import Image from 'next/image'
import { toast } from 'react-toastify'

const CropCard = ({ crop, setRefetchCrops }) => {

    const handleDeleteCrop = async () => {
        try {
            const deleteConfirmation = await window.confirm(`Are you sure you want to delete ${crop.name}?`)
            if(deleteConfirmation){
                const options = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: crop.id
                    })
                }
        
                const delCropRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/crops/delete`, options)
                const delCropJson = await delCropRes.json()
    
                if(delCropJson.error != null){
                    toast.error(delCropJson.error.message)
                }
                else{
                    setRefetchCrops((prev)=>prev+=1)
                }
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className={styles.card}>
            <Image className={styles.cropImage} src={`${process.env.NEXT_PUBLIC_SERVER_URL}${crop.iconUrl}`} width={80} height={80} />
            <p className={styles.title}>{crop.name}</p>
            <button className={styles.deleteBtn} onClick={handleDeleteCrop}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={25} className="w-6 h-6" color='#E61F23'>
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    )
}

export default CropCard