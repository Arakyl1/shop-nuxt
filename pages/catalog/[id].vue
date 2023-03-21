<template>
    <div>
        <template v-if="data">
            <WidgetsProductMain v-if="isDesktopOrTablet" :data="data" class="mb-8 xl:mb-6" />
            <WidgetsProductMainMobaile v-else :data="data" class="mb-12" />
            <WidgetsProductCharacteristic :data="data.characteristic" class="mb-8 xl:mb-6" />
            <WidgetsProductDescription :id="data.id" :name="data.name" :art="data.art" :description="data.description"
                :reviews="data.reviews" :refresh="refresh" class="mb-12" />
        </template>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Информация о товаре',
})

const route = useRoute()
const { isDesktopOrTablet } = useDevice()
const { getInfo: getInfoProduct } = useProduct()

const option = () => {
    return {
        where: { id: +route.params.id },
        ...selectForCard({
            ranting: true,
            itemArt: true,
            itemMod: true,
            description: true,
            characteristic: {
                select: {
                    content: true
                }
            },
            reviews: {
                select: {
                    ranting: true,
                    text: true,
                    user: {
                        select: {
                            username: true,
                            profileImage: true
                        }
                    }

                }
            }
        })
    }
}

const { data, refresh, error } = await useAsyncData(`data_full_info_${Date.now()}`, () => getInfoProduct(option()))

onMounted(() => {
    useHead({
        titleTemplate: () => data.value ? data.value.name : ''
    })
})
</script>