// src/ThreeScene.tsx
import React, { Component } from 'react';
import * as THREE from 'three';

interface ApplicationState {
  width: number;
  height: number;
}

// interface ApplicationProps {

// }

export class Application extends Component<object, ApplicationState> {
  protected mountRef = React.createRef<HTMLDivElement>(); // 用于绑定渲染器
  protected renderer: THREE.WebGLRenderer;
  protected scene: THREE.Scene;
  protected camera: THREE.PerspectiveCamera;
  protected animateFrame: number = 0;
  protected clock = new THREE.Clock();

  constructor(props: object) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.state.width / this.state.height,
      0.1,
      1000
    );

  }

  protected onInit() {}
  protected onResize() {}
  protected onRender() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onUpdate(delta: number) {
  }
 
  componentDidMount() {
    // 将渲染器附加到 DOM
    if (this.mountRef.current) {
      this.renderer.setSize(this.state.width, this.state.height);
      this.mountRef.current.appendChild(this.renderer.domElement);
    }

    // 监听窗口大小变化
    window.addEventListener('resize', this.handleResize);

    // 设置渲染器样式，确保其填满整个页面
    if (this.renderer.domElement) {
      this.renderer.domElement.style.position = 'absolute';
      this.renderer.domElement.style.top = '0';
      this.renderer.domElement.style.left = '0';
      this.renderer.domElement.style.width = '100%';
      this.renderer.domElement.style.height = '100%';
    }

    this.onInit();
    this.animate();
  }

  componentWillUnmount() {
    // 清理资源
    cancelAnimationFrame(this.animateFrame);
    window.removeEventListener('resize', this.handleResize);
    if (this.mountRef.current) {
      this.mountRef.current.removeChild(this.renderer.domElement);
    }
  }

  handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.setState({ width, height }, () => {
      // 更新渲染器大小
      this.renderer.setSize(width, height);

      // 更新相机的纵横比，并更新投影矩阵
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });
  };

  animate = () => {

    // 计算时间差
    const delta = this.clock.getDelta();

    // 更新场景
    this.onUpdate(delta);

    // 渲染场景
    this.onRender();

    // 继续下一个帧的动画
    this.animateFrame = requestAnimationFrame(this.animate);
  };

  render() {
    return <div ref={this.mountRef} />;
  }
}
