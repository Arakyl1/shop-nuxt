import { containerSize } from "@/pinia/windowSize";

export default () => {
    const container = containerSize();
    const { size } = storeToRefs(container)
    
    const updateSize = (data: Window) => { 
        container.updateSize(data)
    }
    return { updateSize, size }
}