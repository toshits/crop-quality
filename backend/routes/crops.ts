import express, { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import multer from 'multer'
import crypto from 'crypto'
import path from 'path'
import { buildPdf } from '../services/pdf-builder'

const prisma = new PrismaClient()
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {
        cb(null, crypto.randomUUID() + path.extname(file.originalname))
    }
})
const upload = multer({ storage })


router.post('/create', upload.single('cropIcon'), async (req, res) => {
    try {
        const { cropName } = req.body
        const fileName = req.file?.filename
        const iconPath = `/${fileName}`

        await prisma.crops.create({
            data: {
                name: cropName,
                iconUrl: iconPath
            }
        })

        res.json({
            result: {
                name: cropName,
                iconUrl: iconPath,
            }
        })

    } catch (error) {
        if (typeof error === "string") {
            error.toUpperCase()
        } else if (error instanceof Error) {
            if (error.message.includes('Unique constraint failed on the constraint: `Crops_name_key`')) {
                res.status(500).json({
                    error: {
                        name: 'DuplicateEntry',
                        message: 'Crop Name already exists'
                    }
                })
                return
            }
        }
        res.status(500).json({
            error: {
                name: 'InternalServerError',
                message: 'Please try after sometime'
            }
        })
    }
})

router.get('/find-all', async (req, res) => {
    try {
        const crops = await prisma.crops.findMany()
        res.json({
            result: crops
        })
    } catch (error) {
        res.status(500).json({
            error: {
                name: 'InternalServerError',
                message: 'Please try after sometime'
            }
        })
    }
})

router.put('/delete', async (req, res) => {
    try {
        const { id } = req.body

        const report = await prisma.reports.findFirst({
            where: {
                cropsId: id
            }
        })

        if(report != null){
            res.status(400).json({
                error: {
                    name: 'InvalidRequest',
                    message: 'Crop cannot be delete due to associated reports'
                }
            })
            return
        }

        const crop = await prisma.crops.delete({
            where: {
                id
            }
        })

        res.json({
            result: crop
        })
    } catch (error) {
        res.status(500).json({
            error: {
                name: 'InternalServerError',
                message: 'Please try after sometime'
            }
        })
    }
})

router.post('/generate-report', upload.single('cropImage'), async (req, res) => {
    try {
        console.log(req.file)
        const cropImage = req.file?.filename
        const cropId = +req.body.cropId

        if (typeof cropImage != 'string') {
            res.status(400).json({
                error: {
                    name: 'InvalidRequest',
                    message: 'Unable to upload crop image'
                }
            })
            return
        }

        if (isNaN(cropId)) {
            res.status(400).json({
                error: {
                    name: 'InvalidRequest',
                    message: 'Invalid Crop Id'
                }
            })
            return
        }

        const selectedCrop = await prisma.crops.findUnique({
            where: {
                id: cropId
            }
        })

        if (selectedCrop == null) {
            res.status(404).json({
                error: {
                    name: "NotFound",
                    message: "Selected crop not found"
                }
            })
            return
        }

        const createdAt = new Date()
        const pdfName = crypto.randomUUID()
        buildPdf(cropImage, createdAt, pdfName, selectedCrop)

        const report = await prisma.reports.create({
            data: {
                cropImageUrl: `/${cropImage}`,
                reportPdfUrl: `/${pdfName}.pdf`,
                cropsId: cropId,
                createdAt: new Date(createdAt),
                updatedAt: new Date(createdAt)
            }
        })

        res.json({
            result: report
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: {
                name: 'InternalServerError',
                message: 'Please try after sometime'
            }
        })
    }
})

router.get('/find-report', async (req, res) => {
    try {
        const { id } = req.headers

        if (id == null || typeof id != 'string') {
            res.status(400).json({
                error: {
                    name: 'InvalidRequest',
                    message: 'Invalid Report Id'
                }
            })
            return
        }

        const report = await prisma.reports.findUnique({
            where: {
                id
            },
            include: {
                crop: true
            }
        })

        if (report == null) {
            res.status(400).json({
                error: {
                    name: 'NotFound',
                    message: 'Report not found'
                }
            })
            return
        }

        res.status(200).json({
            result: report
        })

    } catch (error) {
        res.status(500).json({
            error: {
                name: 'InternalServerError',
                message: 'Please try after sometime'
            }
        })
    }
})

router.get('/find-all-reports', async (req, res) => {
    try {
        const reports = await prisma.reports.findMany({
            include: {
                crop: true
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })
        res.status(200).json({
            result: reports
        })
    } catch (error) {
        res.status(500).json({
            error: {
                name: 'InternalServerError',
                message: 'Please try after sometime'
            }
        })
    }
})

export default router