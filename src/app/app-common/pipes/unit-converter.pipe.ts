import {PipeTransform, Pipe} from "@angular/core";
import {isNumber} from "util";
/**
 * Created by Administrator on 2017/3/20.
 */

@Pipe({
    name:'unitConverter'
})
export class unitConverterPipe implements PipeTransform{
    transform(value: any, ...args: any[]): any {
        let result:string[]=[];
        if(isNumber(value)){
            if(value>10000){
                result.push('W');
                value = value/10000.0;
            }
            if(value>1000){
                result.push('K');
                value = value/1000.0;
            }
            let numStr = value.toFixed(1);
            if(numStr.indexOf('.0')>0){
                numStr = Math.round(value)+'';
            }
            result.push(numStr);
            return result.reverse().join('');
        }
        return value;
    }

}