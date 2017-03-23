/**
 * Created by Administrator on 2017/3/6.
 */
export interface AppOptions{
    init:boolean,
    url: string, // url 请求地址
    params: {
        id: number, // 应用ID
        timePeriod: number, //时间范围
        keyId:number,//单个关键请求ID
        keyIds: number[], //关键请求Id数组
        map: string, //地图类型
        cdnId: number, //cdnId
        regionId: number, //省份id选region
        activeTop: number, //活跃用户top 个数
    }
    interval: number, // 时间间隔（请求数据）
    colors: string[], // 颜色数组
    legendColor:string,//图例颜色
    legendMax: number, //地图图例最大值  
    dauShow: Boolean, //dau是否显示
    performanceIndex: number[], //平均相应时间模块指标区间
    crashIndex: number[], //崩溃模块指标区间
    networkErrIndex: number[], //网络错误模块色域指标区间
    httpCodeIndex: number[] , //HTTP响应码指标区间
    paramsMap:Map<string,any>
}