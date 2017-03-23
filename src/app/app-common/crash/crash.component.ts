import {Component, OnInit,ElementRef,AfterViewInit,ViewChild,Input, OnChanges, SimpleChanges} from '@angular/core';
import {AppOptions} from "../class/app-options";
import {isNullOrUndefined} from "util";
import {HttpService} from "../service/http/http.service";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {setInterval} from "timers";

const echarts = require('echarts/lib/echarts');
//require('echarts/lib/chart/line');


@Component({
	selector: 'app-crash',
	templateUrl: './crash.component.html',
	styleUrls: ['../app.common.css','./crash.component.css']
})

export class CrashComponent implements OnInit,AfterViewInit,OnChanges{
	@ViewChild('crashmain') crashMain:ElementRef;
	@Input('option') option:AppOptions;
	
	private crashChart;
	
	//dom
	public rateValue = "0";
	public crashNum = 0;
	public crashUsers = 0;
	//红色阈值
	public redCircle = false;
	
	constructor(private httpService: HttpService) {
	}
	ngOnChanges(changes: SimpleChanges):void{
        let option = changes['option'].currentValue;
        if (option.init) {
            this.crashChartInit();
            
            this.loadData(option.url,option.paramsMap,option.interval,false);
        }
    }
	ngOnInit(){

	}
	ngAfterViewInit(){
	}
	
	loadData(url:string,params:Map<string,any>,interval:number,showLoading:boolean){
        if(showLoading){
            //this.crashChart.showLoading();
        }
        this.httpService.get(url,params)
            .subscribe(data=>{
            	//this.crashChart.hideLoading();
            	let status = +data.status;
            	if(status === 200){
            		this.getAppCrashRateCallBack(data.data);
            	}
            	
            	if(interval>0){
		        	setTimeout(function(){
		               this.loadData(url,params,interval,false);
		        	}.bind(this),interval*1000);
		        }
            });
	}
	
	getAppCrashRateCallBack(data){
		this.rateValue = data.value + data.unit;
		this.crashNum = data.stat.count;
		this.crashUsers = data.stat.userCount;
		let result = [];
		let seriesdata = data.series[0].data;
		for(let i in seriesdata){
			let sd = seriesdata[i];
			result.push([sd.x,sd.y]);
		}
		this.drawCrashLine(result,data.unit);
	}
	
	crashChartInit(){
		//基于准备好的dom，初始化echarts实例
		this.crashChart = echarts.init(this.crashMain.nativeElement);
	}
  
	drawCrashLine(data,unit){
		// 指定图表的配置项和数据
		const option = {
			backgroundColor:"#06182e",
			textStyle:{
				color:"#36638c",
			},
			animation:true,
			animationDuration:3000,
			grid:{
				left:30,
				top:30,
				right:20,
				height:90,
				show: false,
				borderWidth:1,
				borderColor:"#283c4e",
			},
			xAxis:{
        		type: 'time',
        		//坐标轴两边不留白
        		boundaryGap: false,
        		//取消坐标轴事件
        		silent:true,
        		//x轴线
		        axisLine:{
		        	show:true,
		        	lineStyle:{
		        		color:"#293f4d",
		        	}
		        },
		        //网格线
		        splitLine:{
		        	show: true,
		        	//取消坐标轴事件
		        	silent:true,
		        	lineStyle:{
		        		color:["#293f4d"]
		        	}
		        },
		        axisLabel: {
	                formatter:function(value,index){
	                	let time = new Date(value);
	                	return time.toTimeString().substr(0,5);
					}
	            },
    		},
	    	yAxis:{
	    		name :'单位('+unit+')',
		        type: 'value',
		        //y轴线
		        axisLine:{
		        	show:true,
		        	lineStyle:{
		        		color:"#293f4d",
		        	},
		        },
		        //网格线
		        splitLine:{
		        	show: true,
		        	lineStyle:{
		        		color:["#293f4d"]
		        	}
		        },
//		        axisLabel: {
//	                formatter:'{value}‰',
//	            },
		    },
	    	series:{
		        type: 'line',
		        //平滑曲线
		        smooth: true,
		        //不显示坐标点
		        showSymbol:false,
		        areaStyle:{
		            normal:{
		                color:"rgba(234,98,93,0.7)"
		            }
		        },
		        lineStyle:{
		        	normal:{
	                    color:'#ea625d',
	                    width: 1
		            }
		        },
				data:data,
	    	}
		}
		this.crashChart.setOption(option);

		// this.crashChart.setOption({
		// 	yAxis:{
	    // 		name :'单位('+unit+')'
	   	// 	},
        //     series:[{
        //         data:data,
        //     }]
        // });
		// let last:number[] = data.pop();
		// let date = last.shift();
		// let v1 = data[data.length-1][1];
		// let v2 = last.shift();
		// this.analog(this.crashChart,data,date,v1,v2);
	}

	/**
	 * 模拟数据
	 * @param chart 图表
	 * @param data 图表数据数组
	 * @param date 日期
	 * @param v1 起始值
	 * @param v2 最大值
	 * @param interval 间隔时间秒
	 * @param times 执行次数
	 */
	analog(chart:any,data,date:number,v1:number,v2:number,interval:number=1,times:number=60){
		let step = (v2-v1)/times;
		let i =1;
		let itv = setInterval(function(){
			data.shift();
			data.push([[date+i*1000*60],v1+i*step]);
			chart.setOption({
				series:[{
					data:data,
				}]
			});
			i++;
			if(i>times){
				clearInterval(itv);
			}
		},interval*1000);
	}
}
