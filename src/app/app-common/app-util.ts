/**
 * Created by Administrator on 2017/3/10.
 */
export interface Piece {

}
export class AppUtil {
    /**
     * 获取分段
     * @param max 最大值
     * @param split 分几段
     * @param fixed 小数位数
     */
    public splitPieces(max: number, split: number = 5): any {
        let n = max / (split-1/1.0);
        let result = [];
        let nMin = 0;
        let nMax = n;
        for (let i = 1; i < split; i++) {
            result.push({
                gt: nMin,
                lte: nMax
            });
            nMin = nMax;
            nMax = nMin + n;
        }
        result.push({
            gt: nMin
        });

        return result;
    }
}