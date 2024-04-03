import { defineAuthenticatedEventHandler } from "@/server/utils/auth"
import { getFormDataInEvent, checkValidFormData } from "@/server/utils/formDataHelper";
import { Tooltip } from "@prisma/client"
import prisma from "@/server/db";


export default defineAuthenticatedEventHandler(async(event, authUser) => {
    try {
        const modelKey: Array<keyof Tooltip> = ['text','name']
        const formData = await getFormDataInEvent(event, modelKey)
    
        checkValidFormData(formData, modelKey)

        await prisma.tooltip.create({ data: formData, select: { id: true } })
        return _createResponseMessage('TOOLTIP_CREATE_SUCCESS', 'success') 
    } catch (error) {
        return _createResponseMessage('TOOLTIP_CREATE_ERROR', 'error') 
    }
})