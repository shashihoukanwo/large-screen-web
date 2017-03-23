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
  selector: 'app-neterror',
  templateUrl: './neterror.component.html',
  styleUrls: ['./neterror.component.css']
})
export class NeterrorComponent  implements OnInit { 
  @ViewChild('neterrormain') neterrorMain:ElementRef;
  @Input('option') option:AppOptions;
  private chart = null;
  public isReady: boolean = false;
  public netValue = "0";
  //红色阈值
  public redCircle = false;

  constructor(
        private _httpService: HttpService) {
        this.isReady = false;
  }
  ngOnChanges(changes: SimpleChanges):void{
        let option = changes['option'].currentValue;
        if (option.init) {
        	this.loadData(option.url, option.interval, true);       	
        }
  }

  ngOnInit() {
        this.chart = echarts.init(this.neterrorMain.nativeElement);

  }
  private loadData(url:string,interval:number,showLoading:boolean){

  		this._httpService.getData(url).subscribe(data => {
  			this.netValue = data.data.value + data.data.unit;
            this.isReady = true;
            this.drawNeterrorInit(data);
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

  private getMoreData(data){
  		let difValue = [];
  		data.forEach((item , index) => {
  			if(index + 1 <data.length){
  				difValue.push((data[index+1].y - data[index].y)/60);
  			} 
        });

  }

  private drawNeterrorInit(data: any): void {
		let _this = this;	
		const listData = data.data.series[0].data;
		const pointData = data.data.series[1].data ;
		/*let listDataHalfCeil = [];
		let pointDataHalfCeil = [];
		for(var i=0,len=listData.length;i<len;i+=Math.ceil(listData.length/2)){
		   listDataHalfCeil.push(listData.slice(i,i+Math.ceil(pointData.length/2)));
		}

		for(var i=0,len=pointData.length;i<len;i+=Math.ceil(pointData.length/2)){
		   pointDataHalfCeil.push(pointData.slice(i,i+Math.ceil(pointData.length/2)));
		}*/

		
		const option = {
				backgroundColor: "#06182e",
				textStyle: {
					color:"#36638c",
				},
				color: ['#016191', '#95b069'],
				grid: {
					left:30,
					top:10,
					//right:10,
					height:110,
					show: false,
					borderWidth:10,
					borderColor:"#283c4e"
				},
		        xAxis: {
		            type: 'time',
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

			     },
			     yAxis: [{
				        type: 'value',
				        splitNumber: 5,
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
				    },{
				        type: 'value',
				        splitNumber: 5,
			            min: 0,
			            max: 180,
				        axisLine:{
				        	show:true,
				        	lineStyle:{
				        		color:"#293f4d",
				        	},
				        },
				        axisLabel: {
			                formatter: '{value} %',
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
			            itemWidth: 16,
			            itemHeight: 10,
			            itemGap: 13,
			            data: ['网络错误次数','网络错误率'],
			            y: 'bottom',
			            icon: "circle",
			            textStyle: {
			                fontSize: 12,
			                color: '#9db2dd'
			            }
			        },
			        animationDuration: 3000,
			        series: [{
			            name: '网络错误次数',
			            type: 'line',
			            hoverAnimation: false,
			            itemStyle: {
			                normal: {
			                    opacity: 0
			                }
			            },

			            data: listData.map(function(item) {
			                return {
			                    name: item.y,
			                    value: [item.x, item.y]
			                }
			            }),
			            lineStyle: {
			                normal: {
			                    color: "#288ab1",
			                    width: 1
			                }
			            },
				        areaStyle:{normal:{
			            	opacity:0.7,
			            	color:"#016191"
			            }},
			          
			        },{
				        type: 'line',
				        name: '网络错误率',
				        //平滑曲线
				        smooth: false,
				        //不显示坐标点
				        showSymbol:false,
				        itemStyle:{
			                normal:{
			                    //折线图线条颜色设置
			                    color:"#95b069",
			                    lineStyle:{
			                        color:"#95b069",
			                        type:"dotted",
			                        width:2
			                   }
			                 }                                     
			            },
			            data:pointData.map(function(item) {
			                return {
			                    name: item.y,
			                    value: [item.x, item.y]
			                }
			            })
			            
			      }]
        }
		_this.chart.setOption(option);

		/*let timer = 0;
        let ti = setInterval(function () {
        	let lislength = listDataHalfCeil[1].length;
        	let potlength = pointDataHalfCeil[1].length;

        	listDataHalfCeil[0].shift();
    		listDataHalfCeil[0].push({
    			x:listDataHalfCeil[1][timer].x,
    			y:listDataHalfCeil[1][timer].y
    			
    		});

    		pointDataHalfCeil[0].shift();
    		pointDataHalfCeil[0].push({
    			x:pointDataHalfCeil[1][timer].x,
    			y:pointDataHalfCeil[1][timer].y
    			
    		});

    		_this.chart.setOption({
    			series:[{
    				data: listDataHalfCeil[0].map(function(item) {
		                return {
		                    name: item.y,
		                    value: [item.x, item.y]
		                }
		            })
    			},
    			{
    				data: pointDataHalfCeil[0].map(function(item) {
		                return {
		                    name: item.y,
		                    value: [item.x, item.y]
		                }
		            })
    			}]
    		});
        	timer ++;
        	if(timer >=5){
        		window.clearInterval(ti);
        	}

		}.bind(this),1000);*/
        
  }


}