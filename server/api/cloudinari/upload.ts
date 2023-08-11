import { v2 as cloudinary } from 'cloudinary'
import formidable, { type Fields, type Files } from 'formidable';

const uploadImageCloudinary = async (file: string) => {
    return await cloudinary.uploader.upload(file, {
        height: 1200,
        width: 1200,
        crop: "fit",
        fetch_format: "webp",
        folder: 'product-photo',
        uploadPreset: 'your-upload-preset',
    })
}

const addImageCloud = async (filepath: string, num: number): Promise<
    { url: string, secretUrl: string } | null
> => {
    try {
        if (num <= 5) {
            const uploadImage = await uploadImageCloudinary(filepath)
            return {
                url: uploadImage.url,
                secretUrl: uploadImage.secure_url,
            }
        } else {
            return null
        }
    } catch (error) {
        return addImageCloud(filepath, ++num)
    }
}

export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    cloudinary.config({
        cloud_name: config.cloudinaryName,
        api_key: config.cloudinaryApiKey,
        api_secret: config.cloudinaryApiSecret
    })

    const params = getQuery(event)
    let response : { url: string; secretUrl: string } | null = null
    if ('type' in params && params.type === 'File') {
        const form = formidable({})
        const { fields, files }: { fields: Fields, files: Files } = await new Promise(
            (resolse, reject) => {
                form.parse(event.req, (err, fields, files) => {
                    if (err) reject(err)
                    resolse({ fields, files })
                })
            })

        const _file = Array.isArray(files.file) ? files.file[0] : files.file
        response = await addImageCloud(_file.filepath, 0)
    } else if ('type' in params && params.type === 'String') {
        const body = await readBody<{ link: string }>(event)
        console.log(body)
        response = await addImageCloud(body.link, 0)
    }
    return response
})