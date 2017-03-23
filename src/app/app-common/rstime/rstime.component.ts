import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import {AppOptions} from "../class/app-options";
import { Http, Response } from '@angular/http';
import { HttpService } from '../service/http/http.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');

@Component({
  selector: 'app-rstime',
  templateUrl: './rstime.component.html',
  styleUrls: ['../app.common.css','./rstime.component.css']
  //styleUrls: ['./rstime.component.css']
})
export class RstimeComponent  implements OnChanges { 
  @ViewChild('rstimemain') rstimeMain:ElementRef;
  @ViewChild('rstimecircle') rstimeCircle:ElementRef;
  @Input('option') option:AppOptions;
  private chart = null;
  public isReady: boolean = false;
  public timeValue = "0";
  //红色阈值
  public redCircle = false;
  public rangeColors = ["#69b960","#deca57","#e9625e"];

  constructor(
        private _httpService: HttpService) {
        this.isReady = false;
  }
  ngOnChanges(changes: SimpleChanges):void{
        let option = changes['option'].currentValue;
        if (option.init) {
        	this.loadData(option.url, option.interval, option.performanceIndex)
            
        }
  }

  ngOnInit() {
        this.chart = echarts.init(this.rstimeMain.nativeElement);
  }
  ngAfterViewInit(){
  }
  private loadData(url:string,interval:number,performanceIndex){
      const rscircle = this.rstimeCircle.nativeElement

  		this._httpService.getData(url).subscribe(data => {
            this.timeValue = data.data.value + data.data.unit;
            /*if(data.data.value > performanceIndex[0] && data.data.value < performanceIndex[1]){
                rscircle.style.background = this.rangeColors[1];
            }else if(data.data.value > performanceIndex[1]){
                rscircle.style.background = this.rangeColors[2];
                this.redCircle = true;
            }else{
                rscircle.style.background = this.rangeColors[0];
            }*/
            this.isReady = true;
            this.drawTimeInit(data);
        });

	    if(interval>0){
        	setTimeout(function(){
               this.loadData(url,interval,false);
        	}.bind(this),interval *1000 );
        }
            
  }

  private format(date: any, fmt: any) {
      var o = {
          "M+": date.getMonth() + 1, //月份 
          "d+": date.getDate(), //日 
          "h+": date.getHours(), //小时 
          "m+": date.getMinutes(), //分 
          "s+": date.getSeconds(), //秒 
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
          "S": date.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
  }

private drawTimeInit(data: any): void {
	let _this = this;	
	const list = data.data.series;
	let option_arr = [];
    let series = [];
    let legend = [];
    list.forEach((item, index) => {  
    	const series_data = {
            type: 'line',
            name: item.name,
            smooth: false,
            stack: "总量",
            //不显示坐标点
  	        showSymbol:false,
              itemStyle: {
  	            normal: {
  	                areaStyle: {
  	                    type: 'default'
  	                }
  	            }
  	        },
  	        areaStyle:{normal:{
              	opacity:1
            }},
            data:[]
        };
       
        item.data.forEach((items , index) => {
            	option_arr.push({
            		name: item.name,
            		value:[items.x,items.y]
            	})
            });
        series_data.data = option_arr;
        option_arr = [];
        series.push(series_data);  
        legend.push(item.name);    

    });

	const option = {
		backgroundColor:"#06182e",
		textStyle:{
			color:"#36638c",
		},
		color:['#deca57', '#db874b', '#a3c06e', '#1cb193', '#7c90c3'],
		grid:{
			left:30,
			top:10,
			right:15,
			height:110,
			show: false,
			borderWidth:10,
			borderColor:"#283c4e"
		},
		xAxis: [{
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
          axisLabel: {
              formatter: function(value) {
                  return _this.format(new Date(value), 'hh:mm')
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
		 }],
	     yAxis: [{
	        type: 'value',
	        //splitNumber: 4,
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
	    }],
	    // 图例  
        legend: {
            icon: 'rect',
            itemWidth: 16,
            itemHeight: 10,
            itemGap: 13,
            data: legend,
            y: 'bottom',
            textStyle: {
                fontSize: 12,
                color: '#9db2dd'
            }
        },
        animationDuration: 3000,
        series: series
	};


	_this.chart.setOption(option);
}

}