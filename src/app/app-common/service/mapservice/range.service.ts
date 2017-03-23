import { Injectable } from '@angular/core';
@Injectable()
export default class RangeService {

    constructor() {

    }

    /*秒 => 毫秒*/
    ToMillisecond(second: number): number | null | undefined {

        return second * 60;
    }

    /* 刻度值定位
     * value 数据值
     * max 范围最大值
     * stage 等分数
     */
    Pitch(value: number, max: number, stage: number = 4): number | null | undefined {

        const scale = Math.ceil(max / stage);
        const i = Math.floor(value / scale);

        return i;
    }

    /* 是否显示地图涟漪效果
     * value 当前值
     * max 范围最大值
     * limit 临界值
     */
    IsShowEffect(value: number, max: number, limit: number = 2): boolean {

        // return (value / max) >= limit;
        // return (value / max) == 0 || value >= max;

        return this.Pitch(value, max) >= 3;
    }

    /* 涟漪效果范围 */
    RippleEffect(value: number, max: number, stage: number = 5, limit: number = 0.6): number {

        const _s = value / max;
        let r = _s < limit ? 0 : stage * _s;

        return r > 32 ? 32 : r;
    }

}   