
/*
    用于响应显示百分比千分比数值
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'proportion'
})
export class ProportionPipe implements PipeTransform {

    transform(value: number): string {

        return value + "...";
    }
}

/*
    截取指定长度
 */
@Pipe({
    name: 'cutnum'
})
export class CutnumberPipe implements PipeTransform {

    transform(value: number, len: number, reverse: boolean = false): string | null | undefined {
        let numStr = value.toString();
        const numLength = numStr.length;
        if (reverse) {

            if (numLength <= 1) return '';
            return len ? numStr.substr(0, (numLength - len)) : '';
        } else {

            return numStr.substr(len ? (numLength - len) : 0, len ? len : numLength);
        }
    }
}

