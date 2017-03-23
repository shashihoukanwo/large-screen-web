/**
 * Created by Administrator on 2017/3/9.
 */
export interface DyMap {
    id: number,
    status: number,
    data: {
        value: number,
        unit: string,
        name: string,
        stat: {
            availability: number,
            count: number,
            successCount: number
        },
        series: [{name: string, value: number}]
    }
}