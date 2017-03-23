import {PipeTransform, Pipe} from "@angular/core";
/**
 * Created by Administrator on 2017/3/13.
 */
@Pipe({
    name:'percentage'
})
export class PercentagePipe implements PipeTransform{

    transform(value: any, ...args: any[]): any {
        let val = value*100;
        return val.toFixed(2);
    }

}