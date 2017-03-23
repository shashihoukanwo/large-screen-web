import { Component, OnInit,ElementRef,AfterViewInit,ViewChild,Input, OnChanges, SimpleChanges } from '@angular/core';
import {AppOptions} from "../class/app-options";
import {isNullOrUndefined} from "util";
import {HttpService} from "../service/http/http.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
	selector: 'app-httpcode',
	templateUrl: './httpcode.component.html',
	styleUrls: ['../app.common.css','./httpcode.component.css']
})

export class HttpCodeComponent implements OnInit,AfterViewInit,OnChanges{
	@ViewChild('httpcontainer') httpcontainer:ElementRef;
	@ViewChild('httpcode') httpcode:ElementRef;
	@Input('option') option:AppOptions;
	
	private canvasCtx;
	private canvasWidth;
	private canvasHeight;
	private canvasInter = null;
	private arcImg = null;
	//httpcode配色
	private arcColor = ["#69b960","#019fe8","#dec257","#e9625e"];
	private rateValue = 0;
	private successCountAng = 300;
	private redirectCountAng = 310;
	private badRequestCountAng = 350;
	private badServerCountAng = 360;
	//canvas动画随机起点位置
	private arcpi = -Math.random()*Math.PI;
	private rectang = Math.ceil(Math.random()*60);
	private arcdeg = Math.ceil(Math.random()*360);
	//dom
	public successText = "";
	public redirectText = "";
	public badRequestText = "";
	public badServerText = "";
	//红色阈值
	public redCircle = false;
	
	ngOnChanges(changes: SimpleChanges):void{
        let option = changes['option'].currentValue;
        if (option.init) {
            this.httpCanvasInit();
            
            this.loadData(option.url,option.paramsMap,option.interval,true);
        }
    }
	constructor(private httpService: HttpService){
		//ele  this.httpcontainer.nativeElement;
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
            		this.getHttpCodeErrorCallBack(data.data);
            		this.drawHttpCodeArc();
            	}
            	
            	if(interval>0){
		        	setTimeout(function(){
		               this.loadData(url,params,interval,false);
		        	}.bind(this),interval*1000);
		        }
            });
	}
	getHttpCodeErrorCallBack(data){
		
		let stat = data.stat;
		let successCount = +stat.successCount;
		let redirectCount = +stat.redirectCount;
		let badRequestCount = +stat.badRequestCount;
		let badServerCount = +stat.badServerCount;
		
		let all = successCount + redirectCount +badRequestCount + badServerCount;
		
		this.successCountAng = Math.floor(successCount/all*360*100)/100;
		this.redirectCountAng = Math.floor(redirectCount/all*360*100)/100 + this.successCountAng;
		this.badRequestCountAng = Math.floor(badRequestCount/all*360*100)/100 + this.redirectCountAng;
		//终点固定360度
		//this.badServerCountAng = badServerCount/all*360;
		this.rateValue = Math.floor(successCount/all*100*100)/100;
		
		this.successText = Math.floor(successCount/all*100*100)/100+"% ("+successCount+")";
		this.redirectText = Math.floor(redirectCount/all*100*100)/100+"% ("+redirectCount+")";
		this.badRequestText = Math.floor(badRequestCount/all*100*100)/100+"% ("+badRequestCount+")";
		this.badServerText = Math.floor(badServerCount/all*100*100)/100+"% ("+badServerCount+")";
	}
	getWidth(el){
		const styles = window.getComputedStyle(el);
		const width = el.offsetWidth;
		const borderLeftWidth = parseFloat(styles.borderLeftWidth);
		const borderRightWidth = parseFloat(styles.borderRightWidth);
		const paddingLeft = parseFloat(styles.paddingLeft);
		const paddingRight = parseFloat(styles.paddingRight);
		return width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight;
	}
	getHeight(el){
		const styles = window.getComputedStyle(el);
		const height = el.offsetHeight;
		const borderTopWidth = parseFloat(styles.borderTopWidth);
		const borderBottomWidth = parseFloat(styles.borderBottomWidth);
		const paddingTop = parseFloat(styles.paddingTop);
		const paddingBottom = parseFloat(styles.paddingBottom);
		return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
	}
	
	httpCanvasInit(){
		let httpcontainer = this.httpcontainer.nativeElement;
		
		let width = this.getWidth(httpcontainer);
		let height = this.getHeight(httpcontainer);
		
		let canvas = this.httpcode.nativeElement;
		let ctx = canvas.getContext("2d");
		ctx.canvas.width = width;
		ctx.canvas.height = height;
		
		this.arcImg = new Image();
		this.arcImg.src = 'images/http-light2.png';

		this.canvasWidth = width;
		this.canvasHeight = height;
		this.canvasCtx = ctx;
		
		//var r = width/2;
		//var pi = Math.PI;
		//var rem = width/200;
	}
	drawHttpCodeArc(){
		const pi = Math.PI;
		const width = this.canvasWidth - 2;
		const height = this.canvasHeight - 2;
		
		//内圈成功率百分比
		const srate = this.rateValue;
		const ctx = this.canvasCtx;
		
		//弧度角度
		const successCountAng = this.successCountAng;
		const redirectCountAng = this.redirectCountAng;
		const badRequestCountAng = this.badRequestCountAng;
		const badServerCountAng = this.badServerCountAng;
		
		//计算最大半径
		let margin = 6;
		//原型图最大半径
		let rh = Math.floor(height/2)-margin;
		
		//内圈透明区域半径
		let rah = Math.floor(rh*0.5);
		//内圈实心区域半径
		let rsh = Math.floor(rh*0.3);
		//内圈蓝线半径
		let rbh = Math.floor(rh*0.57);
		
		//弧形内圈半径
		let arch1 = Math.floor(rh*0.62);
		let arch2 = Math.floor(rh*0.84);
		//外圈高亮线
		let rhh = Math.floor(rh*0.9);
		
		//内圈能量块半径
		let rrh = Math.floor(rh*0.39);
		
		//弧形绘制半径
		let arch3 = Math.floor(rh*0.73);
		let arcw3 = Math.floor(rh*0.1);
		
		
		
		
		function drawBackgroundBlock(){
			//保存当前画布环境
			ctx.save();
			
			//背景颜色
			ctx.fillStyle = "rgba(3, 21, 36, 0.7)";
    		ctx.fillRect (0,0,width,height);
			
			
			//计算网格数
			let xl = width%10;
			let yl = height%10;
			
			//移动绘画圆心点
			ctx.translate(0.5 + xl/2,0.5 + yl/2);
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.strokeStyle="#0f2230";
			
			let transverse = Math.floor(height/10) + 1;
			let vertical = Math.floor(width/10) + 1;
			
			for(let i = 0; i < transverse; i++){
				//横线
				ctx.moveTo(0,10 * i);
				ctx.lineTo(width-xl,10 * i);
			}
			for(let i = 0; i < vertical; i++){
				//竖线
				ctx.moveTo(10 * i,0);
				ctx.lineTo(10 * i,height-yl);
			}
			ctx.stroke();
			ctx.closePath();
			//恢复画布到保存时候的环境
			ctx.restore();
		}
			
		function drawArc(){
			//保存当前画布环境
			ctx.save();
			
			//移动绘画圆心点
			ctx.translate(width/2,height/2);
			
			//绘制外圆背景
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#033071"
			ctx.arc(0,0,rh,0,2*pi,false);
			//绘制定义的路径
			ctx.stroke();
			ctx.arc(0,0,rah,0,2*pi,false);
			//填充路径
			ctx.fillStyle="rgba(7, 24, 50, 1)";
			ctx.fill("evenodd");
			ctx.closePath();
			
			//内圈高亮线
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#00abb6";
			ctx.arc(0,0,rah,0,2*pi,false);
			ctx.stroke();
			ctx.closePath();
			
			//最内圈,带实心背景
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#033989"
			ctx.arc(0,0,rsh,0,2*pi,false);
			//绘制定义的路径
			ctx.stroke();
			ctx.closePath();
			//填充路径
			ctx.fillStyle="rgba(27, 56, 100, 1)";
			ctx.fill();
			
			//绘制中心百分比
			ctx.font = 12 + "px Arial";
			ctx.textAlign = "center";
			ctx.fillStyle = "#9eb2dd";
			ctx.fillText("成功率",0,-3);
			//ctx.textBaseline = "middle";
			ctx.font = 12 + "px Arial";
			ctx.fillStyle = "#ffffff";
			ctx.fillText(srate+"%",0,13);
			
			//内圈蓝线
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#07224a"
			ctx.arc(0,0,rbh,0,2*pi,false);
			//ctx.globalCompositeOperation = "lighter";
			//绘制定义的路径
			ctx.stroke();
			ctx.closePath();
			
			//弧形色块背景
			ctx.beginPath();
			ctx.arc(0,0,arch1,0,2*pi,false);
			ctx.arc(0,0,arch2,0,2*pi,false);
			//填充路径
			ctx.fillStyle="rgba(3, 21, 35, 1)";
			ctx.fill("evenodd");
			
			//外圈高亮线
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#00abb6";
			ctx.arc(0,0,rhh,0,2*pi,false);
			ctx.stroke();
			ctx.closePath();
			
			//恢复画布到保存时候的环境
			ctx.restore();
		}
			
			
		//绘制中间能量块背景
		function drawEnergyRect(){
			//保存当前画布环境
			ctx.save();
			//移动绘画圆心点
			ctx.translate(width/2,height/2);
			
			for(var i = -30; i < 30; i++){
				ctx.save();
				
				ctx.beginPath();
				ctx.fillStyle = "#033c92";
				//360°弧度等于2π,即Math.PI/180 = 1°的弧度值
				//360°等分60份,即1份=6°, i*6*Math.PI/180 = 该位置角度弧度值
				ctx.rotate(i*6 * Math.PI/180);
				ctx.fillRect(rrh,-Math.floor(rrh/32),Math.floor(rrh/8),Math.floor(rrh/16));
				ctx.closePath();
				
				ctx.restore();
			}
			ctx.restore();
		}
		
		//计算弧度
		function countArcByAngle(angle){
			let arc = angle/180;
			if(arc > 1.5){
				arc = arc - 2.5;
			}else{
				arc = arc - 0.5;
			}
			return arc;
		}
		
		//绘制中间http状态弧形色块
		function drawHttpColorArc(){
			//保存当前画布环境
			ctx.save();
			//移动绘画圆心点
			ctx.translate(width/2,height/2);
			ctx.lineWidth = arcw3;
			
			ctx.beginPath();
			ctx.strokeStyle = this.arcColor[0];
			ctx.arc(0,0,arch3,-0.5*pi,countArcByAngle(successCountAng)*pi,false);
			ctx.stroke();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.strokeStyle = this.arcColor[1];
			ctx.arc(0,0,arch3,countArcByAngle(successCountAng)*pi,countArcByAngle(redirectCountAng)*pi,false);
			ctx.stroke();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.strokeStyle = this.arcColor[2];
			ctx.arc(0,0,arch3,countArcByAngle(redirectCountAng)*pi,countArcByAngle(badRequestCountAng)*pi,false);
			ctx.stroke();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.strokeStyle = this.arcColor[3];
			ctx.arc(0,0,arch3,countArcByAngle(badRequestCountAng)*pi,countArcByAngle(badServerCountAng)*pi,false);
			ctx.stroke();
			ctx.closePath();

			ctx.restore();
		}
		
		
		//控制旋转速度,也就是每一帧的距离
		let arcfps = pi/180;
		function drawAnimArc(){
			//保存当前画布环境
			ctx.save();
			//移动绘画圆心点
			ctx.translate(width/2,height/2);
			
			ctx.beginPath();
			ctx.fillStyle = "#0ad6e2"
			
			this.arcpi = this.arcpi - arcfps;
			
			let x = Math.cos(this.arcpi*pi) * rah;
			let y = Math.sin(this.arcpi*pi) * rah;
			ctx.arc(x,y,height/100,0,2*pi,false);
			ctx.fill();
			ctx.closePath();
			
			ctx.restore();
		}
		
		
		function drawAnimRect(){
			//保存当前画布环境
			ctx.save();
			//移动绘画圆心点
			ctx.translate(width/2,height/2);
			
			ctx.beginPath();
			ctx.fillStyle = "#58dcf9";
			
			//360°弧度等于2π,即Math.PI/180 = 1°的弧度值
			//360°等分60份,即1份=6°, i*6*Math.PI/180 = 该位置角度弧度值
			ctx.rotate(this.rectang*6 * Math.PI/180);
			ctx.fillRect(rrh,-Math.floor(rrh/32),Math.floor(rrh/8),Math.floor(rrh/16));
			
			ctx.rotate(1*6 * Math.PI/180);
			ctx.fillRect(rrh,-Math.floor(rrh/32),Math.floor(rrh/8),Math.floor(rrh/16));
			ctx.closePath();
			//this.rectang = this.rectang + 0.5;
			this.rectang = this.rectang + 1;
			
			ctx.restore();
		}
		
		
		//控制旋转角度,一圈就是360
		let deg = 5;
		//绘制白色覆盖层
		function drawHighRect(){
			if(this.arcImg === null){return;}
			//保存当前画布环境
			ctx.save();
			//移动绘画圆心点
			ctx.translate(width/2,height/2);
			
			//this.arcpi = this.arcpi - arcfps;
			//let x = Math.cos(this.arcpi*pi) * rhh-5.5;
			//let y = Math.sin(this.arcpi*pi) * rhh-12;
			//console.log(x,y)

			this.arcdeg = this.arcdeg + deg;
			this.arcdeg = this.arcdeg > 360 ? this.arcdeg-360 : this.arcdeg;
			ctx.rotate(this.arcdeg * Math.PI/180);
			ctx.drawImage(this.arcImg,rhh-5.5,-12,11,24);
			
			ctx.restore();
		}

		function loop(){
			//requestAnimationFrame(loop);
			
			ctx.clearRect(0,0,width,height);
			drawBackgroundBlock.call(this);
			drawArc.call(this);
			drawEnergyRect.call(this);
			drawHttpColorArc.call(this);
			drawAnimArc.call(this);
			drawAnimRect.call(this);
			drawHighRect.call(this);
		}
		loop.call(this);
		
		//动画刷新频率,每秒24帧
		let fps = 24;
		if(this.canvasInter !== null){
			clearInterval(this.canvasInter);
		}
		this.canvasInter = setInterval(loop.bind(this),1000/fps);
	}
}
