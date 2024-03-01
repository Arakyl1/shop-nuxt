import { CategorDataItem } from "@/type/intex";

export default (selectWatchKey: 'id'|'value' = 'value') => {

    const CATEGOR_DATA = useState<CategorDataItem[] | null>("CATEGOR_DATA_APP")
    const activeId = ref<Array<number | string>>([])

    const dataSelect = computed(() => {
        if (!CATEGOR_DATA.value) return null
        if (!activeId.value.length) return [transformDataForSelect(CATEGOR_DATA.value)]

        let nowActiveList: CategorDataItem[] | null = CATEGOR_DATA.value
        const selectList = []

        for (let i = 0, l = activeId.value.length; i < l; i++) {
            const categor = activeId.value[i];
            selectList.push(transformDataForSelect(nowActiveList))
            const findRes = nowActiveList.find(_ => _[selectWatchKey] === categor)!
            if ('children' in findRes) {
                nowActiveList = findRes.children as never
            } else { nowActiveList = null as never }
        }
        return [...selectList, nowActiveList ? transformDataForSelect(nowActiveList) : undefined]
    })

    function transformDataForSelect(data: CategorDataItem[]): { id: string; value: string }[] {
        return data.map(_ => ({ id: _[selectWatchKey], value: _.value }));
    }

    function addCategor(value: string | number | null, index: number) {
        if (value) {
          if (!activeId.value[index]) {
            activeId.value.push(value);
          } else {
            activeId.value = activeId.value.map((_, i) => i === index ? value : _).slice(0, index + 1);
          }
        }
      }

    function resetSelect() {
        activeId.value = []
    }

    function updateActiveId(value: typeof activeId.value | null) {
        if (!value) return
        activeId.value = value
    }

    return { activeId, dataSelect, addCategor, updateActiveId, resetSelect }
}