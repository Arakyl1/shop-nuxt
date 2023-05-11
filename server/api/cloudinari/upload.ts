import { v2 as cloudinary } from 'cloudinary'
import formidable from 'formidable';

const uploadImageCloudinary = async (image: string) => {
    return await cloudinary.uploader.upload(image, {
        height: 800,
        width: 800,
        crop: "fit",
        fetch_format: "webp",
        folder: 'upload-examples',
        uploadPreset: 'your-upload-preset',
    })
}

const addImageCloud = async (key: string, obj: any) => {
    const file = obj[key].filepath
    const uploadImage = await uploadImageCloudinary(file)
    const data = {
        url: uploadImage.url,
        secretUrl: uploadImage.secure_url,
    }
    return data
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    cloudinary.config({
        cloud_name: config.cloudinaryName,
        api_key: config.cloudinaryApiKey,
        api_secret: config.cloudinaryApiSecret
    })

    const form = formidable({})
    const { field, files } = await new Promise((resolse, reject) => {
        form.parse(event.req, (err, fields, files) => {
            if (err) reject(err)
            resolse({ fields, files })
        })
    })

    let addFiles = Object.keys(files).map(async (key) => {
        try {
            return await addImageCloud(key, files)
        } catch {
            return null
        }
    })
    const data = await Promise.all(addFiles)

    return data
})