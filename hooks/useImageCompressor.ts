import imageCompression from "browser-image-compression"

export default function useImageCompressor() {
    const compressImage = async (file: any) => {
        const options = {
            maxSizeMB: 1, // Maximum file size in MB
            maxWidthOrHeight: 1920, // Max width or height in pixels
            useWebWorker: true, // Use multi-threading for faster compression
        }

        try {
            const compressedFile = await imageCompression(file[0], options)
            return compressedFile
        } catch (error) {
            console.error('Error during image compression:', error)
            throw error
        }
    }
    return compressImage
}