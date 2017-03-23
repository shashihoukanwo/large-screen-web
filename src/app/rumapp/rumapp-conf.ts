/**
 * Created by Administrator on 2017/3/8.
 */
export interface RumAppConf {
    id: number,
    name: string,
    interval:number,
    dau: {
        show: string
    },
    keyUrls: number[],
    cdns: [{
        isp: number,
        host: number
    }],
    map: {
        type: string,
        regionId: number,
        legendMax: number
    },
    pieces: {
        performance: number[],
        crash: number[],
        networkErr: number[],
        httpCode: number[]
    }
}