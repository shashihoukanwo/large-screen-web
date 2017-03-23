import { Component, OnInit,ElementRef,AfterViewInit,ViewChild,Input, OnChanges, SimpleChanges } from '@angular/core';
import {AppOptions} from "../class/app-options";
import {isNullOrUndefined} from "util";
import {HttpService} from "../service/http/http.service";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const THREE = require('three/build/three.min.js');

@Component({
    selector: 'app-hijack',
    templateUrl: './hijack.component.html',
    styleUrls: ['./hijack.component.css']
})

export class HijackComponent implements OnInit,AfterViewInit,OnChanges {
    //@ViewChild('activeMap') activeMap: ElementRef;
    @Input('option') option:AppOptions;
	
	//dom
	public hijackTop = [];
	public hijackCount = 0;
	public hijackRate = 0;
	public antiCount = 0;
	
    ngOnChanges(changes: SimpleChanges):void{
        let option = changes['option'].currentValue;
        if (option.init) {
            this.loadData(option.url,option.paramsMap,option.interval,true);
        }
    }
	constructor(private httpService: HttpService){
		//ele  this.httpcontainer.nativeElement;
	}

    ngOnInit() {
       
    }
    ngAfterViewInit(){
    	this.earthInit();
  	}
    
    earthInit(){
    	var container;
	    var camera, scene, renderer;
	
	    init();
	    animate();
	
	    var innerSphereGroup;
	    var outSphereGroup;
	    var outRedSphere;
	    var sphereObjects;
	    var maxPointRadius;
	    var midPointRadius;
	    var sphereBlueMaterial,sphereRedMaterial;
	
	    function init() {
	        container = document.getElementById('container');
	        camera = new THREE.PerspectiveCamera(15, 1, 50, 18000);
	        camera.position.z = 2000;
	        scene = new THREE.Scene();
	
	        var light = new THREE.DirectionalLight(0xffffff, 1.2, 0);
	        light.position.set(0, 0, 3000);
	        scene.add(light);
	
	        var radius = 180, innerSphereGeoMetry = new THREE.IcosahedronGeometry(radius, 1);
	
	        var innerSphereMaterial = new THREE.MeshLambertMaterial({
	            color: 0x044f96
	            , opacity: 1
	            , emissive: 0x003567
	            , wireframe: true
	            , wireframeLinewidth:0.1
	        });
	
	        var sphereMaterialOut = new THREE.MeshLambertMaterial({
	            color: 0x033564,
	            emissive: 0x011f3b,
	            wireframe: true,
	            wireframeLinewidth:0.2
	        });
	        var innerSphereMesh = new THREE.Mesh(innerSphereGeoMetry, innerSphereMaterial);
	        var outSphereGeoMetry = new THREE.IcosahedronGeometry(240, 1)
	        var outSphereMesh = new THREE.Mesh(outSphereGeoMetry, sphereMaterialOut);
	
	
	        sphereBlueMaterial = new THREE.MeshPhongMaterial({
	            color: 0x2077ad
	            , wireframe: true
	        });
	        sphereRedMaterial = new THREE.MeshPhongMaterial({
	            color: 0xc20d23,
	        });
	
	        innerSphereGroup = new THREE.Group();
	        outSphereGroup = new THREE.Group();
	        innerSphereGroup.add(innerSphereMesh);
	        outSphereGroup.add(outSphereMesh);
	        scene.add(innerSphereGroup);
	        scene.add(outSphereGroup);
	
	        var geometryCube = cube(260, 45);
	        outRedSphere = new THREE.LineSegments(geometryCube, new THREE.LineDashedMaterial({
	            color: 0xc20d23,
	            dashSize: 3,
	            gapSize: 1,
	            linewidth: 2
	        }));
	
	        scene.add(outRedSphere);
	        maxPointRadius=15;
	        midPointRadius=11;
	        sphereObjects = new Array(innerSphereGeoMetry.vertices.length);
	        for (var index = 0; index < innerSphereGeoMetry.vertices.length; ++index) {
	            var _tempr = maxPointRadius*Math.random();
	
	            var sphereGeometry = new THREE.SphereGeometry(_tempr, 6, 6);
	            var sphere;
	
	            if (_tempr>midPointRadius) {
	                sphere = new THREE.Mesh(sphereGeometry, sphereRedMaterial);
	            } else {
	                sphere = new THREE.Mesh(sphereGeometry, sphereBlueMaterial);
	            }
	            sphere.position.x = innerSphereGeoMetry.vertices[index].x;
	            sphere.position.y = innerSphereGeoMetry.vertices[index].y;
	            sphere.position.z = innerSphereGeoMetry.vertices[index].z;
	            sphereObjects[index]=sphere;
	            innerSphereGroup.add(sphere);
	        }
	
	        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true,});
	        renderer.setClearColor(0x031523);
	        renderer.setPixelRatio(window.devicePixelRatio);
	        renderer.setSize(124,124);
	        container.appendChild(renderer.domElement);
	    }
	
	    function animate() {
	        requestAnimationFrame(animate);
	        render();
	    }
	
	    function render() {
	
	        innerSphereGroup.rotation.y -= Math.PI / 1000;
        	outSphereGroup.rotation.z -= Math.PI / 5000;
        	outSphereGroup.rotation.x -= Math.PI / 5000;
        	outSphereGroup.rotation.y -= Math.PI / 500;
	
	        var time = Date.now() * 0.001;
	        outRedSphere.rotation.z = 0.25 * time;
	        if(Date.now()%10==0){
	            //随机替换位置
	            var _step = Math.ceil(Math.random()*10);
	            var loop = Math.floor(sphereObjects.length/_step/2);
	            for(var loopIndex=0;loopIndex<loop;++loopIndex){
	                for(var stepIndex =0;stepIndex<_step;++stepIndex){
	                    var sphereObjBef= sphereObjects[loopIndex*_step*2+stepIndex];
	                    var sphereObjAfter= sphereObjects[(loopIndex+1)*_step*2-stepIndex-1];
	                    var _x = sphereObjBef.position.x;
	                    var _y = sphereObjBef.position.y;
	                    var _z = sphereObjBef.position.z;
	                    sphereObjBef.position.x=sphereObjAfter.position.x;
	                    sphereObjBef.position.y=sphereObjAfter.position.y;
	                    sphereObjBef.position.z=sphereObjAfter.position.z;
	                    sphereObjAfter.position.x=_x;
	                    sphereObjAfter.position.y=_y;
	                    sphereObjAfter.position.z=_z;
	                }
	            }
	        }
	
	        camera.lookAt(scene.position);
	        renderer.render(scene, camera);
	    }
	
	    function cube(r, size) {
	        var geometry = new THREE.Geometry();
	        var f = 360 / size;
	        for (var i = -size; i < size; ++i) {
	            geometry.vertices.push(
	                new THREE.Vector3(Math.cos(f * i * Math.PI / 360) * r, Math.sin(f * i * Math.PI / 360) * r, 0));
	        }
	        return geometry;
	    }
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
            		this.getHijackDataCallBack(data.data);
            	}
            	
            	if(interval>0){
		        	setTimeout(function(){
		               this.loadData(url,params,interval,false);
		        	}.bind(this),interval*1000);
		        }
            });
	}
    
    getHijackDataCallBack(data){
    	let stat = data.stat || {};
    	let series = data.series || [];
    	
    	let hijackCount = +stat.hijackCount;
    	let antiCount = +stat.antiCount;
    	let hijackRate = Math.floor(antiCount/hijackCount*100*100)/100;
    	
    	this.hijackTop = [];
    	for(let obj of series){
    		let name = obj.name || "";
    		this.hijackTop.push(name);
    	}
    	
    	this.hijackCount = hijackCount;
    	this.antiCount = antiCount;
    	this.hijackRate = hijackRate;
    }
}