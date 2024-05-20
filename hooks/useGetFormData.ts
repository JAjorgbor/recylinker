export default function useGetFormData() {
    const objectToFormData = (obj: any, formData = new FormData(), parentKey = '') => {
        if (typeof obj === 'object' && obj !== null && !(obj instanceof Date) && !(obj instanceof File)) {
            Object.keys(obj).forEach(key => {
                const value = obj[key];
                const newKey = parentKey ? `${parentKey}[${key}]` : key;

                if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        const arrayKey = `${newKey}[${index}]`;
                        if (typeof item === 'object' && item !== null) {
                            objectToFormData(item, formData, arrayKey);
                        } else {
                            formData.append(arrayKey, item);
                        }
                    });
                } else if (typeof value === 'object' && value !== null) {
                    objectToFormData(value, formData, newKey);
                } else {
                    formData.append(newKey, value);
                }
            });
        } else {
            formData.append(parentKey, obj);
        }

        return formData;
    };

    return objectToFormData
}