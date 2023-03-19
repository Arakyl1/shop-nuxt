import { UserCommit } from "@/type/intex";
export default (props: any, { slots }: any) => [ slots.default({ createReview: createReview }) ]


async function createReview(data: UserCommit, ranting: number[] | [], cardId: number): Promise<any> {
    if (!data) return
    const res = await createCommit(data)
    if (res && data.ranting) {
        const averageValue = Math.round([data.ranting, ...ranting].reduce((s, m) => s + m, 0) / (ranting.length + 1))
        return await updateProduct({
            where: { id: cardId },
            data: { ranting: averageValue },
            select: { id: true }
        })
    } else { return res }
}

