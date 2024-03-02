import PDFDocument from 'pdfkit';
import fs from 'fs'

type selectedCrop = {
    id: number;
    name: string;
    iconUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

export const buildPdf = (cropImage: String,date: Date, pdfName: String, selectedCrop: selectedCrop)=>{
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(`./public/${pdfName}.pdf`))
    doc.fontSize(24).text('Commodity Digital Quality Control Report', {
        align: 'center'
    })
    doc.fontSize(14).text(`Generated On- ${new Date(date).toLocaleString()}`, 20, 140)
    doc.fontSize(14).text(`Crop Name- ${selectedCrop.name}`)
    doc.image(`./public/${cropImage}`, {
        width: 500,
        align: 'center',
    })
    doc.end()
}